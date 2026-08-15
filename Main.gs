/**
 * TempoSheet
 * 
 * Cet outil permet de transformer Google Agenda en un système de suivi du temps (Time Tracking).
 * Les utilisateurs marquent leurs événements avec des hashtags (ex: #Projet) et l'extension
 * génère automatiquement des rapports détaillés et agrégés dans Google Sheets.
 * 
 * @author Fabrice Faucheux
 * @version 1.2.0
 * @see https://atelier-informatique.com
 */

const onInstall = (e) => {
  onOpen(e);
};

const afficherBarreCreation = () => {
  try {
    const html = HtmlService.createTemplateFromFile('Sidebar_Export').evaluate()
      .setTitle(T_('sidebarExportTitle'))
      .setWidth(350);
    SpreadsheetApp.getUi().showSidebar(html);
  } catch (erreur) {
    console.error("Erreur lors de l'affichage de la barre latérale : ", erreur);
  }
};

const onOpen = (e) => {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem(T_('menuCreateReport'), 'afficherBarreCreation')
    .addItem(T_('menuStartTimer'), 'afficherTimerSidebar')
    .addItem(T_('menuSendEmail'), 'envoyerContenuFeuilleParEmail')
    .addSeparator()
    .addItem(T_('menuHelp'), 'afficherInstructionsBarreLaterale')
    .addItem(T_('menuAbout'), 'afficherInfosDeveloppeur')
    .addToUi();
};

const afficherInstructionsBarreLaterale = () => {
  const html = HtmlService.createTemplateFromFile('Sidebar_Help').evaluate()
    .setTitle(T_('sidebarHelpTitle'))
    .setWidth(350);
  SpreadsheetApp.getUi().showSidebar(html);
};


/**
 * Logo LinkedIn en SVG inline.
 * Auparavant chargé à chaud depuis upload.wikimedia.org : dépendance externe
 * fragile, et requête sortante non souhaitable depuis une boîte de dialogue.
 */
const LOGO_LINKEDIN_SVG_ = '<svg class="linkedin-logo" width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';

function afficherInfosDeveloppeur() {
  const htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* Mêmes tokens Material 3 que les barres latérales (voir Styles.html). */
          :root {
            --primary: #137333;
            --on-surface: #1f1f1f;
            --on-surface-variant: #444746;
            --surface: #ffffff;
            --surface-container: #f0f4f9;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --primary: #81c995;
              --on-surface: #e3e3e3;
              --on-surface-variant: #c4c7c5;
              --surface: #1f1f1f;
              --surface-container: #2d2f31;
            }
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: var(--on-surface);
            background: var(--surface);
            font-size: 14px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          p { margin: 0 0 14px; color: var(--on-surface-variant); }
          strong { color: var(--on-surface); font-weight: 500; }
          a { color: var(--primary); text-decoration: none; border-radius: 2px; }
          a:hover { text-decoration: underline; }
          a:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
          .linkedin-logo { vertical-align: middle; margin-right: 6px; }
          a[target="_blank"] { display: inline-flex; align-items: center; }
          /* Bouton pill Material 3, cohérent avec les barres latérales. */
          .paypal-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 40px;
            padding: 0 24px;
            border-radius: 20px;
            background: var(--primary);
            color: var(--surface);
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
          }
          .paypal-button:hover { text-decoration: none; opacity: 0.9; }
        </style>
      </head>
      <body>
        <p>${T_('aboutDev')} <a href='https://atelier-informatique.com' target="_blank">L'atelier informatique</a></p>
        <p>${T_('aboutLinkedIn')} <a href='https://www.linkedin.com/in/fabricefaucheux' target="_blank">${LOGO_LINKEDIN_SVG_}Fabrice Faucheux</a></p>
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
