/**
 * Created by kennethobikwelu on 8/11/17.
 */


var chargePointDao = require('../dao/chargePointDao');


module.exports = function () {


    return {
        getAllChargingPoints: function (req, res) {
            console.log('***** charging route processing....');
            //get the information from req.query....

            var dao = chargePointDao();
            dao.getAllChargingPoints('chargePoints', res)
        },
        getChargingPointBy: function (req, res) {
            console.log('***** charging by route processing....');
            //get the information from req.query....
            var latitude = req.query.latitude || '';
            var longitude = req.query.longitude || '';

            if (latitude === '' || longitude === '') {
                res.status(422);
                res.json({
                    "status": 422,
                    "message": "Missing required parameters"
                });
                return;
            }

            var payLoad = [];
            payLoad.push(longitude);
            payLoad.push(latitude);

            var dao = chargePointDao();
            dao.getAllChargingPointsBy('chargePoints', payLoad, res);
        }
    }
}


