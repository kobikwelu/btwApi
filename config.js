/**
 * Created by kennethobikwelu on 8/1/17.
 */

require('dotenv').config();

module.exports = {
	keys: {
		mongo_user                          : process.env.MONGO_USER,
		mongo_password                      : process.env.MONGO_PASSWORD,
		mongo_collection_chargePointMetaData: process.env.MONGO_COLLECTION_CHARGEPOINTMETADATA,
		mongo_collection_chargePoint        : process.env.MONGO_COLLECTION_CHARGEPOINTS,
		mongo_collection_user               : process.env.MONGO_COLLECTION_USER,
		mongo_collection_test               : process.env.MONGO_COLLECTION_TEST
	}

}