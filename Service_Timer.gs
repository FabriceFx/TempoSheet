function afficherTimerSidebar() {
  const isEn = Session.getActiveUserLocale().startsWith('en');
  const html = HtmlService.createHtmlOutputFromFile('Sidebar_Timer')
    .setTitle(isEn ? 'Time Tracker' : 'Enregistrement des tâches')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

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

function clearTimerState() {
  PropertiesService.getUserProperties().deleteProperty('TIMER_RUNNING');
}

function creerEvenementDansAgenda(agendaId, projectName, taskDescription, startTime, endTime) {
  try {
    const calendar = CalendarApp.getCalendarById(agendaId);
    if (!calendar) {
      throw new Error(`Calendrier non trouvé.`);
    }
    const eventTitle = `#${projectName.replace(/\s+/g, '')}${taskDescription ? " " + taskDescription : ""}`;
    const event = calendar.createEvent(eventTitle, new Date(startTime), new Date(endTime));
    
    // Nettoyer l'état après succès
    clearTimerState();
    return "L'événement a été créé avec succès !";
  } catch (e) {
    throw new Error(`Erreur: ${e.toString()}`);
  }
}
