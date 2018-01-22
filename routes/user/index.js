/**
 * Created by KennethObikwelu on 1/22/18.
 */


import express from 'express';
import auth from '../auth.js'
let router = express.Router();


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