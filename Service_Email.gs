function envoyerContenuFeuilleParEmail() {
  var feuille = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var donnees = feuille.getDataRange().getValues();
  var sujet = "Rapport de Temps : " + feuille.getName(); 
  
  // Utilise l'email de l'utilisateur actif
  var destinataire = Session.getActiveUser().getEmail(); 
  if (!destinataire) {
    // Solution de repli si l'email ne peut pas être récupéré (ex: scripts déclenchés différemment)
    SpreadsheetApp.getUi().alert("Impossible de récupérer l'adresse email de l'utilisateur actif.");
    return;
  }

  var htmlMessage = `
<html>
<head>
<style>
  body { font-family: 'Google Sans', Roboto, Arial, sans-serif; color: #202124; line-height: 1.5; }
  table { border-collapse: collapse; width: 100%; margin-top: 20px; max-width: 800px; }
  th, td { border: 1px solid #dadce0; text-align: left; padding: 10px 14px; font-size: 14px; }
  th { background-color: #f8f9fa; font-weight: bold; color: #5f6368; }
  tr:nth-child(even) { background-color: #f8f9fa; }
  h2 { color: #1a73e8; font-size: 20px; }
  p { font-size: 14px; color: #5f6368; }
</style>
</head>
<body>
<h2>Rapport de Temps : ${feuille.getName()}</h2>
<p>Veuillez trouver ci-dessous le résumé de vos temps enregistrés :</p>
<table>`;

  donnees.forEach(function(row) {
    htmlMessage += `<tr>`;
    row.forEach(function(cell) {
      // Afficher les nombres avec 2 décimales si possible, sinon laisser tel quel
      let formatCell = cell;
      if (typeof cell === 'number' && !Number.isInteger(cell)) {
        formatCell = cell.toFixed(2);
      }
      htmlMessage += `<td>${formatCell !== "" ? formatCell : "&nbsp;"}</td>`;
    });
    htmlMessage += `</tr>`;
  });

  htmlMessage += `
</table>
<br>
<p><i>Ce rapport a été généré automatiquement par l'extension Générateur de Rapport de Temps.</i></p>
</body>
</html>`;

  GmailApp.sendEmail(destinataire, sujet, "Votre client de messagerie ne supporte pas le HTML.", {htmlBody: htmlMessage});
  SpreadsheetApp.getActiveSpreadsheet().toast("L'email a été envoyé avec succès à " + destinataire, "Email Envoyé", 5);
}
