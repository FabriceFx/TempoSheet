function envoyerContenuFeuilleParEmail() {
  var feuille = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var donnees = feuille.getDataRange().getValues();
  var sujet = T_('emailSubject') + feuille.getName(); 
  
  var destinataire = Session.getActiveUser().getEmail(); 
  if (!destinataire) {
    SpreadsheetApp.getUi().alert(T_('emailError'));
    return;
  }

  // Construction d'un e-mail professionnel
  var htmlMessage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7f9; padding-bottom: 40px; }
    .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #2d3e50; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #1a73e8; padding: 30px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
    .content { padding: 40px 30px; }
    .content h2 { margin-top: 0; color: #1a73e8; font-size: 20px; font-weight: 500; }
    .content p { line-height: 1.6; color: #5f6368; font-size: 15px; }
    .table-container { width: 100%; overflow-x: auto; margin-top: 25px; border: 1px solid #e8eaed; border-radius: 6px; }
    table { border-collapse: collapse; width: 100%; min-width: 500px; }
    th { background-color: #f8f9fa; color: #5f6368; font-weight: 600; text-align: left; padding: 12px 15px; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e8eaed; }
    td { padding: 12px 15px; border-bottom: 1px solid #e8eaed; font-size: 14px; color: #202124; }
    tr:last-child td { border-bottom: none; }
    tr:nth-child(even) { background-color: #fafafa; }
    .footer { padding: 25px; text-align: center; color: #9aa0a6; font-size: 12px; line-height: 1.5; }
    .footer a { color: #1a73e8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main">
      <tr>
        <td class="header">
          <h1>Timesheet</h1>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h2>${T_('emailSubject')}${feuille.getName()}</h2>
          <p>${T_('emailIntro')}</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>`;

  // Utilisation de la première ligne comme en-tête si elle existe
  if (donnees.length > 0) {
    donnees[0].forEach(function(cell) {
      htmlMessage += `<th>${cell !== "" ? cell : "&nbsp;"}</th>`;
    });
    htmlMessage += `</tr></thead><tbody>`;

    // Corps du tableau (à partir de la 2ème ligne)
    for (var i = 1; i < donnees.length; i++) {
      htmlMessage += `<tr>`;
      donnees[i].forEach(function(cell) {
        let formatCell = cell;
        if (typeof cell === 'number' && !Number.isInteger(cell)) {
          formatCell = cell.toFixed(2);
        } else if (cell instanceof Date) {
          formatCell = Utilities.formatDate(cell, Session.getScriptTimeZone(), "dd/MM/yyyy");
        }
        htmlMessage += `<td>${formatCell !== "" ? formatCell : "&nbsp;"}</td>`;
      });
      htmlMessage += `</tr>`;
    }
  }

  htmlMessage += `
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>${T_('emailFooter')}</p>
          <p>&copy; 2026 <a href="https://atelier-informatique.com">L'atelier informatique</a>. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  GmailApp.sendEmail(destinataire, sujet, T_('emailFallback'), {htmlBody: htmlMessage});
  SpreadsheetApp.getActiveSpreadsheet().toast(T_('emailSent') + destinataire, T_('emailSentTitle'), 5);
}
