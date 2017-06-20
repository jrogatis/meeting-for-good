import User from '../../api/user/user.model';

module.exports = (passport) => {
  passport.serializeUser((data, done) => {
    done(null, data);
  });

  passport.deserializeUser((data, done) => {
    User.findById(data.id, (err, user) => {
      done(err, user);
    });
  });
};
