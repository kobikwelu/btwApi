/**
 * Created by kennethobikwelu on 1/22/18.
 */

require ('newrelic');
let express = require('express');
let bodyParser = require('body-parser')
let logger = require('morgan');
let RateLimit = require('express-rate-limit');

let app = express();

/**
 * Middleware
 */

app.use(logger('combined'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.enable('trust proxy');

let limiter = new RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max     : 4500, // limit each IP to 100 requests per windowMs
	delayMs : 0 // disable delaying - full speed until the max limit is reached
});

// apply to all requests
//may need to ration access based on specific roles
app.use(limiter);

app.all('/*', function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		console.log('req.body: ' + JSON.stringify(req.body));
		next();
	}
});

//add route validator over here
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes/index'));


// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
	let err = new Error('No resource found');
	err.status = 404;
	next(err);
});

// Start the server
app.set('port', process.env['PORT'] || 4252);

let server = app.listen(app.get('port'), function () {
	console.log('###########################################################################################');
	console.log('###########################################################################################');
	console.log('Express server listening on port ' + server.address().port);
	console.log('Property of be the wave');
});

module.exports = app;