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



module.exports = function () {

    function genToken() {
        console.log('getToken starts....');
        var expires = expiresIn(0.0098);
        var token = jwt.encode({
            exp: expires
        }, require('../config/secret')());

        return {
            token: token,
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
                            "status": 500,
                            "message": "Internal Server Error"
                        });
                    } else {
                        console.log('decrypting...')
                        if (typeof docs[0] === 'undefined') {
                            res.status(401);
                            res.json({
                                "status": 401,
                                "message": "Invalid credentials"
                            });
                        } else {
                            bcrypt.compare(item[1], docs[0]['user']['password'], function (err, doesMatch) {
                                if (doesMatch) {
                                    console.log('success!! issuing token..');
                                    res.json(genToken());
                                } else {
                                    res.status(401);
                                    res.json({
                                        "status": 401,
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
            console.log ('checking if user exists');
            mongoDBChargePointUser.EV_User.find({"user.email": item[2]}, function (err, docs) {
                if (typeof docs[0] === 'undefined') {
                    console.log('Account does not exist');
                    console.log('insertion starts....');
                    bcrypt.hash(item[1], saltRounds, function (err, bcryptedPassword) {
                        var usernameWithHashedPassword = {
                            "user": {
                                "username": item[0],
                                "password": bcryptedPassword,
                                "email": item[2],
                                "role": item[3]
                            }
                        };
                        console.log('insert action....')
                        mongoDBChargePointUser.EV_User.insert(usernameWithHashedPassword, function (err, docs) {
                            if (err === null) {
                                console.log('insert done!!')
                                res.status(200);
                                res.json({
                                    "status": 200,
                                    "message": "Account created successfully"
                                });
                            } else {
                                res.status(500);
                                res.json({
                                    "status": 500,
                                    "message": "Internal Server Error"
                                });
                            }
                        })
                    });
                } else {
                    res.status(401);
                    res.json({
                        "status": 401,
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
                        if (typeof docs !== 'undefined') {
                            if ((req.url.indexOf('admin') >= 0 && docs[0]['user']['role'] === 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                                console.log('user is authorized to access the resource' + req.url);
                                next();
                            } else {
                                res.status(403);
                                res.json({
                                    "status": 403,
                                    "message": "Not Authorized"
                                });
                            }
                        } else {
                            // No user with this name exists, respond back with a 401
                            res.status(401);
                            res.json({
                                "status": 401,
                                "message": "Invalid User"
                            });
                        }
                    } else {
                        console.log(err)
                    }
                })
            }

            return {
                createAccount: function (item, table, res) {
                    console.log('***** USERDAO createAccount.....');
                    createUser(item, table, res)
                },
                authenticateUser: function (item, table, req, res) {
                    console.log('***** USERDAO authenticate User processing ...');
                    validateUser(item, table, req, res)
                },
                getRole: function (item, req, res, next) {
                    console.log('***** USERDAO getRole processing...');
                    getUserRole(item, req, res, next)
                }
            }
        }