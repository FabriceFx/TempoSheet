function ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches) {
  // Début de la section résumé
  let row = 6; // Commence à la ligne 6 pour respecter l'ébauche donnée
  let totalHeures = 0;

  feuille.getRange(`D${row}`).setValue("Calendrier").setFontWeight("bold");

  // Écriture du résumé des projets et des heures
  projetsEtTaches.forEach((details, projet) => {
    feuille.getRange(`A${row + 1}`).setValue(projet);
    feuille.getRange(`B${row + 1}`).setNumberFormat('#,##0.00').setValue(details.heures); // Format et valeur
    totalHeures += details.heures;
    row++;
  });
  row += 2;
  feuille.getRange(`A${row}`).setValue("Détails horaire").setFontWeight("bold").setFontSize(12);
  feuille.getRange(`A${row}:E${row}`).setBorder(null, null, true, null, null, null, null, SpreadsheetApp.BorderStyle.SOLID);
  row++;
  feuille.getRange(`A${row}`).setValue("Projets").setFontWeight("bold");
  feuille.getRange(`B${row}`).setValue("Détails").setFontWeight("bold");
  feuille.getRange(`E${row}`).setValue("Heures par projet").setFontWeight("bold");
  row++;

  // Écriture des projets, tâches et durées
  projetsEtTaches.forEach((details, projet) => {
    feuille.getRange(`A${row}`).setValue(projet);
    feuille.getRange(`E${row}`).setNumberFormat('#,##0.00').setValue(details.heures); // Format et valeur
    row++;

    details.taches.forEach(tache => {
      feuille.getRange(`B${row}`).setValue(tache.nom);
      feuille.getRange(`E${row}`).setNumberFormat('#,##0.00').setValue(tache.duree); // Format et valeur
      row++;
    });
  });

  // Ajout du total des heures à la fin
  feuille.getRange(`A${row}`).setValue("Total des heures").setFontWeight("bold");
  feuille.getRange(`E${row}`).setFontWeight("bold").setNumberFormat('#,##0.00').setValue(totalHeures);
}

function calculerDatesPeriode(periode, dateDebutSpecifiee, dateFinSpecifiee) {
  const aujourdhui = new Date();
  let dateDebut, dateFin;
  let textePeriode;

  switch (periode) {
    case "cetteSemaine":
      // Obtenir le numéro du jour actuel (0 = dimanche, 1 = lundi, ..., 6 = samedi)
      const jourActuel = aujourdhui.getDay();
      // Calculer la différence entre le jour actuel et le lundi (en tenant compte que dimanche est 0)
      const differenceDepuisLundi = jourActuel - 1; // Pour dimanche (0), cela donnera -1, ce qui est correctement ajusté ci-dessous

      // Si aujourd'hui est dimanche (0 en JS), définir la différence pour revenir au lundi précédent
      const ajustementDimanche = (jourActuel === 0 ? -6 : 0);

      // Calculer le début de la semaine (lundi)
      dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() - differenceDepuisLundi + ajustementDimanche);
      // Réinitialiser l'heure au début de la journée
      dateDebut.setHours(0, 0, 0, 0);

      // Calculer la fin de la semaine (dimanche)
      dateFin = new Date(dateDebut);
      dateFin.setDate(dateDebut.getDate() + 6);
      // Ajuster l'heure à la fin de la journée
      dateFin.setHours(23, 59, 59, 999);

      textePeriode = "du " + formaterDate(dateDebut) + " au " + formaterDate(dateFin);
      break;

  case "laSemaineDerniere":
    // Obtenir le numéro du jour actuel (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    const jourActuelDerniere = aujourdhui.getDay();
    // Calculer la différence entre le jour actuel et le lundi de la semaine dernière
    const differenceDepuisLundiDerniere = jourActuelDerniere - 1; // Pour dimanche (0), cela donnera -1, ce qui est correctement ajusté ci-dessous
    
    // Calculer combien de jours reculer pour arriver au lundi de la semaine dernière
    const joursAReculer = differenceDepuisLundiDerniere + 7; // Reculer de 7 jours supplémentaires pour atteindre la semaine dernière
    const ajustementDimancheDerniere = (jourActuelDerniere === 0 ? -6 : 0); // Si aujourd'hui est dimanche, ajuster différemment

    // Calculer le début de la semaine dernière (lundi)
    dateDebut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() - joursAReculer + ajustementDimancheDerniere);
    dateDebut.setHours(0, 0, 0, 0); // Réinitialiser l'heure au début de la journée

    // Calculer la fin de la semaine dernière (dimanche)
    dateFin = new Date(dateDebut);
    dateFin.setDate(dateDebut.getDate() + 6);
    dateFin.setHours(23, 59, 59, 999); // Ajuster l'heure à la fin de la journée

    textePeriode = "du " + formaterDate(dateDebut) + " au " + formaterDate(dateFin);
    break;

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
      console.log('Date début spécifiée:', dateDebutSpecifiee, 'Date fin spécifiée:', dateFinSpecifiee);
      if (dateDebutSpecifiee && dateFinSpecifiee && new Date(dateDebutSpecifiee) <= new Date(dateFinSpecifiee)) {
        dateDebut = new Date(dateDebutSpecifiee);
        dateFin = new Date(dateFinSpecifiee);
      } else {
        textePeriode = "Période spécifiée non valide";
        return { texte: textePeriode }; // Retourne immédiatement si la période spécifiée est invalide
      }
      break;

    default:
      // Gérer un cas où 'periode' n'est pas reconnu si nécessaire
      break;
  }

  // Génération du texte de la période pour tous les cas sauf "periodeSpecifiee" invalide
  if (!textePeriode) { // Si textePeriode n'est pas déjà défini (cas invalide "periodeSpecifiee")
    textePeriode = `du ${formaterDate(dateDebut)} au ${formaterDate(dateFin)}`;
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
  miseEnForme(feuille); // Assurez-vous que cette fonction prend la feuille comme paramètre si elle doit appliquer la mise en forme

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

  const evenements = calendrier.getEvents(new Date(dates.debut), new Date(dates.fin));
  evenements.forEach(function(event) {
    const titre = event.getTitle();
    
    // Utilisation d'une Regex pour séparer correctement le hashtag du reste (même s'il y a plusieurs espaces)
    const regex = /^#(\S+)(?:\s+(.*))?$/;
    const match = titre.match(regex);

    if (match) {
      const nomProjet = match[1];
      let tache = match[2] ? match[2].trim() : "Tâches diverses";
      if (tache === "") tache = "Tâches diverses";

      let duree;
      if (event.isAllDayEvent()) {
        duree = 24 * 60; // Considérer une durée de 24 heures (en minutes) pour les événements toute la journée
      } else {
        duree = (event.getEndTime() - event.getStartTime()) / (1000 * 60); // Durée en minutes
      }

      if (!projetsEtTaches.has(nomProjet)) {
        projetsEtTaches.set(nomProjet, { taches: [], heures: 0 });
      }
      const projet = projetsEtTaches.get(nomProjet);
      projet.taches.push({nom: tache, duree: duree / 60}); // Conversion en heures pour le stockage
      projet.heures += duree / 60; // Accumulation en heures
    }
  });

  ecrireProjetsEtTachesDansFeuille(feuille, projetsEtTaches);
  ss.toast("Le rapport a été généré avec succès !", "Terminé", 5);
}



