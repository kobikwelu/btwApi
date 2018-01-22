/**
 * Created by kennethobikwelu on 8/1/17.
 */

require('dotenv').config();

module.exports = {
	keys: {
		mongo_user                    : process.env.MONGO_USER,
		mongo_password                : process.env.MONGO_PASSWORD,
		mongo_collection_user         : process.env.MONGO_COLLECTION_USER,
		mongo_collection_voter        : process.env.MONGO_COLLECTION_VOTER,
		mongo_collection_verifiedVoter: process.env.MONGO_COLLECTION_VERIFIEDVOTER
	}

}