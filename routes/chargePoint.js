/**
 * Created by kennethobikwelu on 8/11/17.
 */


var chargePointDao = require('../dao/chargePointDao');


module.exports = function () {


    return {
        getAllChargingPoints: function (req, res) {
            console.log('***** charging route processing....');
            var dao = chargePointDao();
            dao.getAllChargingPoints('chargePoints', res)
        },
        getChargingPointBy: function (req, res) {
            console.log('***** charging by route processing....');
            var latitude = req.query.latitude || '';
            var longitude = req.query.longitude || '';

            if (latitude === '' || longitude === '') {
                res.status(422);
                res.json({
                    "status": 422,
                    "message": "Missing query parameters"
                });
                return;
            }

            var payLoad = [];
            payLoad.push(longitude);
            payLoad.push(latitude);

            var dao = chargePointDao();
            dao.getAllChargingPointsBy('chargePoints', payLoad, res);
        },
        updateChargingPoint: function (req, res) {
            console.log('***** update Charging point processing....');

            var longitude = req.body.longitude;
            var latitude = req.body.latitude;
            var comments = req.body.comments;
            var images  = req.body.images;
            var rating = req.body.rating;
            var isCheckedIn = req.body.isCheckedIn;
            var timeCheckedIn = req.body.timeCheckedIn;
            var intendedDurationOfUse = req.body.intendedDurationOfUse;
            var payLoad = [];


           if (typeof longitude === 'undefined' || typeof latitude === 'undefined'){
               res.status(422);
               res.json({
                   "status": 422,
                   "message": "Missing required parameters"
               });
               return;
           }

            payLoad.push(longitude);
            payLoad.push(latitude);

            //comments 2
            if (typeof comments === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['comments', comments])
            }
            //images 3
            if (typeof images === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['images', images])
            }
            //rating 4
            if (typeof rating === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['rating', rating])
            }
            //IsCheckedIn 5
            if (typeof isCheckedIn === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['isCheckedIn', isCheckedIn])
            }
            //timeCheckedIn 6
            if (typeof timeCheckedIn === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['timeCheckedIn', timeCheckedIn])
            }
            //intendedDurationOfUse 7
            if (typeof intendedDurationOfUse === 'undefined'){
                payLoad.push(null);
            }else {
                payLoad.push(['intendedDurationOfUse', intendedDurationOfUse])
            }

            var dao = chargePointDao();
            dao.updateChargingPoint('chargePoints', payLoad, res);
        },

        getChargingPointMetaData: function(req, res){
            console.log('***** get Charging point meta data processing....');
            var latitude = req.query.latitude || '';
            var longitude = req.query.longitude || '';

            if (latitude === '' || longitude === '') {
                res.status(422);
                res.json({
                    "status": 422,
                    "message": "Missing query parameters"
                });
                return;
            }
            var payLoad = [];
            payLoad.push(longitude);
            payLoad.push(latitude);

            var dao = chargePointDao();
            dao.getChargingPointMetaData('chargePoints', payLoad, res);
        }
    }
}


