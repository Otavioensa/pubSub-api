'use strict';

const Service = require('./service');

const subscribe = (request, reply) => {

  const content = request.payload;

  return Service.subscribe(content)
    .then((result) => reply({}))
    .catch((error) => reply(error));
};

const publish = (request, reply) => {

  const subject = request.payload.subject;
  const content = request.payload.content;

  return Service.publish(subject, content)
    .then((result) => reply(result))
    .catch((error) => reply(error));
};

module.exports = {
  subscribe: subscribe,
  publish: publish
};
