'use strict';

const express     = require('express');
const compression = require('compression');
const bodyParser  = require('body-parser');
const logger      = require('express-mw-bunyan');
const requestId   = require('express-mw-correlation-id');

const routes  = require('routes.js');
const config  = require('config.js').service;
const log     = require('log.js');

const app = express();

//
// app middlewares
//

app.use(compression());
app.use(bodyParser.json());
app.use(requestId());
app.use(logger(log));

//
// service routes
//

app.use('/', routes);

const server = app.listen(config.port, onStart);

server.on('error', onError);

function onStart() {
  log.info(server.address(), `${config.api.name} is starting`);
}

function onError(err) {
  log.error(err, `${config.api.name} is shutdown`);
}
