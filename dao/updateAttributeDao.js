/**
 * Created by KennethObikwelu on 9/10/17.
 */

var mongoJs = require('mongojs');
var mongo = require('../config');
var port = 15214;
var mongoDBChargePoints = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_chargePoint]);

module.exports = function () {

	var updateAttribute = function (item, table, res) {
		if (table === 'test') {
			console.log('Starting modify action.....');
			//forEach( function (x) { x.photos = [{"uri": "/images/" + x.photos}]; db.members.save(x); });
			//create dummy collection in DB to test
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
				longitude              : 1,
				latitude               : 1,
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
			}, {snapshot: true}, function (err, docs) {
				if (docs) {
					docs.forEach(function (element) {
						var latitude = element.latitude;
						var longitude = element.longitude;
						mongoDBChargePoints.EV_ChargePoints.update(element,
							{$set: {"location": [longitude, latitude]}},
							{
								upsert: true,
								multi : true
							}, function (err, docs) {
								if (docs) {
									console.log('document updated successfully')
								} else {
									console.log('something went wrong because of ' + err);
								}
							})
					})
					res.status(200);
					res.json({
						"message": "update process successfully completed..."
					});
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