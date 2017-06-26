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
  let curUser;
  try {
    curUser = await getCredencials(req);
    if (!curUser.accessToken) return res.redirect('/auth');
  } catch (err) {
    console.error(' error at listCalendars get curUser', err);
    return res.status(500).send(err);
  }
  gcal(curUser.accessToken).calendarList.list(async (err, calendarList) => {
    if (err && err.code === 401) {
      try {
        const accessToken = await refresh.requestNewAccessToken('google', curUser.refreshToken);
        console.log('newToken', accessToken);
        await curUser.save({ accessToken });
        gcal(curUser.accessToken).calendarList.list(
          (err, calendarList) => {
            if (err) return res.status(401).send(err);
            console.log('listCall', calendarList);
            return res.status(200).send(calendarList);
          });
      } catch (err) {
        console.error('error at newToken', err);
        return res.status(401).send(err);
      }
    }
    return res.status(200).send(calendarList);
  });
};


const listEvents = async (req, res) => {
  const calendarId = req.params.calendarId;
  const minDate = decodeURI(req.params.minDate);
  const maxDate = decodeURI(req.params.maxDate);
  const curUser = await getCredencials(req);
  if (!curUser.accessToken) return res.redirect('/auth');
  gcal(curUser.accessToken)
    .events.list(calendarId, { timeMax: maxDate, timeMin: minDate }, (err, data) => {
      if (err) {
        console.error('listEvents at gg-calendar.controler', err);
        return res.status(500).send(err);
      }
      return res.status(200).json(data);
    });
};

export { listCalendars, listEvents };
