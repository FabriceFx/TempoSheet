function envoyerContenuFeuilleParEmail() {
  var feuille = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var donnees = feuille.getDataRange().getValues();
  var sujet = T_('emailSubject') + feuille.getName(); 
  
  var destinataire = Session.getActiveUser().getEmail(); 
  if (!destinataire) {
    SpreadsheetApp.getUi().alert(T_('emailError'));
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
<h2>${T_('emailSubject')}${feuille.getName()}</h2>
<p>${T_('emailIntro')}</p>
<table>`;

  donnees.forEach(function(row) {
    htmlMessage += `<tr>`;
    row.forEach(function(cell) {
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
<p><i>${T_('emailFooter')}</i></p>
</body>
</html>`;

  GmailApp.sendEmail(destinataire, sujet, T_('emailFallback'), {htmlBody: htmlMessage});
  SpreadsheetApp.getActiveSpreadsheet().toast(T_('emailSent') + destinataire, T_('emailSentTitle'), 5);
}
