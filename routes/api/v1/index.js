/**
 * Created by KennethObikwelu on 9/16/17.
 */


let express = require('express');
let router = express.Router();
let voter = require('../../voter.js');
//var chargeMetaData = require('../../chargeMetaData.js');
//var modifyAttribute = require('../../modifyAttribute.js');
let auth = require('../../auth.js');


/*
 * Routes that can be accessed only by authenticated users
 */
/*router.get('/getAllChargingPoints', function (req, res) {
	console.log('***** get all charging points route processing....');
	var charge = chargePoint();
	charge.getAllChargingPoints(req, res)
});

router.get('/getChargingPointBy', function (req, res) {
	console.log('***** get All charging point by route processing....');
	var charge = chargePoint();
	charge.getChargingPointBy(req, res);
});

router.get('/getAllChargingPointsMetaData', function (req, res) {
	console.log('***** get charging points meta data route processing....');
	var metaData = chargeMetaData();
	metaData.getChargingPointsMetaData(req, res)
});

router.get('/getChargingPointMetaData', function (req, res) {
	console.log('***** get charging point Meta data route processing....');
	var charge = chargePoint();
	charge.getChargingPointMetaData(req, res)
});*/

router.get('/getUser', function (req, res) {
	console.log('***** get user route processing....');
	let activeAuth = auth();
	activeAuth.getUser(req, res);
});


router.post('/addVoter', function (req, res) {
	console.log('***** add voter route processing....');
	let newVoter = voter();
	newVoter.addVoter(req, res);
});


/*
router.put('/updateChargingPoint', function (req, res) {
	console.log('***** update charging point route processing....');
	var charge = chargePoint();
	charge.updateChargingPoint(req, res);
});

router.post('/modifyFieldAttribute', function (req, res) {
	console.log('***** calling utility method modify field attribute');
	var attribute = modifyAttribute();
	attribute.updateAttribute(req, res);
});

router.post('/deleteUser', function (req, res) {
	console.log('***** delete User route processing....');
	var activeAuth = auth();
	activeAuth.deleteUser(req, res);
});

router.put('/updateUser', function (req, res) {
	console.log('***** modify User route processing....');
	var activeAuth = auth();
	activeAuth.modifyUser(req, res);
});
*/


module.exports = router;
