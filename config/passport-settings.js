const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('../config/config.js')

// Strategy config
passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
},
(accessToken, refreshToken, profile, done) => {
    done(null, profile);
}
));