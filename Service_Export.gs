function ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches) {
  let row = 6;
  let totalHeures = 0;

  feuille.getRange(`D${row}`).setValue(T_('calendar')).setFontWeight("bold");

  projetsEtTaches.forEach((details, projet) => {
    feuille.getRange(`A${row + 1}`).setValue(projet);
    feuille.getRange(`B${row + 1}`).setNumberFormat('#,##0.00').setValue(details.heures);
    totalHeures += details.heures;
    row++;
  });

  row += 2;
  feuille.getRange(`A${row}`).setValue(T_('hourlyDetails')).setFontWeight("bold").setFontSize(12);
  feuille.getRange(`A${row}:E${row}`).setBorder(null, null, true, null, null, null, null, SpreadsheetApp.BorderStyle.SOLID);
  row++;
  feuille.getRange(`A${row}`).setValue(T_('projects')).setFontWeight("bold");
  feuille.getRange(`B${row}`).setValue(T_('details')).setFontWeight("bold");
  feuille.getRange(`E${row}`).setValue(T_('hoursPerProject')).setFontWeight("bold");
  row++;

  projetsEtTaches.forEach((details, projet) => {
    feuille.getRange(`A${row}`).setValue(projet);
    feuille.getRange(`E${row}`).setNumberFormat('#,##0.00').setValue(details.heures);
    row++;

    details.taches.forEach(tache => {
      feuille.getRange(`B${row}`).setValue(tache.nom);
      feuille.getRange(`E${row}`).setNumberFormat('#,##0.00').setValue(tache.duree);
      row++;
    });
  });

  feuille.getRange(`A${row}`).setValue(T_('totalHours')).setFontWeight("bold");
  feuille.getRange(`E${row}`).setFontWeight("bold").setNumberFormat('#,##0.00').setValue(totalHeures);
}

function calculerDatesPeriode(periode, dateDebutSpecifiee, dateFinSpecifiee) {
  const aujourdhui = new Date();
  let dateDebut, dateFin;
  let textePeriode;

  switch (periode) {
    case "cetteSemaine": {
      const jourActuel = aujourdhui.getDay();
      const differenceDepuisLundi = jourActuel - 1;
      const ajustementDimanche = (jourActuel === 0 ? -6 : 0);

      dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() - differenceDepuisLundi + ajustementDimanche);
      dateDebut.setHours(0, 0, 0, 0);

      dateFin = new Date(dateDebut);
      dateFin.setDate(dateDebut.getDate() + 6);
      dateFin.setHours(23, 59, 59, 999);

      textePeriode = T_('from') + formaterDate(dateDebut) + T_('to') + formaterDate(dateFin);
      break;
    }

    case "laSemaineDerniere": {
      const jourActuelDerniere = aujourdhui.getDay();
      const differenceDepuisLundiDerniere = jourActuelDerniere - 1;
      const joursAReculer = differenceDepuisLundiDerniere + 7;
      const ajustementDimancheDerniere = (jourActuelDerniere === 0 ? -6 : 0);

      dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() - joursAReculer + ajustementDimancheDerniere);
      dateDebut.setHours(0, 0, 0, 0);

      dateFin = new Date(dateDebut);
      dateFin.setDate(dateDebut.getDate() + 6);
      dateFin.setHours(23, 59, 59, 999);

      textePeriode = T_('from') + formaterDate(dateDebut) + T_('to') + formaterDate(dateFin);
      break;
    }

    case "ceMois":
      dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 1);
      dateFin = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth() + 1, 0);
      break;

    case "leDernierMois":
      dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth() - 1, 1);
      dateFin = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 0);
      break;

    case "cetteAnnee":
      dateDebut = new Date(aujourdhui.getFullYear(), 0, 1);
      dateFin = new Date(aujourdhui.getFullYear(), 11, 31);
      break;

    case "periodeSpecifiee":
      if (dateDebutSpecifiee && dateFinSpecifiee && new Date(dateDebutSpecifiee) <= new Date(dateFinSpecifiee)) {
        dateDebut = new Date(dateDebutSpecifiee);
        dateFin = new Date(dateFinSpecifiee);
      } else {
        textePeriode = T_('invalidPeriod');
        return { texte: textePeriode };
      }
      break;

    default:
      break;
  }

  if (!textePeriode) {
    textePeriode = T_('from') + formaterDate(dateDebut) + T_('to') + formaterDate(dateFin);
  }

  return {
    debut: dateDebut,
    fin: dateFin,
    texte: textePeriode
  };
}

function exporterCalendrier(selectedCalendarId, selectedPeriod, dateDebut, dateFin) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nomFeuille = compteurNomFeuille(ss, selectedPeriod);
  const feuille = ss.insertSheet(nomFeuille);
  miseEnForme(feuille);

  const calendrier = CalendarApp.getCalendarById(selectedCalendarId);
  if (!calendrier) {
    Logger.log("Calendrier non trouvé avec l'ID: " + selectedCalendarId);
    return;
  }
  const nomCalendrier = calendrier.getName();

  const dates = calculerDatesPeriode(selectedPeriod, dateDebut, dateFin);
  feuille.getRange("C2").setValue(dates.texte);
  feuille.getRange('D7').setValue(nomCalendrier);

  const projetsEtTaches = new Map();
  const miscLabel = T_('miscTasks');

  const evenements = calendrier.getEvents(new Date(dates.debut), new Date(dates.fin));
  evenements.forEach(function(event) {
    const titre = event.getTitle();
    
    const regex = /^#([\p{L}\p{N}\p{M}\p{Pc}\-]+)(?:\s+(.*))?$/u;
    const match = titre.match(regex);

    if (match) {
      const nomProjet = match[1];
      let tache = match[2] ? match[2].trim() : miscLabel;
      if (tache === "") tache = miscLabel;

      let duree;
      if (event.isAllDayEvent()) {
        duree = 24 * 60;
      } else {
        duree = (event.getEndTime() - event.getStartTime()) / (1000 * 60);
      }

      if (!projetsEtTaches.has(nomProjet)) {
        projetsEtTaches.set(nomProjet, { taches: [], heures: 0 });
      }
      const projet = projetsEtTaches.get(nomProjet);
      projet.taches.push({nom: tache, duree: duree / 60});
      projet.heures += duree / 60;
    }
  });

  ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches);
  ss.toast(T_('reportGenerated'), T_('done'), 5);
}
