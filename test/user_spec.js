/**
 * Created by KennethObikwelu on 10/9/17.
 */


var expect = require('chai').expect;
var superTest = require('supertest');
var localHost = superTest('http://localhost:4252');


describe('user based tests  ----- ', function () {

	it('/api/v1/updateUser - successful update expect 200 response', function (done) {
		localHost.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "testUser",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				localHost.put('/api/v1/modifyUser')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'testUser')
					.send({
						"username"   : "testUser",
						"email"      : "testuser@yahoo.com",
						"address"    : "Springfield Pasadeana",
						"dateOfBirth": "12-oct-1995",
						"carModel"   : "Escalade 2018",
						"thumbnail"  : "blah.jpeg",
						"gender"     : "other"
					})
					.end(function (err, res) {
						expect(res.status).to.equal(200);
						expect(res.body).to.not.equal('null');
						done();
					})
			})
	})

	it('/api/v1/updateUser - failed update - incorrect email', function (done) {
		localHost.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "testUser",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				localHost.put('/api/v1/modifyUser')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'testUser')
					.send({
						"username"   : "testUser",
						"email"      : "bad@email.com",
						"address"    : "Springfield Pasadeana",
						"dateOfBirth": "12-oct-1995",
						"carModel"   : "Escalade 2018",
						"thumbnail"  : "blah.jpeg",
						"gender"     : "other"
					})
					.end(function (err, res) {
						expect(res.status).to.equal(403);
						expect(res.body.message).to.equal('Not authorized to perform this action');
						done();
					})
			})
	})

	it('/api/v1/updateUser - failed update - incorrect username', function (done) {
		localHost.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "testUser",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				localHost.put('/api/v1/modifyUser')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'testUser')
					.send({
						"username"   : "badUser",
						"email"      : "test@test.com",
						"address"    : "Springfield Pasadeana",
						"dateOfBirth": "12-oct-1995",
						"carModel"   : "Escalade 2018",
						"thumbnail"  : "blah.jpeg",
						"gender"     : "other"
					})
					.end(function (err, res) {
						expect(res.status).to.equal(403);
						expect(res.body.message).to.equal('Not authorized to perform this action');
						done();
					})
			})
	})

})