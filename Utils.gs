/**
 * Fonction utilitaire pour inclure un fichier HTML dans un template.
 * Utilisé via <?!= include('NomDuFichier') ?> dans les fichiers HTML.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Applique la mise en forme au rapport généré.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} feuille - La feuille à formater.
 */
function miseEnForme(feuille) {
  const totalColonnes = feuille.getMaxColumns();
  const colonneF = 6;

  const colonnesASupprimer = totalColonnes - colonneF + 1;

  if (colonnesASupprimer > 0) {
    feuille.deleteColumns(colonneF, colonnesASupprimer);
  }

  feuille.setColumnWidth(1, 140);
  feuille.setColumnWidth(2, 140);
  feuille.setColumnWidth(3, 270);
  feuille.setColumnWidth(4, 180);
  feuille.setColumnWidth(5, 140);

  feuille.getRange("C1").setValue(T_('timeReport')).setFontWeight("bold").setFontSize(24);

  feuille.getRange("A5").setValue(T_('hoursSummary')).setFontWeight("bold").setFontSize(12);
  feuille.getRange("A5:E5").setBorder(null, null, true, null, null, null, null, SpreadsheetApp.BorderStyle.SOLID);

  feuille.getRange("A6").setValue(T_('projects')).setFontWeight("bold");
  feuille.getRange("D6").setValue(T_('calendar')).setFontWeight("bold");

  feuille.getRange("C1:C2").setVerticalAlignment("middle").setHorizontalAlignment("center");
  // Le format numérique des colonnes de durées est appliqué par
  // ecrireProjetsEtTachesDansFeuille(), une fois les lignes connues.
}

function obtenirCalendriers() {
  const calendriers = CalendarApp.getAllCalendars();
  return calendriers.map(calendrier => ({
    id: calendrier.getId(),
    nom: calendrier.getName()
  }));
}

function compteurNomFeuille(ss, nomBase) {
  const feuilles = ss.getSheets();
  const nomExistant = feuilles.map(feuille => feuille.getName());
  let compteur = 1;
  let nomFeuille = nomBase;

  while (nomExistant.includes(nomFeuille)) {
    nomFeuille = `${nomBase} (${compteur})`;
    compteur++;
  }

  return nomFeuille;
}

/**
 * Formate une date pour affichage.
 * @param {Date} date - La date à formater.
 * @param {string} [fuseau] - Fuseau IANA. Par défaut, celui du script.
 * @return {string} La date au format jj/mm/aaaa.
 */
function formaterDate(date, fuseau) {
  return Utilities.formatDate(date, fuseau || Session.getScriptTimeZone(), "dd/MM/yyyy");
}

/**
 * Retourne le décalage d'un fuseau par rapport à UTC, en millisecondes, à un
 * instant donné (le décalage varie avec l'heure d'été).
 * @param {Date} instant
 * @param {string} fuseau - Fuseau IANA (ex: 'America/New_York').
 * @return {number} Décalage en millisecondes.
 */
function decalageFuseau_(instant, fuseau) {
  const z = Utilities.formatDate(instant, fuseau, 'Z'); // ex: "+0200"
  const signe = z.charAt(0) === '-' ? -1 : 1;
  const heures = Number(z.substr(1, 2));
  const minutes = Number(z.substr(3, 2));
  return signe * (heures * 60 + minutes) * 60000;
}

/**
 * Construit l'instant précis correspondant à une date et une heure murales dans
 * un fuseau donné. Indispensable car `new Date(a, m, j)` raisonne dans le fuseau
 * du script (Europe/Paris), pas dans celui de l'agenda de l'utilisateur.
 *
 * La double passe corrige le cas où le décalage change entre l'instant approché
 * et l'instant réel (passage à l'heure d'été).
 *
 * @param {number} annee
 * @param {number} mois - 0 = janvier.
 * @param {number} jour
 * @param {boolean} finDeJournee - true pour 23:59:59.999, false pour 00:00:00.000.
 * @param {string} fuseau - Fuseau IANA.
 * @return {Date}
 */
function instantMurDansFuseau_(annee, mois, jour, finDeJournee, fuseau) {
  const heureMurale = finDeJournee
    ? Date.UTC(annee, mois, jour, 23, 59, 59, 999)
    : Date.UTC(annee, mois, jour, 0, 0, 0, 0);

  let instant = heureMurale - decalageFuseau_(new Date(heureMurale), fuseau);
  instant = heureMurale - decalageFuseau_(new Date(instant), fuseau);
  return new Date(instant);
}

/**
 * Retourne la date civile « aujourd'hui » telle que vue dans un fuseau donné.
 * @param {string} fuseau - Fuseau IANA.
 * @return {{annee: number, mois: number, jour: number}} mois : 0 = janvier.
 */
function jourCourantDansFuseau_(fuseau) {
  const parties = Utilities.formatDate(new Date(), fuseau, 'yyyy-MM-dd').split('-');
  return {
    annee: Number(parties[0]),
    mois: Number(parties[1]) - 1,
    jour: Number(parties[2])
  };
}

/**
 * Formate une durée en heures sous forme lisible : « 3 h », « 63 h 12 min ».
 * @param {number} heures
 * @return {string}
 */
function formaterDuree_(heures) {
  const totalMinutes = Math.round(heures * 60);
  const h = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;
  return min === 0 ? `${h} h` : `${h} h ${min} min`;
}

/**
 * Échappe les caractères significatifs en HTML.
 * Indispensable pour toute valeur d'origine externe (titres d'événements issus
 * d'agendas partagés, noms de feuilles) injectée dans un corps d'email.
 * @param {*} valeur - La valeur à échapper.
 * @return {string} La chaîne échappée.
 */
function escapeHtml_(valeur) {
  return String(valeur)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
