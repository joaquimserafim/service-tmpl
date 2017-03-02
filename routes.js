'use strict';

const express   = require('express');
const validate  = require('express-validate-schema');

const services  = require('services');
const schemas   = require('services/schemas');

const router = module.exports = express.Router();

router.get(
  '/featurexpto',
  validate().params(schemas.request),
  validate().response(schemas.response),
  services.serviceXpto
);
