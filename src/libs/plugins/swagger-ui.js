'use strict';

const SwaggerUi = require('hapi-swaggered-ui');

module.exports = {
  register: SwaggerUi,
  options: {
    title: 'PubSub-Api',
    path: '/docs',
    swaggerOptions: {
      validatorUrl: null
    }
  }
};
