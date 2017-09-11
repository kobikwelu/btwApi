/**
 * Created by kennethobikwelu on 8/11/17.
 */


var chargePointMetaData = require('../dao/chargePointDao');

module.exports = function (){
    return {
        getChargingPointsMetaData: function(req, res) {
            console.log ('***** Middleware - get charging points meta data route processing....');
            var dao = chargePointMetaData();
            dao.getChargingPointsMetaData('chargePointMetaData', res);
        }
    }
}


