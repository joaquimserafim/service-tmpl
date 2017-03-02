'use strict';

const pkg = require('package.json');

module.exports = {
  api: {
    name: pkg.name,
    version: pkg.version,
  },
  service: {
    port: process.env.HTTP_PORT || 4000,
    log: {
      level: process.env.LOG_LEVEL || 'DEBUG',
      stream: []
    }
  },
};
