/**
 * Created by kennethobikwelu on 8/1/17.
 */

var mongoJs = require('mongojs');
var mongo = require('../config');
var port = 15214;
var mongoDBChargePointMetaData = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_chargePointMetaData]);
var mongoDBChargePoints = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_chargePoint]);

module.exports = function () {
	/**
	 *
	 * @param table
	 * @param res
	 */
	var getAllChargingPoints = function (table, res) {
		if (table === 'chargePoints') {
			console.log('Starting get query for charging points');
			mongoDBChargePoints.EV_ChargePoints.find({}, {
				access_days_time       : 1,
				cards_accepted         : 1,
				date_last_confirmed    : 1,
				expected_date          : 1,
				fuel_type_code         : 1,
				id                     : 1,
				groups_with_access_code: 1,
				open_date              : 1,
				owner_type_code        : 1,
				status_code            : 1,
				station_name           : 1,
				station_phone          : 1,
				updated_at             : 1,
				geocode_status         : 1,
				latitude               : 1,
				longitude              : 1,
				city                   : 1,
				intersection_directions: 1,
				plus4                  : 1,
				state                  : 1,
				street_address         : 1,
				zip                    : 1,
				bd_blends              : 1,
				e85_blender_pump       : 1,
				ev_connector_types     : 1,
				ev_dc_fast_num         : 1,
				ev_level1_evse_num     : 1,
				ev_level2_evse_num     : 1,
				ev_network             : 1,
				ev_network_web         : 1,
				ev_other_evse          : 1,
				hy_status_link         : 1,
				lpg_primary            : 1,
				ng_fill_type_code      : 1,
				ng_psi                 : 1,
				ng_vehicle_class       : 1,
				station                : 1,
				posts                  : 1
			}, {limit: 200}, function (err, docs) {
				if (err || typeof docs[0] === 'undefined') {
					res.status(503);
					res.json({
						"status" : 503,
						"message": "Something went wrong, please try again later"
					});
				}
				else {
					res.json(docs);
				}
			})
		}
	};

	/**
	 *
	 * @param table
	 * @param res
	 */
	var getChargingPointsMetaData = function (table, res) {
		if (table === 'chargePointMetaData') {
			console.log('Starting get query for charging points meta data');
			mongoDBChargePointMetaData.EV_ChargePointMetaData.find({}, function (err, docs) {
				if (err || typeof docs[0] === 'undefined') {
					res.status(503);
					res.json({
						"status" : 503,
						"message": "Something went wrong, please try again later"
					});
				}
				else {
					res.json(docs)
				}
			})
		}
	};
	//The solution is to ensure the longitude and latitude are stored in an array field in the DB
	//that array field should then be indexed with the ensure index. The array field should then be thus {<dbarray field> : 2d}
	var getAllChargingPointsBy = function (table, item, res) {
		if (table === 'chargePoints') {
			console.log('Starting get query for charging points by location.....');
			mongoDBChargePoints.EV_ChargePoints.ensureIndex();
			mongoDBChargePoints.EV_ChargePoints.find({
					latitude: {
						$near: {
							$geometry   : {type: "Point", coordinates: [Number(item[0]), Number(item[1])]},
							$maxDistance: 300
						}
					}
				}, function (err, docs) {
					if (err) {
						res.status(503);
						res.json({
							"status" : 503,
							"message": "Something went wrong, please try again later " + err
						});
					}
					else {
						res.json(docs);
					}
				}
			)
		}
	}
	return {
		getAllChargingPoints     : function (table, res) {
			console.log('***** CHARGINGPOINT DAO .....');
			getAllChargingPoints(table, res)
		},
		getChargingPointsMetaData: function (table, res) {
			console.log('***** CHARGEPOINTMETADATA DAO .....');
			getChargingPointsMetaData(table, res)
		},
		getAllChargingPointsBy   : function (table, item, res) {
			console.log('***** CHARGEPOINTSBY DAO .....');
			getAllChargingPointsBy(table, item, res)
		}
	}
}