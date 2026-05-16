//@OnlyCurrentDoc

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
    const html = HtmlService.createHtmlOutputFromFile('Sidebar_Export')
                            .setTitle(isEn ? 'Time Report Generator' : 'Générateur de rapport de temps')
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
    .addItem(isEn ? 'Show instructions' : 'Afficher les instructions', 'afficherInstructionsBarreLaterale')
    .addSeparator()
    .addItem(isEn ? 'About' : 'A propos', 'afficherInfosDeveloppeur')
    .addToUi();
};

const afficherInstructionsBarreLaterale = () => {
  const isEn = Session.getActiveUserLocale().startsWith('en');
  const html = HtmlService.createHtmlOutputFromFile('Sidebar_Help')
    .setTitle(isEn ? 'Instructions' : 'Instructions')
    .setWidth(350);
  SpreadsheetApp.getUi().showSidebar(html);
};


function afficherInfosDeveloppeur() {

  const htmlContent = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            margin: 20px;
            color: #202124; /* Google Workspace text color */
          }
          strong {
            color: #202124; /* Darker text for emphasis */
          }
          p {
            line-height: 1.6;
          }
          .linkedin-logo, .paypal-logo {
            vertical-align: middle;
            margin-right: 5px;
          }
          .paypal-button {
            background-color: #FFB830; /* PayPal button color */
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
        <p>Développé par Fabrice Faucheux <a href='https://atelier-informatique.com' target="_blank">L'atelier informatique</a></p>
        <p>Me retrouver sur LinkedIn <a href='https://www.linkedin.com/in/fabricefaucheux' target="_blank"><img class="linkedin-logo" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20"/>Fabrice Faucheux</a></p>
        <p>Si vous souhaitez soutenir mon travail, vous pouvez faire un don via PayPal :</p>
        <p><a class="paypal-button" href='https://paypal.me/FFaucheux?country.x=FR&locale.x=fr_FR' target="_blank">Soutenir via PayPal</a></p>
      </body>
    </html>
  `;
  const dialogue = HtmlService.createHtmlOutput(htmlContent)
    .setWidth(450)
    .setHeight(260); // Ajustez la hauteur pour bien afficher tout le contenu
  SpreadsheetApp.getUi().showModalDialog(dialogue, 'À propos');
}
