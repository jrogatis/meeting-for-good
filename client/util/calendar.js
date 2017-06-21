import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';
import jsonpatch from 'fast-json-patch';

import { checkStatus, parseJSON } from './fetch.util';

export const listCalendars = async () => {
  nprogress.configure({ showSpinner: false });
  nprogress.start();
  const response = await fetch('/api/ggcalendar/list', {
    credentials: 'same-origin',
  });
  try {
    checkStatus(response);
    const event = await parseJSON(response);
    return event;
  } catch (err) {
    console.error('err at listCalendars calendar.js', err);
    return null;
  } finally {
    nprogress.done();
  }
}
