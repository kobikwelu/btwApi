/**
 * Created by kennethobikwelu on 1/22/18.
 */

let jwt = require ('jwt-simple');
let authValidate = require ('../routes/auth');

module.exports = function (req, res, next) {

	console.log('********Validating request....');
	let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	let key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
	let origin = req.get('origin');

	console.log('Checking token/key....');
	if (token && key && origin) {
		try {
			let decoded = jwt.decode(token, require('../config/secret.js')());

			for (let x in decoded){
				console.log(' is ' + x);
			}
			if (decoded.expiresAt <= Date.now()) {
				console.log('token not valid....');
				res.status(400);
				res.json({
					"status" : 400,
					"message": "Token Expired. Please generate a new Token"
				});
			} else {
				console.log('token is still valid. Proceeding to next check');
				//remove this fix when the time is right - This is dev's access to the server
				console.log('1' + decoded.issuer);
				console.log('2' + origin);
				if (decoded.issuer === origin || origin === 'http://localhost:3000') {
					console.log('request coming from a trusted issuer');
					if (decoded.username === key){
						console.log('token user and username matches');
						// Authorize the user to see if s/he can access our resources
						console.log('Checking Authorization....');
						let auth = authValidate();
						let item = [];
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