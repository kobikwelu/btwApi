/**
 * Created by KennethObikwelu on 9/15/17.
 */

var expect = require('chai').expect;
var superTest = require('supertest');
var localHost = superTest('http://localhost:4252');

describe('ChargePointMetaData based tests  ----- ', function () {

	it('/api/v1/getAllChargingPointsMetaData - successful retrieval - expect a 200 response', function (done) {
		localHost.post('/user/login')
			.set('Content-Type', 'application/json')
			.send({
				"username": "kobikwelu",
				"password": "Aa5233713!"
			})
			.end(function (err, res) {
				localHost.get('/api/v1/getAllChargingPointsMetaData')
					.set('Content-Type', 'application/json')
					.set('x-access-token', res.body.token)
					.set('x-key', 'kobikwelu')
					.end(function (err, res) {
						expect(res.status).to.equal(200);
						expect(res.body).to.not.equal('null');
						expect(res.body.total_results).to.not.equal('null');
						expect(res.body.fuels).to.not.equal('null');
						done();
					})
			})
	})
})