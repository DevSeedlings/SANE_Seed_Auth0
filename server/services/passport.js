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
  db.user.read_email([profile.emails[0].value], function(err, user) {

    user = user[0];

    // Is there an error?
    if (err) {
      return done(err);
    }

    // Does the user not exist?
    else if (!user) {

      // Is there a name or do I need a placeholder name?
      if (!profile.name.givenName)
        profile.name = {
          givenName: profile.displayName,
          familyName: null
        };

      // Create user.
      db.user.insert([profile.name.givenName, profile.name.familyName, profile.emails[0].value], function(err, user) {
        if (err) {
          return done(err);
        }

        return done(null, user[0]);
      })
    }

    // Can and does the username need to be updated?
    else if (!user.name_last && profile.name.familyName) {

      // Change name
      user.name_first = profile.name.givenName;
      user.name_last = profile.name.familyName;

      // Update user
      db.users.save(user, function(err, user) {
        if (err) {
          console.log('User update error on login', err);

          return done(err);
        }

        return done(null, user);
      });
    }
    
    // User exists and no changes need to be made.
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
