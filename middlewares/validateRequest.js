/**
 * Created by kennethobikwelu on 8/11/17.
 */

var jwt = require('jwt-simple');
var authValidate = require('../routes/auth');


module.exports = function (req, res, next) {

	console.log('********Validating request....');
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
	var origin = req.get('origin');

	console.log('Checking token/key....');
	if (token && key && origin) {
		try {
			var decoded = jwt.decode(token, require('../config/secret.js')());
			if (decoded.exp <= Date.now()) {
				console.log('token not valid....');
				res.status(400);
				res.json({
					"status" : 400,
					"message": "Token Expired. Please generate a new Token"
				});
			} else {
				console.log('token is still valid. Proceeding to next check');
				//remove this fix when the time is right - This is dev's access to the server
				if (decoded.issuer === origin || decoded.issuer === 'http://localhost:8100/') {
					console.log('request coming from a trusted issuer');
					if (decoded.username === key){
						console.log('token user and username matches');
						// Authorize the user to see if s/he can access our resources
						console.log('Checking Authorization....');
						var auth = authValidate();
						var item = [];
						item.push(key);
						auth.getRole(item, req, res, next)
					}else{
						res.status(403);
						res.json({
							"status" : 403,
							"message": "Incorrect token used"
						});
					}
				}else {
					res.status(403);
					res.json({
						"status" : 403,
						"message": "Request is coming from an unidentified domain"
					});
				}
			}
		} catch (err) {
			res.status(500);
			res.json({
				"status" : 500,
				"message": "Oops something went wrong",
				"error"  : err
			});
		}
	} else {
		res.status(401);
		res.json({
			"status" : 401,
			"message": "Missing required header parameters - one of these (Token, Key, Origin)"
		});
	}
};