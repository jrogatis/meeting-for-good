/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ggCalendar/list                      ->  listCalendars
 */

import gcal from 'google-calendar';

const listCalendars = (req, res) => {
  if (!req.session.passport.user.googleToken) return res.redirect('/auth');
  gcal(req.session.passport.user.googleToken).calendarList.list((err, data) => {
    if (err) {
      console.log('listCalendars', err);
      return res.status(500).send(err);
    }
    return res.status(200).json(data);
  });
};

const listEvents = (req, res) => {
 /* if (!req.session.passport.user.googleToken) return res.redirect('/auth');
  gcal(req.session.passport.user.googleToken).events.list({ '', {timeMax: '??', timeMin: '??' }} (err, data) => {
    if (err) {
      console.log('listEvents', err);
      return res.status(500).send(err);
    }
    return res.status(200).json(data);
  });*/
};

export { listCalendars, listEvents };
