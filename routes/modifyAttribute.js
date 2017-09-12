/**
 * Created by KennethObikwelu on 9/10/17.
 */



var updateAttributeDao = require('../dao/updateAttributeDao');


module.exports = function () {

	return {
		updateAttribute: function (req, res) {
			console.log('***** Middleware - modify attribute route processing....');
			//get the information from req.query....
			var latitude = req.query.fieldOne || '';
			var longitude = req.query.fieldTwo || '';
			var action = req.query.action || '';

			if (latitude === '' || longitude === '' || action === '') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "Missing required parameters"
				});
				return;
			}

			var payLoad = [];
			payLoad.push(longitude);
			payLoad.push(latitude);
			payLoad.push(action);

			var dao = updateAttributeDao();
			dao.updateAttribute(payLoad, 'test', res);
		}
	}
}