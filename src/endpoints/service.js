'use strict';

const amqp = require('amqplib');
const Config = require('../config');

const subscribe = (payload) => {

  const address = Config.rabbit.address;
  const newSubscribers = Config.rabbit.newSubscribersQueue;
  const exchange = Config.rabbit.exchange;
  const assertExchangeOptions = { durable: false };

  return amqp.connect(address)
    .then((connection) => connection.createChannel())
    .then((channel) => {

      return channel.assertExchange(exchange, 'direct', assertExchangeOptions)
        .then(() => {

          channel.publish(exchange, newSubscribers, new Buffer(JSON.stringify(payload)))
          return channel.close();
        })
    })
    .catch((e) => console.log(e))

};

module.exports = {
  subscribe: subscribe
};
