/**
 * Created by kennethobikwelu on 8/11/17.
 */

var userDao = require('../dao/userDao');
var jwt = require('jwt-simple');

module.exports = function () {


	return {
		registerUser: function (req, res) {
			console.log('***** Auth register.....registration processing....');
			var username = req.body.username || '';
			var password = req.body.password || '';
			var email = req.body.email || '';
			var role = req.body.role || '';

			if (username === '' || password === '' || email === '' || role === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var payLoad = [];
				payLoad.push(username);
				payLoad.push(password);
				payLoad.push(email);
				payLoad.push(role);

				var dao = userDao();
				dao.createAccount(payLoad, 'user', res);
			}
		},
		login       : function (req, res) {
			console.log('***** Auth route.....login processing....');
			var username = req.body.username || '';
			var password = req.body.password || '';

			if (username === '' || password === '') {
				res.status(401);
				res.json({
					"status" : 401,
					"message": "Invalid credentials"
				});
			} else {
				var payLoad = [];
				payLoad.push(username);
				payLoad.push(password);

				var dao = userDao();
				dao.authenticateUser(payLoad, 'user', req, res);
			}
		},
		getRole     : function (item, req, res, next) {
			if (typeof item === 'undefined') {
				//do nothing
			} else {
				var dao = userDao();
				dao.getRole(item, req, res, next);
			}
		},
		deleteUser  : function (req, res) {
			console.log('***** Auth route ..... delete user processing....');
			var username = req.body.username || '';
			var password = req.body.password || '';
			var email = req.body.email || '';

			if (username === '' || password === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var payLoad = [];
				payLoad.push(username);
				payLoad.push(password);
				payLoad.push(email);

				var dao = userDao();
				dao.deleteAccount(payLoad, 'user', res);
			}

		},
		modifyUser  : function (req, res) {
			console.log('***** Auth route ..... modify user processing....');
			var firstname = req.body.firstname || '';
			var lastname = req.body.lastname || '';
			var username = req.body.username || '';
			var address = req.body.address || '';
			var dateOfBirth = req.body.dateOfBirth || '';
			var carModel = req.body.carModel || '';
			var thumbnail = req.body.thumbnail || '';
			var gender = req.body.gender || '';
			var email = req.body.email || '';

			if (firstname === '' || lastname === '' || username === '' || address === '' || dateOfBirth === ''
				|| carModel === '' || thumbnail === '' || gender === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var payLoad = [];
				payLoad.push(username);
				payLoad.push(email);
				payLoad.push(firstname);
				payLoad.push(lastname);
				payLoad.push(address);
				payLoad.push(dateOfBirth);
				payLoad.push(carModel);
				payLoad.push(thumbnail);
				payLoad.push(gender);

				var dao = userDao();
				dao.modifyUser(payLoad, 'user', res);
			}

		},
		getUser     : function (req, res) {
			var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
			if (token) {
				try {
					var decoded = jwt.decode(token, require('../config/secret.js')());
					if (decoded.username && decoded.email) {
						console.log('***** Auth route ..... get user processing....');

						var payLoad = [];
						payLoad.push(decoded.username);
						payLoad.push(decoded.email);

						var dao = userDao();
						dao.getUser(payLoad, 'user', res);
					} else {
						res.status(403);
						res.json({
							"status" : 403,
							"message": "Incorrect request parameters"
						});
					}
				} catch (err) {
					res.status(500);
					res.json({
						"status" : 500,
						"message": "Oops something went wrong",
						"error"  : err
					});
				}

			}
		},
		addCaptain  : function (req, res) {
			console.log('***** Add Captain route.....add captain processing....');
			var firstName = req.body.firstname || '';
			var lastName = req.body.lastname || '';
			var email = req.body.email || '';

			if (firstName === '' || lastName === '' || email === '') {
				res.status(401);
				res.json({
					"status" : 401,
					"message": "Missing required field "
				});
			} else {
				var payLoad = [];
				payLoad.push(firstName);
				payLoad.push(lastName);
				payLoad.push(email);

				var dao = userDao();
				dao.addCaptain(payLoad, 'captain', req, res);
			}

		}
	}
}


