import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';

import { checkStatus, parseJSON } from './fetch.util';

export const listCalendars = async () => {
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
