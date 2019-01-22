'use strict';

const pkg = require('package.json');

module.exports = {
  api: {
    name: pkg.name,
    version: pkg.version,
  },
  log: {
    level: process.env.LOG_LEVEL || 'DEBUG',
    stream:  process.env.LOG_STREAM || process.stdout
  },
  service: {
    port: process.env.HTTP_PORT || 4000
  },
  weatherSvc: {
    address: 'https://samples.openweathermap.org',
    path: '/data/2.5/weather',
    key: 'b6907d289e10d714a6e88b30761fae22'
  }
};
