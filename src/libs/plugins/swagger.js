'use strict';

const Swagger = require('hapi-swaggered');

module.exports = {
  register: Swagger,
  options: {
    tags: [
      {
        name: 'api',
        description: 'API Endpoints'
      },
      {
        name: 'endpoints',
        description: 'API Endpoints'
      }
    ],
    tagging: {
      mode: 'tags'
    },
    info: {
      title: 'PubSub-Api',
      description: '',
      version: '1.0'
    }
  }
};
