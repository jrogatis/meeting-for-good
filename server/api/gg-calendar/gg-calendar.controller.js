/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ggCalendar/list                      ->  listCalendars
 */

const gcal = require('google-calendar');

export const listCalendars = (req, res) => {
  if (!req.session.passport.user.googleToken) return res.redirect('/auth');
  gcal(req.session.passport.user.googleToken).calendarList.list((err, data) => {
    if (err) return res.status(500).send(err);
    return res.send(data);
  });
};

