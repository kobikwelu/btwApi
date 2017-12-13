/**
 * Created by kennethobikwelu on 8/11/17.
 */

var bcrypt = require('bcrypt');
var saltRounds = 10;
var jwt = require('jwt-simple');

var mongoJs = require('mongojs');
var mongo = require('../config');
var port = 15214;
var mongoDBChargePointUser = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_user]);
var mongoDBCPTest = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_test]);
var mongoDBBTWCaptain = mongoJs('mongodb://' + mongo.keys.mongo_user + ':' + mongo.keys.mongo_password + '@ds115214.mlab.com:' + port + '/evpoint', [mongo.keys.mongo_collection_btw_captain]);


module.exports = function () {

	function genToken(role, username, email) {
		console.log('getToken starts....');
		var expires = expiresIn(0.0098);
		var token = jwt.encode({
			issuer  : 'http://ev-client.herokuapp.com',
			exp     : expires,
			role    : role,
			username: username,
			email   : email
		}, require('../config/secret')());
		return {
			token  : token,
			expires: expires
		};
	}

	function expiresIn(numberOfMinutes) {
		var dateObj = new Date();
		return dateObj.setDate(dateObj.getDate() + numberOfMinutes);
	}

	/**
	 * this method validates the user to see if it exists or not
	 * @param item
	 * @param table
	 * @param req
	 * @param res
	 * @returns {boolean}
	 */
	var validateUser = function (item, table, req, res) {
		if (table === 'user') {
			mongoDBChargePointUser.EV_User.find({"user.username": item[0]}, function (err, docs) {
				if (err === null) {
					if (typeof docs === 'undefined' || docs === null) {
						res.status(500);
						res.json({
							"status" : 500,
							"message": "Internal Server Error"
						});
					} else {
						console.log('decrypting...')
						if (typeof docs[0] === 'undefined') {
							res.status(401);
							res.json({
								"status" : 401,
								"message": "Invalid credentials"
							});
						} else {
							bcrypt.compare(item[1], docs[0]['user']['password'], function (err, doesMatch) {
								if (doesMatch) {
									console.log('success!! issuing token..');
									res.json(genToken(docs[0]['user']['role'], docs[0]['user']['username'], docs[0]['user']['email']));
								} else {
									res.status(401);
									res.json({
										"status" : 401,
										"message": "Invalid credentials"
									});
								}
							});
						}
					}
				} else {
					console.log(err)
				}
			})
		}
		return false;
	}

	/**
	 *
	 * @param item
	 * @param table
	 *
	 * @param res
	 */
	var createUser = function (item, table, res) {
		if (table === 'user') {
			console.log('checking if user exists');
			mongoDBChargePointUser.EV_User.find({"user.email": item[2]}, function (err, docs) {
				if (typeof docs[0] === 'undefined') {
					console.log('Account does not exist');
					console.log('insertion starts....');
					bcrypt.hash(item[1], saltRounds, function (err, bcryptedPassword) {
						var usernameWithHashedPassword = {
							"user": {
								"username": item[0],
								"password": bcryptedPassword,
								"email"   : item[2],
								"role"    : item[3]
							}
						};
						console.log('insert action....')
						mongoDBChargePointUser.EV_User.insert(usernameWithHashedPassword, function (err, docs) {
							if (err === null) {
								console.log('insert done!!');
								res.status(200);
								res.json({
									"status" : 200,
									"message": "Account created successfully"
								});
							} else {
								res.status(500);
								res.json({
									"status" : 500,
									"message": "Internal Server Error"
								});
							}
						})
					});
				} else {
					res.status(401);
					res.json({
						"status" : 401,
						"message": "A user with that email address already exists"
					});
				}
			})
		}
	}

	/**
	 * checks the role. By default, all users will be assigned a free tier role. The three roles are Admin, paid and free
	 * This protects certain api's based on roles (req.url.indexOf('/api/v1/<non secured>')) Any url that does not match this pattern will be reviewed based on its role.
	 * Payments can be applied here
	 * @param item
	 * @param req
	 * @param res
	 * @param next
	 */
	var getUserRole = function (item, req, res, next) {
		mongoDBChargePointUser.EV_User.find({"user.username": item[0]}, function (err, docs) {
			if (err === null) {
				if (typeof docs[0] === 'undefined') {
					res.status(401);
					res.json({
						"status" : 401,
						"message": "Invalid User"
					});
				} else {
					if ((req.url.indexOf('admin') >= 0 && docs[0]['user']['role'] === 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
						console.log('user is authorized to access the resource' + req.url);
						next();
					} else {
						res.status(403);
						res.json({
							"status" : 403,
							"message": "Not authorized"
						});
					}
				}
			} else {
				console.log(err)
			}
		})
	}

	var deleteUser = function (item, table, res) {
		mongoDBChargePointUser.EV_User.find({"user.email": item[2], "user.username": item[0]}, function (err, docs) {
			if (typeof docs[0] === 'undefined') {
				res.status(403);
				res.json({
					"status" : 403,
					"message": "Not authorized to perform this action"
				});
			} else {
				bcrypt.compare(item[1], docs[0]['user']['password'], function (err, doesMatch) {
					if (doesMatch) {
						console.log('user owns this account... starting the delete user process');
						mongoDBChargePointUser.EV_User.remove({"user.email": docs[0]['user']['email']}, function (err, docs) {
							if (err === null) {
								res.status(200);
								res.json({
									"status" : 200,
									"message": "Account removed successfully"
								});
							} else {
								res.status(500);
								res.json({
									"status" : 500,
									"message": "Internal Server Error"
								});
							}
						})
					} else {
						res.status(403);
						res.json({
							"status" : 403,
							"message": "Not authorized to perform this action"
						});
					}

				})
			}
		})
	}

	//modify to use for a test account
	var modifyUser = function (item, table, res) {
		mongoDBChargePointUser.EV_User.find({"user.email": item[1], "user.username": item[0]}, function (err, docs) {
			if (typeof docs[0] === 'undefined') {
				res.status(403);
				res.json({
					"status" : 403,
					"message": "Not authorized to perform this action"
				});
			} else {
				mongoDBChargePointUser.EV_User.update({"user.email": item[1]},
					{
						$set: {
							"user.firstname"  : item[2],
							"user.lastname"   : item[3],
							"user.address"    : item[4],
							"user.dateOfBirth": item[5],
							"user.carModel"   : item[6],
							"user.thumbnail"  : item[7],
							"user.gender"     : item[8]
						}
					}, {
						upsert: false,
						multi : false
					}, function (err, doc) {
						if (err) {
							res.status(500);
							res.json({
								"status" : 500,
								"message": "Internal Server Error"
							});
						} else {
							res.status(200);
							res.json({
								"status" : 200,
								"message": "Update successful"
							});
						}

					})
			}
		})
	}
	var getUser = function (item, table, res) {
		mongoDBChargePointUser.EV_User.find({"user.email": item[1], "user.username": item[0]}, function (err, docs) {
			if (typeof docs[0] === 'undefined') {
				res.status(422);
				res.json({
					"status" : 422,
					"message": "No user information returned"
				});
			} else {
				res.status(200);
				res.json({
					"status"         : 200,
					"message"        : "User information successfully retrieved",
					"userInformation": {
						username   : docs[0]['user']['username'],
						email      : docs[0]['user']['email'],
						firstname  : docs[0]['user']['firstname'],
						lastname   : docs[0]['user']['lastname'],
						role       : docs[0]['user']['role'],
						address    : docs[0]['user']['address'],
						gender     : docs[0]['user']['gender'],
						dateOfBirth: docs[0]['user']['dateOfBirth'],
						carModel   : docs[0]['user']['carModel'],
						thumbnail  : docs[0]['user']['thumbnail']
					}
				});
			}
		});
	}

	var addCaptain = function (item, table, req, res) {
		if (table === 'captain') {
			console.log('checking if user exists');
			mongoDBBTWCaptain.BTW_Captain.find({"captain.email": item[2]}, function (err, docs) {
				if (typeof docs[0] === 'undefined') {
					console.log('Account does not exist');
					console.log('insertion starts....');
						console.log('insert action....');

					var captain = {
						"captain": {
							"firstname": item[0],
							"lastname": item[1],
							"email"   : item[2]
						}
					};

					mongoDBBTWCaptain.BTW_Captain.insert(captain, function (err, docs) {
							if (err === null) {
								console.log('insert done!!');
								res.status(200);
								res.json({
									"status" : 200,
									"message": "Account created successfully"
								});
							} else {
								res.status(500);
								res.json({
									"status" : 500,
									"message": "Internal Server Error"
								});
							}
						})
				} else {
					res.status(401);
					res.json({
						"status" : 401,
						"message": "A user with that email address already exists"
					});
				}
			})
		}
	}



	return {
		createAccount   : function (item, table, res) {
			console.log('***** USERDAO createAccount processing.....');
			createUser(item, table, res)
		},
		authenticateUser: function (item, table, req, res) {
			console.log('***** USERDAO authenticate processing ...');
			validateUser(item, table, req, res)
		},
		getRole         : function (item, req, res, next) {
			console.log('***** USERDAO getRole processing...');
			getUserRole(item, req, res, next)
		},
		deleteAccount   : function (item, table, res) {
			console.log('***** USERDAO deleteAccount.....');
			deleteUser(item, table, res)
		},
		modifyUser      : function (item, table, res) {
			console.log('***** USERDAO modifyUser processing .....');
			modifyUser(item, table, res)
		},
		getUser         : function (item, table, res) {
			console.log('***** USERDAO getUser processing .....');
			getUser(item, table, res)
		},
		addCaptain        : function (item, table, req, res) {
			console.log('***** ADD CAPTAIN processing .....');
			addCaptain(item, table, req, res)
		}

	}
}