/**
 * Created by KennethObikwelu on 9/12/17.
 */

var expect = require('chai').expect;
var superTest = require('supertest');
var host = superTest('');


describe('Registration based tests  ----- ', function () {


	it('failed registration - email exists with all matching fields', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "kobikwelu",
				"password" : "Aa5233713!",
				"email"	: "kobikwelu@yahoo.com",
				"role" : "admin"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('A user with that email address already exists');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - email exists with non-matching fields', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "newUser",
				"password" : "Aa5233713!",
				"email"	: "kobikwelu@yahoo.com",
				"role" : "admin"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('A user with that email address already exists');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - email (required) attribute value is missing', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "newUser",
				"password" : "Aa5233713!",
				"email"	: "",
				"role" : "admin"
			})
			.expect(422)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Missing required parameters');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - email (required) attribute is missing', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "newUser",
				"password" : "Aa5233713!",
				"role" : "admin"
			})
			.expect(422)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Missing required parameters');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - role (required) attribute is missing', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "newUser",
				"password" : "Aa5233713!",
				"email"	: "kobikwelu@yahoo.com"
			})
			.expect(422)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Missing required parameters');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - username (required) attribute is missing', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"password" : "Aa5233713!",
				"email"	: "kobikwelu@yahoo.com",
				"role" : "admin"
			})
			.expect(422)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Missing required parameters');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})

	it('failed registration - password (required) attribute is missing', function (done) {
		host.post('/user/register')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"username" : "newUser",
				"email"	: "kobikwelu@yahoo.com",
				"role" : "admin"
			})
			.expect(422)
			.end(function (err, res) {
				expect(res.body.message).to.equal('Missing required parameters');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})
})










