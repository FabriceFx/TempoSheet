/**
 * Nombre d'heures comptabilisées pour un événement "journée entière".
 * Ajuster ici si la journée de travail de référence n'est pas de 7 heures.
 */
const HEURES_PAR_JOURNEE_ENTIERE = 7;

/**
 * Convertit une chaîne "YYYY-MM-DD" (issue d'un <input type="date">) en Date locale.
 * new Date("2026-08-15") serait interprété en UTC et décalerait la journée
 * selon le fuseau de l'utilisateur.
 * @param {string} chaine - La date au format ISO court.
 * @return {Date|null} La date locale, ou null si la chaîne est invalide.
 */
function parserDateLocale_(chaine) {
  const parties = String(chaine || '').split('-');
  if (parties.length !== 3) return null;

  const annee = Number(parties[0]);
  const mois = Number(parties[1]);
  const jour = Number(parties[2]);
  if (!annee || !mois || !jour) return null;

  const date = new Date(annee, mois - 1, jour);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Retourne la durée d'un événement en heures.
 * Un événement "journée entière" est valorisé à HEURES_PAR_JOURNEE_ENTIERE par
 * journée couverte, et non à 24 heures.
 * @param {GoogleAppsScript.Calendar.CalendarEvent} event
 * @return {number} La durée en heures.
 */
function dureeEvenementEnHeures_(event) {
  if (event.isAllDayEvent()) {
    const debut = event.getAllDayStartDate();
    const fin = event.getAllDayEndDate(); // borne exclusive
    const nbJours = Math.max(1, Math.round((fin - debut) / 86400000));
    return nbJours * HEURES_PAR_JOURNEE_ENTIERE;
  }
  return (event.getEndTime() - event.getStartTime()) / 3600000;
}

/**
 * Repère le #tag de projet dans un titre d'événement.
 * Le tag doit être précédé d'un début de titre ou d'une espace, ce qui évite de
 * confondre avec un « # » interne (ancre d'URL, référence de ticket…).
 */
const REGEX_TAG_PROJET = /(?:^|\s)#([\p{L}\p{N}\p{M}\p{Pc}\-]+)/u;

/**
 * Extrait le nom de projet et la description d'un titre d'événement.
 *
 * Le #tag est accepté n'importe où dans le titre : « #projet1 Design » comme
 * « Réunion #projet1 hebdomadaire ». Le reste du titre, une fois le tag retiré,
 * constitue la description de la tâche.
 *
 * @param {string} titre - Titre de l'événement.
 * @param {string} libelleDefaut - Libellé utilisé si le titre se réduit au tag.
 * @return {{projet: string, tache: string}|null} null si aucun tag n'est présent.
 */
function extraireProjetEtTache_(titre, libelleDefaut) {
  const match = String(titre || '').match(REGEX_TAG_PROJET);
  if (!match) return null;

  const avant = titre.slice(0, match.index);
  const apres = titre.slice(match.index + match[0].length);
  const tache = (avant + ' ' + apres).replace(/\s+/gu, ' ').trim();

  return { projet: match[1], tache: tache || libelleDefaut };
}

/**
 * Écrit le rapport (résumé + détail) dans la feuille en un minimum d'appels API.
 * Les valeurs sont assemblées en mémoire puis poussées en bloc via setValues().
 * @param {GoogleAppsScript.Spreadsheet.Sheet} feuille
 * @param {Map<string, {taches: Array<{nom: string, duree: number}>, heures: number}>} projetsEtTaches
 */
function ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches) {
  const LIGNE_RESUME = 7;
  const FORMAT_HEURES = '#,##0.00';

  // --- Bloc résumé (colonnes A et B) ---
  const lignesResume = [];
  let totalHeures = 0;
  projetsEtTaches.forEach((details, projet) => {
    lignesResume.push([projet, details.heures]);
    totalHeures += details.heures;
  });

  // --- Bloc détail (colonnes A à E), séparé du résumé par une ligne vide ---
  const ligneTitreDetail = LIGNE_RESUME + lignesResume.length + 1;

  const lignesDetail = [];
  lignesDetail.push([T_('hourlyDetails'), '', '', '', '']);
  lignesDetail.push([T_('projects'), T_('details'), '', '', T_('hoursPerProject')]);

  projetsEtTaches.forEach((details, projet) => {
    lignesDetail.push([projet, '', '', '', details.heures]);
    details.taches.forEach(tache => {
      lignesDetail.push(['', tache.nom, '', '', tache.duree]);
    });
  });

  lignesDetail.push([T_('totalHours'), '', '', '', totalHeures]);

  // La feuille neuve compte 1000 lignes : on l'agrandit si le rapport déborde.
  const derniereLigne = ligneTitreDetail + lignesDetail.length - 1;
  const maxLignes = feuille.getMaxRows();
  if (derniereLigne > maxLignes) {
    feuille.insertRowsAfter(maxLignes, derniereLigne - maxLignes);
  }

  if (lignesResume.length > 0) {
    feuille.getRange(LIGNE_RESUME, 1, lignesResume.length, 2).setValues(lignesResume);
    feuille.getRange(LIGNE_RESUME, 2, lignesResume.length, 1).setNumberFormat(FORMAT_HEURES);
  }

  feuille.getRange(ligneTitreDetail, 1, lignesDetail.length, 5).setValues(lignesDetail);

  // Mise en forme du bloc détail
  feuille.getRange(ligneTitreDetail, 1).setFontWeight('bold').setFontSize(12);
  feuille.getRange(ligneTitreDetail, 1, 1, 5)
    .setBorder(null, null, true, null, null, null, null, SpreadsheetApp.BorderStyle.SOLID);
  feuille.getRange(ligneTitreDetail + 1, 1, 1, 5).setFontWeight('bold');
  feuille.getRange(ligneTitreDetail + 2, 5, lignesDetail.length - 2, 1).setNumberFormat(FORMAT_HEURES);
  feuille.getRange(derniereLigne, 1, 1, 5).setFontWeight('bold');
}

