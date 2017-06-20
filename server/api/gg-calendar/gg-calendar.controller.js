/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ggCalendar                          ->  index
 */

const gcal = require('google-calendar');

export const index = (req, res) => {
  console.log('index', req.session.passport.user.googleToken);
  const googleCalendar = new gcal.GoogleCalendar(req.session.passport.user.googleToken);
  googleCalendar.calendarList.list((err, calendarList) => {
    if (err) {
      console.log(err);
    }
    console.log(calendarList);
  });
  res.end('ok', 200);
};

