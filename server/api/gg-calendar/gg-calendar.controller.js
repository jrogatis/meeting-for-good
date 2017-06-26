/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ggCalendar/list                      ->  listCalendars
 */

import gcal from 'google-calendar';
import refresh from 'passport-oauth2-refresh';
import User from '../user/user.model';

// Get the user's credentials.
const getCredencials = async req => User.findById(req.user);

const listCalendars = async (req, res) => {
  try {
    const curUser = await getCredencials(req);
    console.log('curUser', curUser);
    if (!curUser.accessToken) return res.redirect('/auth');
    gcal(curUser.accessToken).calendarList.list((err, data) => {
      if (err) {
        console.error(' error at listCalendars get calendarList', err);
        return res.status(500).send(err);
      }
      return res.status(200).json(data);
    });
  } catch (err) {
    console.error('listCalendars', err);
    return res.status(500).send(err);
  }
};

const listEvents = async (req, res) => {
  console.log('cheguei');
  const calendarId = req.params.calendarId;
  const minDate = req.params.minDate;
  const maxDate = req.params.maxDate;
  console.log(calendarId, minDate, maxDate);
  const curUser = await getCredencials(req);
  if (!curUser.accessToken) return res.redirect('/auth');
  gcal(curUser.accessToken)
    .events.list(calendarId, { timeMax: maxDate, timeMin: minDate }, (err, data) => {
      if (err) {
        console.log('listEvents', err);
        return res.status(500).send(err);
      }
      console.log(data);
      return res.status(200).json(data);
    });
};

export { listCalendars, listEvents };
