/**
 * Created by KennethObikwelu on 12/12/17.
 */


var expect = require('chai').expect;
var superTest = require('supertest');
var host = superTest('https://staging-evpoint.herokuapp.com');

describe('add Captain based tests  ----- ', function () {

	it('successful add captain - expect a 200 response', function (done) {
		host.post('/user/addCaptain')
			.set('Content-Type', 'application/json')
			.set('Origin', 'http://ev-client.herokuapp.com')
			.send({
				"firstname": "test first name",
				"lastname": "test Last Name",
				"email": "test@test.com"
			})
			.expect(401)
			.end(function (err, res) {
				expect(res.body.message).to.equal('A user with that email address already exists');
				expect(res.body.message).to.not.equal('null');
				done();
			})
	})
})
