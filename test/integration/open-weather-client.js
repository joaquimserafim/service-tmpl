'use strict';

const nock = require('nock');
const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');

const { address, path, key } = require('config').weatherSvc;

const mock = require('test/mocks/by-city-name')

const openWeather = require('lib/open-weather-client');

let scope;

//
// in here we test all the possible scenarios
// we can have againts the downstream service
//

describe('GET /cityName', () => {

  before((done) => {
		nock.disableNetConnect();
    done();
  });

  afterEach((done) => {
    expect(scope.isDone()).to.be.equal(true);
    done();
  });

  describe('Error cases', () => {

  	it('should throw a 400 when is a bad request', (done) => {
	    scope = nock(address)
	      .get(path)
	      .query({ q: 'london', appid: key })
	      .reply(400);

	    openWeather
		    	.byCityName('london', (err, payload) => {
		    		expect(err).to.be.an('error');
		    		expect(err.status).to.be.equal(400);
		    		expect(payload).to.be.an('undefined');
		      	done();
		    	});
	  });


	  it('should throw a 401 when sent an invalid API key', (done) => {
	    scope = nock(address)
	      .get(path)
	      .query({ q: 'london', appid: key })
	      .reply(401);

	    openWeather
		    	.byCityName('london', (err, payload) => {
		    		expect(err).to.be.an('error');
		    		expect(err.status).to.be.equal(401);
		    		expect(payload).to.be.an('undefined');
		      	done();
		    	});
	  });

  });

  describe('Success cases', () => {

  	it('should return a 200 when find by city name', (done) => {
	    scope = nock(address)
	      .get(path)
	      .query({ q: 'london', appid: key })
	      .reply(200, mock);

	    openWeather
		    	.byCityName('london', (err, payload) => {
		    		expect(err).to.be.a('null');
		    		expect(payload).to.deep.equal(mock);
		      	done();
		    	});
	  });

  });

});