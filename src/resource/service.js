'use strict';

const Amqp = require('amqplib');
const Promise = require('bluebird');
const Config = require('../config');
const Repository = require('./repository').SubscribeModel;
const address = Config.rabbit.address;
const exchange = Config.rabbit.exchange;
const assertExchangeOptions = { durable: false };

const publishMessageToConsumer = (subject, content) => {

  return Amqp.connect(address)
    .then((connection) => connection.createChannel())
    .then((channel) => {

      return channel.assertExchange(exchange, 'fanout', assertExchangeOptions)
        .then(() => {

          channel.publish(exchange, subject, new Buffer(JSON.stringify(content)))
          return channel.close();
        })
    })
    .catch((e) => console.log(e));
};

const subscribe = (content) => {

  const newSubscribers = Config.rabbit.newSubscribersQueue;

  return Promise.all([
    publishMessageToConsumer(newSubscribers, content),
    Repository.updateSubscribes(content)
  ])

};

const publish = (subject, content) =>  publishMessageToConsumer(subject, content);

module.exports = {
  subscribe: subscribe,
  publish: publish
};
