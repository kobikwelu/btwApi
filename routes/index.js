


let express = require('express');
let router = express.Router();

/**
 * master route. All api's must have a pattern and be inserted here
 */
router.use('/user', require('./user/index.js'));
router.use('/api/v1', require('./api/v1/index.js'));

module.exports = router;