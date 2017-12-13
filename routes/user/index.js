/**
 * Created by KennethObikwelu on 9/16/17.
 */

var express = require('express');
var router = express.Router();
var auth = require('../auth.js');


router.post('/register', function (req, res) {
	console.log('***** register route processing....');
	var activeAuth = auth();
	activeAuth.registerUser(req, res);
});

router.post('/login', function (req, res) {
	console.log('***** Login route processing....');
	var activeAuth = auth();
	activeAuth.login(req, res);
});

router.post('/addCaptain', function (req, res) {
	console.log('***** Add Captain route processing....');
	var activeAuth = auth();
	activeAuth.addCaptain(req, res);
});

module.exports = router;