/**
 * Created by kennethobikwelu on 8/11/17.
 */

var userDao = require('../dao/userDao');

module.exports = function () {

	return {
		registerUser: function (req, res) {
			console.log('***** Auth register.....registration processing....');
			var username = req.body.username || '';
			var password = req.body.password || '';
			var email = req.body.email || '';
			var role = req.body.role || '';

			var payLoad = [];
			payLoad.push(username);
			payLoad.push(password);
			payLoad.push(email);
			payLoad.push(role);


			if (username === '' || password === '' || email === '' || role === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var dao = userDao();
				dao.createAccount(payLoad, 'user', res);
			}
		},
		login       : function (req, res) {
			console.log('***** Auth route.....login processing....');
			var username = req.body.username || '';
			var password = req.body.password || '';
			var payLoad = [];
			payLoad.push(username);
			payLoad.push(password);

			if (username === '' || password === '') {
				res.status(401);
				res.json({
					"status" : 401,
					"message": "Invalid credentials"
				});
				return;
			}

			var dao = userDao();
			dao.authenticateUser(payLoad, 'user', req, res);
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

			var payLoad = [];
			payLoad.push(username);
			payLoad.push(password);
			payLoad.push(email);
			if (username === '' || password === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var dao = userDao();
				dao.deleteAccount(payLoad, 'user', res);
			}

		},
		modifyUser  : function (req, res) {
			console.log('***** Auth route ..... modify user processing....');
			var username = req.body.username || '';
			var address = req.body.address || '';
			var dateOfBirth = req.body.dateOfBirth || '';
			var carModel = req.body.carModel || '';
			var thumbnail = req.body.thumbnail || '';
			var gender = req.body.gender || '';
			var email = req.body.email || '';

			var payLoad = [];
			payLoad.push(username);
			payLoad.push(email);
			payLoad.push(address);
			payLoad.push(dateOfBirth);
			payLoad.push(carModel);
			payLoad.push(thumbnail);
			payLoad.push(gender);


			if (username === '' || address === '' || dateOfBirth === '' || carModel === '' || thumbnail === '' || gender === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {
				var dao = userDao();
				dao.modifyUser(payLoad, 'user', res);
			}

		}

	}
}


