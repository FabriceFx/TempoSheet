function miseEnForme() {
  const feuille = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const totalColonnes = feuille.getMaxColumns(); // Obtient le nombre total de colonnes dans la feuille
  const colonneF = 6; // La colonne F est la 6ème colonne
  
  // Calculer le nombre de colonnes à supprimer
  const colonnesASupprimer = totalColonnes - colonneF + 1; // +1 car la colonne F doit aussi être supprimée
  
  // Vérifier s'il y a des colonnes à supprimer
  if (colonnesASupprimer > 0) {
    feuille.deleteColumns(colonneF, colonnesASupprimer);
  }
  
  // Ajuster la largeur des colonnes
  feuille.setColumnWidth(1, 140); // Colonne A à 140
  feuille.setColumnWidth(2, 140); // Colonne B à 140
  feuille.setColumnWidth(3, 270); // Colonne C à 270
  feuille.setColumnWidth(4, 180); // Colonne D à 180
  feuille.setColumnWidth(5, 140); // Colonne E à 140

  // Mise en forme et valeur pour les cellules spécifiques
  feuille.getRange("C1").setValue("Rapport de temps").setFontWeight("bold").setFontSize(24);

  feuille.getRange("A5").setValue("Résumé de l'enregistrement des heures").setFontWeight("bold").setFontSize(12);
  feuille.getRange("A5:E5").setBorder(null, null, true, null, null, null, null, SpreadsheetApp.BorderStyle.SOLID);

  feuille.getRange("A6").setValue("Projets").setFontWeight("bold");
  feuille.getRange("D6").setValue("Calendrier").setFontWeight("bold");

  feuille.getRange("C1:C2").setVerticalAlignment("middle").setHorizontalAlignment("center");

  // Définir le format de nombre pour la colonne E avec deux décimales, en utilisant une virgule comme séparateur décimal
  const derniereLigne = feuille.getLastRow(); // Obtient la dernière ligne avec des données
  if (derniereLigne >= 6) { // S'assurer qu'il y a des données au-delà de l'en-tête
    feuille.getRange("E7:E" + derniereLigne).setNumberFormat("#,##0.00"); // Essayez ce format si "0.00" ne fonctionne pas
  }

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

  // Vérifie directement si le nomBase est déjà pris et incrémente le compteur si nécessaire
  while (nomExistant.includes(nomFeuille)) {
    nomFeuille = `${nomBase} (${compteur})`;
    compteur++;
  }

  return nomFeuille;
}

function formaterDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yyyy");
}
