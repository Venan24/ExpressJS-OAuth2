const jwt = require('jsonwebtoken');
const config = require('../config/config.js')

//MW to check for valid JWT in header
module.exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    try {
        jwt_token = bearerHeader.split(' ')[1]; //Remove Bearer string to verify JWT
    } catch {
        res.status(403);
        res.json({message: 'Missing authentication token'});
    }

    if (typeof bearerHeader !== 'undefined') {
        if (this.verifyToken(jwt_token)){
            //Token is verified. Go next()
            req.token = jwt_token
            next()
        } else {
            res.status(403);
            res.json({message: 'Invalid token'});
        }
    } else {
        res.status(403);
        res.json({message: 'Missing authentication token'});
    }
};

// Issue JWT tokent that will be valid for 24h
module.exports.issueToken = function (userData) {
    token = jwt.sign({
        data: userData
    }, config.secret, { expiresIn: '24h' });

    return token;
};

// Verify token. Return true if verification is success.
module.exports.verifyToken =  function (jwt_token) {

    return jwt.verify(jwt_token, config.secret, function(err, decoded) {
        if (err === null){
            return true
        }
    });
}