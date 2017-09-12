

var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var chargePoint = require('./chargePoint.js');
var chargeMetaData = require('./chargeMetaData.js');
var modifyAttribute = require('./modifyAttribute.js');



router.post('/user/register', function(req, res) {
    console.log ('***** register route processing....');
    var activeAuth = auth();
    activeAuth.registerUser(req, res);
});
/*
 * Routes that can be accessed by any one
 */
router.post('/user/login', function(req, res) {
    console.log ('***** Login route processing....');
    var activeAuth = auth();
    activeAuth.login(req, res);
});
/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/api/v1/getAllChargingPoints', function(req, res) {
    console.log ('***** get all charging points route processing....');
    var charge = chargePoint();
    charge.getAllChargingPoints(req, res)
});

router.get('/api/v1/getChargingPointBy', function(req, res) {
    console.log ('***** get All charging point by route processing....');
    var charge = chargePoint();
    charge.getChargingPointBy(req, res);
});

router.get('/api/v1/addChargingPoint', function(req, res) {
    console.log ('***** add charging point route processing....');

});

router.get('/api/v1/getChargingPointsMetaData', function(req, res) {
    console.log ('***** get charging points meta data route processing....');
    var metaData = chargeMetaData();
    metaData.getChargingPointsMetaData(req, res)
});

/**
 * utility methods
 * @type {core.Router|*}
 */
router.post('/api/v1/modifyFieldAttribute', function(req, res) {
    console.log ('***** calling utility method modify field attribute');
    var attribute  = modifyAttribute();
    attribute.updateAttribute(req, res);
});

module.exports = router;