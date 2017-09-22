'use strict';

const Swagger = require('./swagger');
const SwaggerUi = require('./swagger-ui');
const Inert = require('inert');
const Vision = require('vision');
const HapiAuth = require('hapi-auth-jwt');

const HapiPlugins = () => {

  return [Inert, Vision, HapiAuth, Swagger, SwaggerUi];
};

module.exports = HapiPlugins();