/**
 * Calcule les bornes de la période demandée.
 *
 * Les bornes sont exprimées en heures murales du fuseau de l'agenda (00:00:00.000
 * et 23:59:59.999), et non dans celui du script : un utilisateur hors Europe/Paris
 * obtient ainsi bien « son » mois, et non le mois parisien.
 *
 * @param {string} periode - Clé de période (cetteSemaine, ceMois, ...).
 * @param {string} [dateDebutSpecifiee] - Date ISO courte, pour "periodeSpecifiee".
 * @param {string} [dateFinSpecifiee] - Date ISO courte, pour "periodeSpecifiee".
 * @param {string} [fuseau] - Fuseau IANA de l'agenda. Par défaut, celui du script.
 * @return {{valide: boolean, debut: Date, fin: Date, texte: string}}
 */
function calculerDatesPeriode(periode, dateDebutSpecifiee, dateFinSpecifiee, fuseau) {
  const tz = fuseau || Session.getScriptTimeZone();
  const auj = jourCourantDansFuseau_(tz);

  // Dates « civiles » (jour/mois/année seuls) servant à l'arithmétique calendaire.
  let debutCivil, finCivil;

  switch (periode) {
    case "cetteSemaine": {
      const reference = new Date(auj.annee, auj.mois, auj.jour);
      // getDay() renvoie 0 le dimanche : il faut alors reculer de 6 jours.
      const joursDepuisLundi = (reference.getDay() === 0) ? 6 : reference.getDay() - 1;
      debutCivil = new Date(auj.annee, auj.mois, auj.jour - joursDepuisLundi);
      finCivil = new Date(auj.annee, auj.mois, auj.jour - joursDepuisLundi + 6);
      break;
    }

    case "laSemaineDerniere": {
      const reference = new Date(auj.annee, auj.mois, auj.jour);
      const joursDepuisLundi = (reference.getDay() === 0) ? 6 : reference.getDay() - 1;
      debutCivil = new Date(auj.annee, auj.mois, auj.jour - joursDepuisLundi - 7);
      finCivil = new Date(auj.annee, auj.mois, auj.jour - joursDepuisLundi - 1);
      break;
    }

    case "ceMois":
      debutCivil = new Date(auj.annee, auj.mois, 1);
      finCivil = new Date(auj.annee, auj.mois + 1, 0);
      break;

    case "leDernierMois":
      debutCivil = new Date(auj.annee, auj.mois - 1, 1);
      finCivil = new Date(auj.annee, auj.mois, 0);
      break;

    case "cetteAnnee":
      debutCivil = new Date(auj.annee, 0, 1);
      finCivil = new Date(auj.annee, 11, 31);
      break;

    case "periodeSpecifiee": {
      debutCivil = parserDateLocale_(dateDebutSpecifiee);
      finCivil = parserDateLocale_(dateFinSpecifiee);
      if (!debutCivil || !finCivil || debutCivil > finCivil) {
        return { valide: false, texte: T_('invalidPeriod') };
      }
      break;
    }

    default:
      return { valide: false, texte: T_('invalidPeriod') };
  }

  const debut = instantMurDansFuseau_(debutCivil.getFullYear(), debutCivil.getMonth(), debutCivil.getDate(), false, tz);
  const fin = instantMurDansFuseau_(finCivil.getFullYear(), finCivil.getMonth(), finCivil.getDate(), true, tz);

  return {
    valide: true,
    debut: debut,
    fin: fin,
    texte: T_('from') + formaterDate(debut, tz) + T_('to') + formaterDate(fin, tz)
  };
}

