import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';

import { checkStatus, parseJSON } from './fetch.util';

const listCalendars = async () => {
  const urlToFetch = '/api/ggcalendar/list';
  nprogress.configure({ showSpinner: false });
  nprogress.start();
  const response = await fetch(urlToFetch, { credentials: 'same-origin' });
  try {
    checkStatus(response);
    const calendars = await parseJSON(response);
    return calendars;
  } catch (err) {
    console.error('loadEvents, at events.js', err);
    return err;
  } finally {
    nprogress.done();
  }
};

const listEventsForCalendar = async (maxMinDates, id) => {
  const urlToFetch = encodeURI(`/api/ggcalendar/listEvents/${id}/${maxMinDates.minDate.toString()}/${maxMinDates.maxDate.toString()}`);
  console.log(urlToFetch);
  const calendarEvents =
    await fetch(encodeURI(urlToFetch), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'GET',
    });
  try {
    checkStatus(calendarEvents);
    const result = parseJSON(calendarEvents);
    console.log(result);
    return result;
  } catch (err) {
    console.log('ERROR at listEvents calendar', err);
    return err;
  }
};

const listCalendarEvents = async (maxMinDates, curUser) => {
  nprogress.configure({ showSpinner: false });
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
