/**
 * Created by kennethobikwelu on 8/11/17.
 */

require('newrelic');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');


var app = express();

/**
 * Middleware
 */

app.use(logger('combined'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
var RateLimit = require('express-rate-limit');

app.enable('trust proxy');

var limiter = new RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max     : 4500, // limit each IP to 100 requests per windowMs
	delayMs : 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
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

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes/index'));


// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
	var err = new Error('No resource found');
	err.status = 404;
	next(err);
});

// Start the server
app.set('port', process.env['PORT'] || 4252);

var server = app.listen(app.get('port'), function () {
	console.log('###########################################################################################');
	console.log('###########################################################################################');
	console.log('Express server listening on port ' + server.address().port);
	console.log('Property of EVPoint');
});

module.exports = app;