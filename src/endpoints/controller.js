'use strict';

const Service = require('./service');

const subscribe = (request, reply) => {

  const payload = request.payload;

  return Service.subscribe(payload)
    .then((result) => reply(result));
};

module.exports = {
  subscribe: subscribe
};
