/**
 * Created by KennethObikwelu on 10/16/17.
 */


var mongoJs = require('mongojs');
var mongo = require('../config');
var port = 15214;
var mongoDBAgendaJobs = mongoJs('mongodb://' + mongo.keys.mongo_user
	+ ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_agendaJobs]);
var mongoDBChargePointUser = mongoJs('mongodb://' + mongo.keys.mongo_user
	+ ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_user]);

var mongoDBUserNotification = mongoJs('mongodb://' + mongo.keys.mongo_user
	+ ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_userNotification]);


var agenda = new Agenda({db: {address: mongoDBAgendaJobs}});

//this job should have the query for searching the DB to pull the information from user collection
agenda.define('say hello', function (job, done) {
	console.log('hello world');


	})

agenda.on('ready', function(){
	agenda.every('1 day', 'say hello');
	agenda.start();
})

agenda.processEvery('1 munute');