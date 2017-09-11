/**
 * Created by kennethobikwelu on 8/11/17.
 */

var jwt = require('jwt-simple');
var authValidate = require('../routes/auth');


module.exports = function(req, res, next) {

    console.log ('********Validating request....');
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

    console.log ('Checking token/key....');
    if (token && key ) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());
            if (decoded.exp <= Date.now()) {
                console.log ('token not valid....');
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired. Please generate a new Token"
                });
                return;
            }else {
                console.log ('token is still valid. Proceeding to secured resource');
            }
            // Authorize the user to see if s/he can access our resources
            console.log ('Checking Authorization....');
            var auth = authValidate();
            var item = [];
            item.push(key);
            auth.getRole(item, req, res, next)
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Missing token or Key"
        });
    }
};