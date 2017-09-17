/**
 * Created by KennethObikwelu on 9/16/17.
 */


var express = require('express');
var router = express.Router();
var chargePoint = require('../../chargePoint.js');
var chargeMetaData = require('../../chargeMetaData.js');
var modifyAttribute = require('../../modifyAttribute.js');


/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/getAllChargingPoints', function (req, res) {
	console.log('***** get all charging points route processing....');
	var charge = chargePoint();
	charge.getAllChargingPoints(req, res)
});


router.get('/getChargingPointBy', function (req, res) {
	console.log('***** get All charging point by route processing....');
	var charge = chargePoint();
	charge.getChargingPointBy(req, res);
});

router.get('/addChargingPoint', function (req, res) {
	console.log('***** add charging point route processing....');

});

router.get('/getChargingPointsMetaData', function (req, res) {
	console.log('***** get charging points meta data route processing....');
	var metaData = chargeMetaData();
	metaData.getChargingPointsMetaData(req, res)
});

/**
 * utility methods
 * @type {core.Router|*}
 */
router.post('/modifyFieldAttribute', function (req, res) {
	console.log('***** calling utility method modify field attribute');
	var attribute = modifyAttribute();
	attribute.updateAttribute(req, res);
});


/**
 * delete methods
 * @type {core.Router|*}
 */
router.post('/deleteUser', function (req, res) {
	console.log('***** delete User route processing....');
	var activeAuth = auth();
	activeAuth.deleteUser(req, res);
});


module.exports = router;
