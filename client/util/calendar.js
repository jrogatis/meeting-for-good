import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';
import { checkStatus, parseJSON } from './fetch.util';

nprogress.configure({ showSpinner: false });

const listCalendars = async () => {
  nprogress.start();
  try {
    const response = await fetch('/api/ggcalendar/list', { credentials: 'same-origin' });
    checkStatus(response);
    const calendars = await parseJSON(response);
    return calendars;
  } catch (err) {
    console.error('listCalendars at calendars.js', err);
    return err;
  } finally {
    nprogress.done();
  }
};

const headerForGet = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  credentials: 'same-origin',
  method: 'GET',
};

const loadCalendarEvents = async (urlToFetch) => {
  try {
    const calendarEvents = await fetch(encodeURI(urlToFetch), headerForGet);
    checkStatus(calendarEvents);
    const result = parseJSON(calendarEvents);
    return result;
  } catch (err) {
    console.error('ERROR at loadCalendarEvents calendar', err);
    return err;
  }
};

const listEventsForCalendar = async (maxMinDates, id) => {
  const urlToFetch = encodeURI(`/api/ggcalendar/listEvents/${id}/${maxMinDates.minDate.utc().format()}/${maxMinDates.maxDate.utc().format()}`);
  try {
    return await loadCalendarEvents(urlToFetch);
  } catch (err) {
    console.error('ERROR at listEvents calendar', err);
    return err;
  }
};
const flatCalendarEvents = async (calendarIds, maxMinDates) => {
  const events = [];
  await Promise.all(calendarIds.map(
    async (calendarId) => {
      const calendarEvents = await listEventsForCalendar(maxMinDates, calendarId);
      calendarEvents.items.forEach(event => events.push(event));
    }));
  return events;
};

const listCalendarEvents = async (maxMinDates, curUser) => {
  nprogress.start();
  const calendarIds = curUser.selectedCalendarsIds;
  try {
    const result = await flatCalendarEvents(calendarIds, maxMinDates);
    return result;
  } catch (err) {
    console.error('listCalendarEvents calendar.js', err);
  } finally {
    nprogress.done();
  }
};

export { listCalendars, listCalendarEvents };
