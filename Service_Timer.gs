function afficherTimerSidebar() {
  const html = HtmlService.createTemplateFromFile('Sidebar_Timer').evaluate()
    .setTitle(T_('sidebarTimerTitle'))
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
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
 * @return {string} Message de confirmation traduit.
 */
function creerEvenementDansAgenda(agendaId, projectName, taskDescription, startTime, endTime) {
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
