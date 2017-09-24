'use strict';

const Amqp = require('amqplib');
const Promise = require('bluebird');
const Config = require('../config');
const Repository = require('./repository').SubscribeModel;
const address = Config.rabbit.address;
const assertExchangeOptions = { durable: false };

const publishMessageToConsumer = (exchange, exchangeType, subject, content) => {

  return Amqp.connect(address)
    .then((connection) => connection.createChannel())
    .then((channel) => {

      return channel.assertExchange(exchange, exchangeType, assertExchangeOptions)
        .then(() => {

          channel.publish(exchange, subject, new Buffer(JSON.stringify(content)))
          return channel.close();
        })
    })
    .catch((e) => console.log(e));
};

const subscribe = (content) => {

  const exchange = Config.rabbit.exchange;
  const exchangeType = 'fanout';
  const newSubscribers = Config.rabbit.newSubscribersQueue;

  return Promise.all([
    publishMessageToConsumer(exchange, exchangeType, newSubscribers, content),
    Repository.updateSubscribes(content)
  ])

};

const publish = (subject, content) =>  {

  const exchange = Config.rabbit.consumerExchange;
  const exchangeType = 'topic';

  return publishMessageToConsumer(exchange, exchangeType, subject, content);
};

const subject = () => {

  return Repository.getSubjects()
    .then((result) =>  result.map((res) => res._id));
};

module.exports = {
  subscribe: subscribe,
  publish: publish,
  subject: subject
};
