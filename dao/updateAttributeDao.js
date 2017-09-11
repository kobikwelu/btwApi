/**
 * Created by KennethObikwelu on 9/10/17.
 */

var mongoJs = require('mongojs');
var mongo = require('../config');
var port = 15214;
var mongoDBTestAccounts = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_test]);

module.exports = function () {

	var updateAttribute = function (item, table, res) {
		if (table === 'test') {
			console.log('Starting modify action.....');
			//forEach( function (x) { x.photos = [{"uri": "/images/" + x.photos}]; db.members.save(x); });
			//create dummy collection in DB to test
			mongoDBTestAccounts.EV_CPTest.find({}, {snapshot: true}, function(err, docs){
				if (docs){
					docs.forEach(function(element){
						var location = [];
						var latitude = element.latitude;
						var longitude = element.longitude;
						location.push(latitude);
						location.push(longitude);
						mongoDBTestAccounts.EV_CPTest.save(element, function(err, docs){
							if (docs){
								console.log('save successful')
							} else {
								console.log('failed because of ' + err)
							}
						})
					})
				}
			})
		}
	}

	return {
		updateAttribute: function (item, table, res) {
			updateAttribute(item, table, res)
		}
	}
}