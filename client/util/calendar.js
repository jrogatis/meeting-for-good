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

const listEventsForCalendar = async (maxMinDates, id) => {
  const urlToFetch = encodeURI(`/api/ggcalendar/listEvents/${id}/${maxMinDates.minDate.toString()}/${maxMinDates.maxDate.toString()}`);
  try {
    const calendarEvents =
      await fetch(encodeURI(urlToFetch), {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'GET' });
    checkStatus(calendarEvents);
    return parseJSON(calendarEvents);
  } catch (err) {
    console.error('ERROR at listEvents calendar', err);
    return err;
  }
};

const listCalendarEvents = async (maxMinDates, curUser) => {
  nprogress.start();
  const events = [];
  const calendarIds = curUser.selectedCalendarsIds;
  console.log(calendarIds);
  try {
    await Promise.all(calendarIds.map(
      async (calendarId) => {
        console.log('no forEach', calendarId);
        const calendarEvents = await listEventsForCalendar(maxMinDates, calendarId);
        events.push({ calendarId: calendarEvents });
      }),
    );
    return events;
  } catch (err) {
    console.log('listCalendarEvents calendar.js', err);
  } finally {
    nprogress.done();
  }
};

export { listCalendars, listCalendarEvents };
