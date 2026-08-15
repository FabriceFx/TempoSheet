/**
 * Dictionnaire de traduction unique de l'add-on.
 *
 * Source de vérité pour le serveur (T_) comme pour les barres latérales
 * (getTextesUI, appelé une fois au chargement de chaque sidebar). Les fichiers
 * HTML ne contiennent donc plus aucune chaîne traduisible en dur.
 *
 * Pour ajouter une langue : ajouter la clé de langue dans chaque entrée et
 * l'étendre dans langueUtilisateur_().
 */

/** @return {string} 'en' ou 'fr' selon les préférences du compte Google. */
function langueUtilisateur_() {
  return Session.getActiveUserLocale().startsWith('en') ? 'en' : 'fr';
}

const TEXTES_ = {
  // --- Menu et titres de barres latérales ---
  menuCreateReport:   { fr: 'Créer un rapport',              en: 'Create report' },
  menuStartTimer:     { fr: 'Lancer le chronomètre',         en: 'Start timer' },
  menuSendEmail:      { fr: 'Envoyer le rapport par email',  en: 'Send report by email' },
  menuHelp:           { fr: 'Afficher les instructions',     en: 'Show instructions' },
  menuAbout:          { fr: 'À propos',                      en: 'About' },
  sidebarExportTitle: { fr: 'Timesheet',                     en: 'Timesheet' },
  sidebarTimerTitle:  { fr: 'Enregistrement des tâches',     en: 'Time Tracker' },
  sidebarHelpTitle:   { fr: 'Instructions',                  en: 'Instructions' },

  // --- Rapport généré ---
  timeReport:     { fr: 'Rapport de temps',                          en: 'Time Report' },
  hoursSummary:   { fr: "Résumé de l'enregistrement des heures",     en: 'Hours Recording Summary' },
  projects:       { fr: 'Projets',                                   en: 'Projects' },
  calendar:       { fr: 'Calendrier',                                en: 'Calendar' },
  hourlyDetails:  { fr: 'Détails horaire',                           en: 'Hourly Details' },
  details:        { fr: 'Détails',                                   en: 'Details' },
  hoursPerProject:{ fr: 'Heures par projet',                         en: 'Hours per Project' },
  totalHours:     { fr: 'Total des heures',                          en: 'Total Hours' },
  miscTasks:      { fr: 'Tâches diverses',                           en: 'Miscellaneous tasks' },
  from:           { fr: 'du ',                                       en: 'from ' },
  to:             { fr: ' au ',                                      en: ' to ' },
  invalidPeriod:  { fr: 'Période spécifiée non valide',              en: 'Invalid specified period' },

  // --- Libellés de période (options du menu déroulant + nom d'onglet) ---
  periodThisWeek:  { fr: 'Cette semaine',      en: 'This week' },
  periodLastWeek:  { fr: 'La semaine dernière', en: 'Last week' },
  periodThisMonth: { fr: 'Ce mois',            en: 'This month' },
  periodLastMonth: { fr: 'Le mois dernier',    en: 'Last month' },
  periodThisYear:  { fr: 'Cette année',        en: 'This year' },
  periodCustom:    { fr: 'Période spécifiée',  en: 'Custom period' },

  // --- Barre latérale « Créer un rapport » ---
  exportTitle:         { fr: 'Générer un rapport',                                                    en: 'Generate Report' },
  exportSubtitle:      { fr: 'Sélectionnez un calendrier et une période pour créer votre feuille de temps.', en: 'Select a calendar and a period to create your timesheet.' },
  exportCalendarLabel: { fr: 'Calendrier source',   en: 'Source Calendar' },
  exportPeriodLabel:   { fr: 'Période',             en: 'Period' },
  exportStartDate:     { fr: 'Date de début',       en: 'Start Date' },
  exportEndDate:       { fr: 'Date de fin',         en: 'End Date' },
  exportBtnCreate:     { fr: 'Créer le rapport',    en: 'Create Report' },

  // --- Barre latérale « Chronomètre » ---
  timerKbKey:             { fr: 'Espace',                    en: 'Space' },
  timerKbSpace:           { fr: 'Démarrer / Arrêter',        en: 'Start / Stop' },
  timerAgendaLabel:       { fr: 'Agenda cible',              en: 'Target Calendar' },
  timerProjectLabel:      { fr: 'Nom du projet',             en: 'Project Name' },
  timerProjectPlaceholder:{ fr: 'Ex : Marketing',            en: 'E.g.: Marketing' },
  timerTaskLabel:         { fr: 'Description de la tâche',   en: 'Task Description' },
  timerTaskPlaceholder:   { fr: '(Optionnelle)',             en: '(Optional)' },
  timerStart:             { fr: 'Démarrer',                  en: 'Start' },
  timerStop:              { fr: 'Arrêter',                   en: 'Stop' },

  // --- Messages communs aux barres latérales ---
  loading:            { fr: 'Chargement...',                        en: 'Loading...' },
  errPrefix:          { fr: 'Erreur : ',                            en: 'Error: ' },
  errCalendar:        { fr: 'Veuillez sélectionner un calendrier.',  en: 'Please select a calendar.' },
  errDates:           { fr: 'Veuillez spécifier les dates de début et de fin.', en: 'Please specify start and end dates.' },
  errLoadCalendars:   { fr: 'Erreur de chargement des calendriers.', en: 'Error loading calendars.' },
  errProject:         { fr: 'Veuillez entrer un nom de projet.',     en: 'Please enter a project name.' },

  // --- Chronomètre (serveur) ---
  eventCreated:     { fr: "L'événement a été créé avec succès !",  en: 'Event created successfully!' },
  calendarNotFound: { fr: 'Calendrier non trouvé.',                en: 'Calendar not found.' },
  timerBusy:        { fr: "Un enregistrement est déjà en cours de sauvegarde. Merci de réessayer.", en: 'A recording is already being saved. Please try again.' },

  // --- Export (serveur) ---
  reportGenerated: { fr: 'Le rapport a été généré avec succès !', en: 'Report generated successfully!' },
  done:            { fr: 'Terminé',                              en: 'Done' },

  // --- Email ---
  emailSubject:   { fr: 'Rapport de Temps : ',   en: 'Time Report: ' },
  emailIntro:     { fr: 'Veuillez trouver ci-dessous le résumé de vos temps enregistrés :', en: 'Please find below the summary of your recorded time:' },
  emailFooter:    { fr: "Ce rapport a été généré automatiquement par Timesheet.", en: 'This report was automatically generated by Timesheet.' },
  emailFallback:  { fr: 'Votre client de messagerie ne supporte pas le HTML.', en: 'Your email client does not support HTML.' },
  emailSent:      { fr: "L'email a été envoyé avec succès à ",   en: 'Email sent successfully to ' },
  emailSentTitle: { fr: 'Email Envoyé',                          en: 'Email Sent' },
  emailError:     { fr: "Impossible de récupérer l'adresse email de l'utilisateur actif.", en: "Unable to retrieve the active user's email address." },

  // --- Aide ---
  helpTitle: { fr: 'Timesheet', en: 'Timesheet' },
  helpP1:    { fr: 'Cet outil transforme votre Google Agenda en un système de suivi du temps.', en: 'This tool transforms your Google Calendar into a time tracking system.' },
  helpP2:    { fr: 'Premiers pas :', en: 'Getting started:' },
  helpL1:    { fr: 'Créez des événements dans le Google Agenda de votre choix.', en: 'Create events in your preferred Google Calendar.' },
  helpL2:    { fr: "Pour qu'un événement soit reconnu, son titre doit contenir un #tag identifiant le projet :", en: 'For an event to be recognized, its title must contain a #tag identifying the project:' },
  helpL3:    { fr: '#NomDuProjet Description de la tâche', en: '#ProjectName Task description' },
  helpL3b:   { fr: 'Le #tag peut aussi se trouver ailleurs dans le titre : « Réunion #projet1 hebdomadaire ». Le nom du projet accepte toutes les langues : #مشروع, #プロジェクト, #Проект…', en: 'The #tag may also appear elsewhere in the title: "Weekly #project1 meeting". The project name supports all languages: #مشروع, #プロジェクト, #Проект…' },
  helpL4:    { fr: 'Le reste du titre devient la description de la tâche. Sans description, la tâche sera nommée « Tâches diverses ».', en: 'The rest of the title becomes the task description. Without a description, the task will be named "Miscellaneous tasks".' },
  helpL5:    { fr: 'Allez dans le menu <strong>Extensions</strong> → <strong>Timesheet</strong> → <strong>Créer un rapport</strong>.', en: 'Go to the menu <strong>Extensions</strong> → <strong>Timesheet</strong> → <strong>Create report</strong>.' },
  helpL6:    { fr: 'Sélectionnez le calendrier source, la période souhaitée et cliquez sur <strong>Créer le rapport</strong>.', en: 'Select the source calendar, the desired period, and click on <strong>Create report</strong>.' },
  helpP3:    { fr: 'Informations complémentaires :', en: 'Additional information:' },
  helpP4:    { fr: 'Si vous avez des questions ou souhaitez signaler un problème, contactez-nous :', en: 'If you have questions or want to report an issue, contact us:' },
  helpAllDay: { fr: 'Un événement « journée entière » est comptabilisé forfaitairement à 7 heures par journée couverte.', en: 'An all-day event is counted at a flat rate of 7 hours per day covered.' },

  // --- À propos ---
  aboutDev:       { fr: 'Développé par Fabrice Faucheux', en: 'Developed by Fabrice Faucheux' },
  aboutLinkedIn:  { fr: 'Me retrouver sur LinkedIn',      en: 'Find me on LinkedIn' },
  aboutDonate:    { fr: 'Si vous souhaitez soutenir mon travail, vous pouvez faire un don via PayPal :', en: 'If you would like to support my work, you can make a donation via PayPal:' },
  aboutDonateBtn: { fr: 'Soutenir via PayPal',            en: 'Support via PayPal' },
  aboutTitle:     { fr: 'À propos',                       en: 'About' }
};

