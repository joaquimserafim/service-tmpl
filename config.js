'use strict';

const pkg = require('package.json');

module.exports = {
  api: {
    name: pkg.name,
    version: pkg.version,
  },
  log: {
    level: process.env.LOG_LEVEL || 'DEBUG',
    stream: process.stdout
  },
  service: {
    port: process.env.HTTP_PORT || 4000
  },
};
