'use strict';

const Joi = require('joi');
const Controller = require('./controller');

const subscribe = {
  method: 'POST',
  path: '/subscribe',
  handler: (request, reply) => Controller.subscribe(request, reply),
  config: {
    tags: ['api', 'endpoints'],
    description: 'Subscribe into a subject',
    notes: 'Subscribe into a subject',
    validate: {
      payload: {
        subject: Joi.string().required(),
        endpoint: Joi.string().required()
      }
    }
  }
};

const publish = {
  method: 'POST',
  path: '/publish',
  handler: (request, reply) => Controller.publish(request, reply),
  config: {
    tags: ['api', 'endpoints'],
    description: 'Publish a message into an exchange',
    notes: 'Publish a message into an exchange',
    validate: {
      payload: {
        subject: Joi.string().required(),
        content: Joi.object().required()
      }
    }
  }
};

module.exports.getRoutes = ()=> [subscribe, publish];
