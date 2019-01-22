'use strict';

const request = require('superagent');

const { address, path, key } = require('config').weatherSvc; 

//
//
//

class OpenWeather {

	constructor() {

		this._address = address
		this._path = path
		this._key = key

	}

	byCityName(cityName, cb) {

		request
			.get(`${this._address}${this._path}`)
			.query({ q: cityName, appid: this._key })
			.end((err, res) => {
				if (err) {
					return cb(err)
				} 

				cb(null, res.body);
			});

	}
}

//
// we wrap the client in a factory
// and execute the function immedialty
// when require the file for the first time
//

module.exports = (function factory () {
	return new OpenWeather();
})();	
