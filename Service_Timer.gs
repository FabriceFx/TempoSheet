function afficherTimerSidebar() {
  const html = HtmlService.createTemplateFromFile('Sidebar_Timer').evaluate()
    .setTitle(T_('sidebarTimerTitle'))
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Au-delà de cette durée, l'enregistrement doit être confirmé explicitement.
 * Protège contre le chronomètre oublié : lancé un vendredi soir et arrêté le
 * lundi matin, il créerait sinon en silence un événement de 63 heures.
 * Cette valeur est aussi injectée dans Sidebar_Timer.html via <?= ?>.
 */
const SEUIL_ALERTE_DUREE_HEURES = 12;

/**
 * Exposé pour le template Sidebar_Timer.html. Passer par une fonction plutôt que
 * par la constante garantit la résolution depuis un scriptlet <?= ?>.
 * @return {number}
 */
function seuilAlerteDureeHeures() {
  return SEUIL_ALERTE_DUREE_HEURES;
}

/** Clés utilisées par le chronomètre dans les propriétés utilisateur. */
const CLES_TIMER = [
  'TIMER_RUNNING',
  'TIMER_START_TIME',
  'TIMER_AGENDA_ID',
  'TIMER_PROJECT_NAME',
  'TIMER_TASK_DESC'
];

function getTimerState() {
  const props = PropertiesService.getUserProperties().getProperties();
  if (props['TIMER_RUNNING'] === 'true') {
    return {
      isRunning: true,
      startTime: props['TIMER_START_TIME'],
      agendaId: props['TIMER_AGENDA_ID'],
      projectName: props['TIMER_PROJECT_NAME'],
      taskDescription: props['TIMER_TASK_DESC']
    };
  }
  return { isRunning: false };
}

function saveTimerState(agendaId, projectName, taskDescription, startTime) {
  PropertiesService.getUserProperties().setProperties({
    'TIMER_RUNNING': 'true',
    'TIMER_START_TIME': startTime,
    'TIMER_AGENDA_ID': agendaId,
    'TIMER_PROJECT_NAME': projectName,
    'TIMER_TASK_DESC': taskDescription
  });
}

/**
 * Efface uniquement l'\u00E9tat du chronom\u00E8tre, sans toucher aux autres pr\u00E9f\u00E9rences
 * \u00E9ventuellement stock\u00E9es dans les propri\u00E9t\u00E9s utilisateur.
 */
function clearTimerState() {
  const props = PropertiesService.getUserProperties();
  CLES_TIMER.forEach(cle => props.deleteProperty(cle));
}

/**
 * Cr\u00E9e l'\u00E9v\u00E9nement correspondant \u00E0 la session chronom\u00E9tr\u00E9e, puis remet le
 * chronom\u00E8tre \u00E0 z\u00E9ro. Un verrou \u00E9vite qu'un double-clic ne cr\u00E9e deux \u00E9v\u00E9nements.
 *
 * @param {string} agendaId
 * @param {string} projectName
 * @param {string} taskDescription
 * @param {string} startTime - Date ISO.
 * @param {string} endTime - Date ISO.
 * @param {boolean} [confirmeLongueDuree] - true si l'utilisateur a explicitement
 *     valid\u00E9 une dur\u00E9e sup\u00E9rieure \u00E0 SEUIL_ALERTE_DUREE_HEURES.
 * @return {string} Message de confirmation traduit.
 */
function creerEvenementDansAgenda(agendaId, projectName, taskDescription, startTime, endTime, confirmeLongueDuree) {
  const heures = (new Date(endTime) - new Date(startTime)) / 3600000;

  if (!(heures > 0)) {
    throw new Error(T_('timerInvalidRange'));
  }

  // Garde-fou c\u00F4t\u00E9 serveur : m\u00EAme si la barre lat\u00E9rale est obsol\u00E8te ou
  // contourn\u00E9e, aucune dur\u00E9e aberrante ne peut \u00EAtre enregistr\u00E9e sans validation.
  if (heures > SEUIL_ALERTE_DUREE_HEURES && !confirmeLongueDuree) {
    throw new Error(T_('timerTooLong').replace('{duree}', formaterDuree_(heures)));
  }

  const verrou = LockService.getUserLock();
  if (!verrou.tryLock(10000)) {
    throw new Error(T_('timerBusy'));
  }

  try {
    const calendar = CalendarApp.getCalendarById(agendaId);
    if (!calendar) {
      throw new Error(T_('calendarNotFound'));
    }
    const eventTitle = `#${projectName.replace(/[\s\u200B-\u200F\u2028-\u202F\u2060\uFEFF]+/gu, '')}${taskDescription ? " " + taskDescription : ""}`;
    calendar.createEvent(eventTitle, new Date(startTime), new Date(endTime));

    clearTimerState();
    return T_('eventCreated');
  } finally {
    verrou.releaseLock();
  }
}
