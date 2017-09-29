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

            var location = [req.body.longitude, req.body.latitude];
            var comments = req.body.comments;
            var images  = req.body.images;
            var rating = req.body.rating;
            var isCheckedIn = req.body.isCheckedIn;
            var timeCheckedIn = req.body.timeCheckedIn;
            var intendedDurationOfUse = req.body.intendedDurationOfUse;
            var payLoad = [];


           if (req.body.longitude === '' || req.body.latitude === ''){
               res.status(422);
               res.json({
                   "status": 422,
                   "message": "Missing required parameters"
               });
               return;
           }
            payLoad.push(location);

            //comments
            if (comments === ''){
                //do nothing
            }else {
                payLoad.push(['comments', comments])
            }
            //images
            if (images === ''){
                //do nothing
            }else {
                payLoad.push(['images', images])
            }
            //rating
            if (rating === ''){
                //do nothing
            }else {
                payLoad.push(['rating', rating])
            }
            //IsCheckedIn
            if (isCheckedIn === ''){
                //do nothing
            }else {
                payLoad.push(['isCheckedIn', isCheckedIn])
            }
            //timeCheckedIn
            if (timeCheckedIn === ''){
                //do nothing
            }else {
                payLoad.push(['timeCheckedIn', timeCheckedIn])
            }
            //intendedDurationOfUse
            if (intendedDurationOfUse === ''){
                //do nothing
            }else {
                payLoad.push(['intendedDurationOfUse', intendedDurationOfUse])
            }

            var dao = chargePointDao();
            dao.updateChargingPoint('chargePoints', payLoad, res);
        }
    }
}