/**
 * Retourne un texte traduit selon la langue de l'utilisateur.
 * @param {string} key - La clé du texte à traduire.
 * @return {string} Le texte traduit, ou la clé elle-même si elle est inconnue.
 */
function T_(key) {
  const entree = TEXTES_[key];
  if (!entree) return key;
  return entree[langueUtilisateur_()] || entree.fr;
}

/**
 * Retourne l'intégralité des libellés résolus dans la langue de l'utilisateur.
 * Appelé une seule fois par barre latérale, au chargement.
 * @return {Object<string, string>}
 */
function getTextesUI() {
  const langue = langueUtilisateur_();
  const resultat = {};
  Object.keys(TEXTES_).forEach(function(cle) {
    resultat[cle] = TEXTES_[cle][langue] || TEXTES_[cle].fr;
  });
  return resultat;
}

/**
 * Retourne le libellé traduit d'une clé de période, utilisé pour nommer l'onglet.
 * @param {string} periode - Clé de période (cetteSemaine, ceMois, ...).
 * @return {string} Le libellé lisible.
 */
function libellePeriode_(periode) {
  const cles = {
    cetteSemaine: 'periodThisWeek',
    laSemaineDerniere: 'periodLastWeek',
    ceMois: 'periodThisMonth',
    leDernierMois: 'periodLastMonth',
    cetteAnnee: 'periodThisYear',
    periodeSpecifiee: 'periodCustom'
  };
  return T_(cles[periode] || 'timeReport');
}
