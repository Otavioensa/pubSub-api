'use strict';

const Joi = require('joi');
const Controller = require('./controller');

const subscribe = {
  method: 'POST',
  path: '/subscribe',
  handler: (request, reply) => Controller.subscribe(request, reply),
  config: {
    tags: ['api', 'endpoints'],
    description: 'Publish a message into an exchange',
    notes: 'Publish a message into an exchange',
    validate: {
      payload: {
        subject: Joi.string().required(),
        endpoint: Joi.string().required()
      }
    }
  }
};


module.exports.getRoutes = ()=> [subscribe];
