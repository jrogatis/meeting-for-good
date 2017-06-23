import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';

import { checkStatus, parseJSON } from './fetch.util';

const editCurUser = async (patches, curUserId) => {
  nprogress.configure({ showSpinner: false });
  nprogress.start();
  const response = await fetch(`/api/user/${curUserId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    method: 'PATCH',
    body: JSON.stringify(patches),
  });

  try {
    checkStatus(response);
    const EditCurUser = await parseJSON(response);
    return EditCurUser;
  } catch (err) {
    console.log('events editEvent', err);
    return null;
  } finally {
    nprogress.done();
  }
};

export default editCurUser;
