/**
 * Created by KennethObikwelu on 9/12/17.
 */


var expect = require('chai').expect;
var superTest = require('supertest');
var host = superTest('https://staging-evpoint.herokuapp.com');


describe('Login based tests  ----- ', function () {

	it('successful login - expect a 200 response', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username": "kobikwelu",
				"password": "Aa5233713!"
			})
			.expect(200)
			.end(function (err, res) {
				expect(res.body).to.have.property('token');
				expect(res.body).to.have.property('expires');
				expect(res.body.token).to.not.equal('null');
				expect(res.body.expires).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - username value is missing', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username": "",
				"password": "Aa5233713!"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - password value is missing', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username": "kobikwelu",
				"password": ""
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - wrong username _ password combination', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username": "wrongUser",
				"password": "wrongUser"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - missing username attribute', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"password": "Aa5233713!"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - missing password attribute', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username": "kobikwelu"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed login - expect a 401 response - missing both attributes', function (done) {
		host.post('/user/login')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Invalid credentials');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})
})



