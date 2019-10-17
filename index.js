// ---------------------- DEPENDECIES ---------------------- \\
const express = require('express');
const app = express();
const passport = require('passport');
const authService = require('./services/authService')
require('./config/passport-settings');

// ---------------------- DEFINITIONS ---------------------- \\
app.use(express.static(__dirname + '/views')); // Set static folder
app.set('views', __dirname + '/views'); // Set views
app.engine('html', require('ejs').renderFile); // Set engine to render html files
app.use(passport.initialize()); // Initialize passport

// ---------------------- AUTHENTICATION ---------------------- \\
// passport.authenticate middleware is used here to authenticate the request
app.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: ['profile']
}));

// After succces Google login, sign JWT and redirect
app.get('/auth/google/callback', passport.authenticate('google', {session: false}), (req, res) => {
    const token = authService.issueToken(req.user);
    const uriEncodedToken = encodeURIComponent(token);
    const user = JSON.stringify(req.user._json)

    // Redirect user to page where token and user data will be saved in local storage
    res.redirect('/redirect.html?token=' + uriEncodedToken + "&user=" + user)
});

// Verify JWT token from header
app.get('/verify', (req, res) => {
    const jwt_token = req.headers['authorization'].split(' ')[1]

    if(authService.verifyToken(jwt_token)){
        res.status(200)
        res.json({verified: true})
    } else {
        res.status(200)
        res.json({verified: false})
    }
});

// ---------------------- ROUTES (without MW) ---------------------- \\
app.get('/', (req, res) => {
    res.render('index.html');
});

// ---------------------- SECRET ROUTES (MW) ---------------------- \\
// This routes require authorization header to have valid JWT 
app.get('/secret', authService.checkTokenMW, (req, res) => {
    res.status(200)
    res.json({status: 'success', requestToken: req.token})
});

// ---------------------- START APP ---------------------- \\
app.listen(3000, () => {
    console.log('Server Started!');
});