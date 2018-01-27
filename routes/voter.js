let voterDao = require('../dao/voterDao');


module.exports = function () {


	return {

		addVoter: function (req, res) {
			console.log('***** add voter processing....');

			let firstname = req.body.firstname;
			let lastname = req.body.lastname;
			let state = req.body.state;
			let email = req.body.email;
			let gender = req.body.gender;
			let city = req.body.city;
			let address = req.body.address;
			let phonenumber = req.body.phonenumber;
			let userid = req.body.userid.$oid;

			let payLoad = [];


			if (firstname === '' || lastname === '' || state === '' || email === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
			} else {

				payLoad.push(email);
				payLoad.push(firstname);
				payLoad.push(lastname);
				payLoad.push(state);
				payLoad.push(gender);
				payLoad.push(city);
				payLoad.push(address);
				payLoad.push(phonenumber);
				payLoad.push(userid);

				let dao = voterDao();
				dao.addVoter(payLoad, res);
			}
		}
	}
}