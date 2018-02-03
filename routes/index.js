


let express = require('express');
let router = express.Router();

/**
 * master route. All api's must have a pattern and be inserted here
 */
router.use('/user', require('./user/index.js'));
router.use('/api/v1', require('./api/v1/index.js'));
router.use('/loaderio-de3087e5b90705fb70ef1533718f6054', require('./loaderio-de3087e5b90705fb70ef1533718f6054.txt'))

module.exports = router;