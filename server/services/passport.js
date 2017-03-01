// PASSPORT //
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// APP //
var app = require('./../index');
var db = app.get('db');

// CONFIG //
var config = require('./../config');

// RUN WHEN LOGGING IN //
passport.use(new Auth0Strategy(config.AUTH_CONFIG, function(accessToken, refreshToken, extraParams, profile, done) {
  db.user.search_email([profile.emails[0].value], function(err, user) {

    user = user[0];

    if (err) {
      return done(err);
    }
    else if (!user) {
      if (!profile.name.givenName)
        profile.name = {
          givenName: profile.displayName,
          familyName: null
        };

      db.user.create([profile.name.givenName, profile.name.familyName, profile.emails[0].value], function(err, user) {
        if (err) {
          return done(err);
        }

        return done(null, user[0]);
      })
    }
    else if (!user.name_last && profile.name.familyName) {
      console.log('updating user', user);
      user.name_first = profile.name.givenName;
      user.name_last = profile.name.familyName;

      db.users.save(user, function(err, user) {
        if (err) {
          console.log('User update error on login', err);

          return done(err);
        }

        done(null, user)
      });
    }
    else {
      return done(null, user);
    }
  });
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;
