

var express = require('express');
var router = express.Router();


router.use('/user', require('./user/index.js'));
router.use('/api/v1', require('./api/v1/index.js'));

module.exports = router;