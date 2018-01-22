/**
 * Created by KennethObikwelu on 1/22/18.
 */


let express = require('express');
let router = express.Router();
let auth = require('../auth.js')


router.post('/register', function (req, res) {
	console.log('***** Register route processing....');
	let activeAuth = auth();
	activeAuth.registerUser(req, res);
});

router.post('/login', function (req, res) {
	console.log('***** Login route processing....');
	let activeAuth = auth();
	activeAuth.login(req, res);
});

module.exports = router;