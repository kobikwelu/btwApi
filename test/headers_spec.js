/**
 * Created by KennethObikwelu on 10/10/17.
 */


var expect = require('chai').expect;
var superTest = require('supertest');
var host = superTest('');


describe('Api header based tests  ----- ', function () {
	it('/api/v1/getAllChargingPoints - failed retrieval - missing required parameter attribute - X-token', function (done) {
		host.get('/api/v1/getAllChargingPoints')
			.set('Content-Type', 'application/json')
			.set('x-access-token', '')
			.set('x-key', 'kobikwelu')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.end(function (err, res) {
				expect(res.status).to.equal(401);
				expect(res.body.message).to.equal('Missing required header parameters - one of these (Token, Key, Origin)');
				done();
			})
	})


	it('failed retrieval - missing required parameter attribute - X-key', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "kobikwelu",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				host.get('/api/v1/getAllChargingPoints')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', '')
					.set('Origin', 'http://ev-client.herokuapp.com')
					.end(function (err, res) {
						expect(res.status).to.equal(401);
						expect(res.body.message).to.equal('Missing required header parameters - one of these (Token, Key, Origin)');
						done();
					})
			})
	})


	it('failed retrieval - expired X-token', function (done) {
		host.get('/api/v1/getAllChargingPoints')
			.set('Content-Type', 'application/json')
			.set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDU1MTgzODc1ODMsInJvbGUiOiJhZG1pbiJ9.4m8lUzRAASYFqKan3iQCyg79CGomCnF1XSyqrUZuskw')
			.set('x-key', 'kobikwelu')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.end(function (err, res) {
				expect(res.status).to.equal(400);
				expect(res.body.message).to.equal('Token Expired. Please generate a new Token');
				done();
			})

	})

	it('failed retrieval - valid X-token, but invalid x-key', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "kobikwelu",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				host.get('/api/v1/getAllChargingPoints')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'wrongKey')
					.set('Origin', 'http://ev-client.herokuapp.com')
					.end(function (err, res) {
						expect(res.status).to.equal(403);
						expect(res.body.message).to.equal('Incorrect token used');
						done();
					})
			})

	})

	it('failed retrieval - using different token for another user', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "kobikwelu",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				host.get('/api/v1/getAllChargingPoints')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'testUser')
					.set('Origin', 'http://ev-client.herokuapp.com')
					.end(function (err, res) {
						expect(res.status).to.equal(403);
						expect(res.body.message).to.equal('Incorrect token used');
						done();
					})
			})

	})

})