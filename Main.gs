/**
 * GWorkspace Timesheet
 * 
 * Cet outil permet de transformer Google Agenda en un système de suivi du temps (Time Tracking).
 * Les utilisateurs marquent leurs événements avec des hashtags (ex: #Projet) et l'extension
 * génère automatiquement des rapports détaillés et agrégés dans Google Sheets.
 * 
 * @author Fabrice Faucheux
 * @version 1.1.0
 * @see https://atelier-informatique.com
 */

const onInstall = (e) => {
  onOpen(e);
};

// Fonction pour récupérer la langue côté client
function getUserLanguage() {
  return Session.getActiveUserLocale().substring(0, 2);
}

const afficherBarreCreation = () => {
  try {
    const isEn = Session.getActiveUserLocale().startsWith('en');
    const html = HtmlService.createTemplateFromFile('Sidebar_Export').evaluate()
                            .setTitle(isEn ? 'GWorkspace Timesheet' : 'GWorkspace Timesheet')
                            .setWidth(350);
    SpreadsheetApp.getUi().showSidebar(html);
  } catch (erreur) {
    console.error("Erreur lors de l'affichage de la barre latérale : ", erreur);
  }
};

const onOpen = (e) => {
  const ui = SpreadsheetApp.getUi();
  const isEn = Session.getActiveUserLocale().startsWith('en');
  
  ui.createAddonMenu()
    .addItem(isEn ? 'Create report' : 'Créer un rapport', 'afficherBarreCreation')
    .addItem(isEn ? 'Start timer' : 'Lancer le chronomètre', 'afficherTimerSidebar')
    .addItem(isEn ? 'Send report by email' : 'Envoyer le rapport par email', 'envoyerContenuFeuilleParEmail')
    .addSeparator()
    .addItem(isEn ? 'Show instructions' : 'Afficher les instructions', 'afficherInstructionsBarreLaterale')
    .addItem(isEn ? 'About' : 'A propos', 'afficherInfosDeveloppeur')
    .addToUi();
};

const afficherInstructionsBarreLaterale = () => {
  const isEn = Session.getActiveUserLocale().startsWith('en');
  const html = HtmlService.createTemplateFromFile('Sidebar_Help').evaluate()
    .setTitle('Instructions')
    .setWidth(350);
  SpreadsheetApp.getUi().showSidebar(html);
};


function afficherInfosDeveloppeur() {
  const htmlContent = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: #1a73e8;
            --on-surface: #202124;
            --surface: #ffffff;
            --outline: #dadce0;
          }
          body {
            font-family: 'Google Sans', Arial, sans-serif;
            margin: 20px;
            color: var(--on-surface);
            background: var(--surface);
          }
          strong { color: var(--on-surface); }
          p { line-height: 1.6; font-size: 14px; }
          a { color: var(--primary); text-decoration: none; }
          a:hover { text-decoration: underline; }
          .linkedin-logo { vertical-align: middle; margin-right: 5px; }
          .paypal-button {
            background-color: #FFB830;
            color: #202124;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            text-align: center;
            display: inline-block;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <p>${T_('aboutDev')} <a href='https://atelier-informatique.com' target="_blank">L'atelier informatique</a></p>
        <p>${T_('aboutLinkedIn')} <a href='https://www.linkedin.com/in/fabricefaucheux' target="_blank"><img class="linkedin-logo" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20"/>Fabrice Faucheux</a></p>
        <p>${T_('aboutDonate')}</p>
        <p><a class="paypal-button" href='https://paypal.me/FFaucheux?country.x=FR&locale.x=fr_FR' target="_blank">${T_('aboutDonateBtn')}</a></p>
      </body>
    </html>
  `;
  const dialogue = HtmlService.createHtmlOutput(htmlContent)
    .setWidth(450)
    .setHeight(260);
  SpreadsheetApp.getUi().showModalDialog(dialogue, T_('aboutTitle'));
}
