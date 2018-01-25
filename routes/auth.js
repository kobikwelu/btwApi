/**
 * Created by kennethobikwelu on 1/22/18.
 */


let userDao = require('../dao/userDao');
let jwt = require ('jwt-simple');

module.exports = function () {


	return {
		registerUser: function (req, res) {
			console.log('***** Auth register.....registration processing....');
			let username = req.body.username || '';
			let password = req.body.password || '';
			let email = req.body.email || '';
			let role = req.body.role || '';

			let firstname = req.body.firstname || '';
			let lastname = req.body.lastname || '';
			let address = req.body.address || '';
			let phonenumber = req.body.phonenumber || '';
			let dateofbirth = req.body.dateofbirth || '';

			let isProfileComplete = false;
			if (username !== '' && password !== '' && email !== '' && role !== '' &&
				firstname !== '' && lastname !== '' && address !== '' && phonenumber !== ''
				&& dateofbirth !== '') {
				 isProfileComplete = true
			}

			if (username === '' || password === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				let payLoad = [];
				payLoad.push(username);
				payLoad.push(password);
				payLoad.push(email);
				payLoad.push(role);

				payLoad.push(firstname);
				payLoad.push(lastname);
				payLoad.push(address);
				payLoad.push(phonenumber);
				payLoad.push(dateofbirth);
				payLoad.push(isProfileComplete);

				userDao().createAccount(payLoad, res);
			}
		},
		login       : function (req, res) {
			console.log('***** Auth login.....login processing....');
			let username = req.body.username || '';
			let password = req.body.password || '';

			if (username === '' || password === '') {
				res.status(401);
				res.json({
					"status" : 401,
					"message": "Invalid credentials"
				});
			} else {
				let payLoad = [];
				payLoad.push(username);
				payLoad.push(password);

				userDao().authenticateUser(payLoad, req, res);
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
		}
	}
}