/**
 * Génère le rapport de temps dans un nouvel onglet du classeur actif.
 * Toutes les validations sont faites avant la création de la feuille, afin de
 * ne jamais laisser d'onglet vide derrière soi en cas d'erreur.
 * @param {string} selectedCalendarId - Identifiant de l'agenda source.
 * @param {string} selectedPeriod - Clé de période.
 * @param {string} [dateDebut] - Date ISO courte, pour "periodeSpecifiee".
 * @param {string} [dateFin] - Date ISO courte, pour "periodeSpecifiee".
 */
function exporterCalendrier(selectedCalendarId, selectedPeriod, dateDebut, dateFin) {
  const calendrier = CalendarApp.getCalendarById(selectedCalendarId);
  if (!calendrier) {
    throw new Error(T_('calendarNotFound'));
  }

  // Les bornes sont calculées dans le fuseau de l'agenda source.
  const dates = calculerDatesPeriode(selectedPeriod, dateDebut, dateFin, calendrier.getTimeZone());
  if (!dates.valide) {
    throw new Error(dates.texte);
  }

  const nomCalendrier = calendrier.getName();
  const projetsEtTaches = new Map();
  const miscLabel = T_('miscTasks');

  calendrier.getEvents(dates.debut, dates.fin).forEach(function(event) {
    const extrait = extraireProjetEtTache_(event.getTitle(), miscLabel);
    if (!extrait) return;

    const heures = dureeEvenementEnHeures_(event);

    if (!projetsEtTaches.has(extrait.projet)) {
      projetsEtTaches.set(extrait.projet, { taches: [], heures: 0 });
    }
    const projet = projetsEtTaches.get(extrait.projet);
    projet.taches.push({ nom: extrait.tache, duree: heures });
    projet.heures += heures;
  });

  // La feuille n'est créée qu'une fois les données collectées sans erreur.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const feuille = ss.insertSheet(compteurNomFeuille(ss, libellePeriode_(selectedPeriod)));
  miseEnForme(feuille);

  feuille.getRange('C2').setValue(dates.texte);
  feuille.getRange('D7').setValue(nomCalendrier);

  ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches);
  ss.toast(T_('reportGenerated'), T_('done'), 5);
}
