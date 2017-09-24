'use strict';

const rabbit = {
  address: process.env.rabbbitAddress || 'amqp://localhost',
  newSubscribersQueue: process.env.newSubscribersQueue || 'newSubscribersQueue',
  exchange: process.env.exchange || 'ApplicationExchange',
  consumerExchange: process.env.consumerExchange || 'ConsumerExchange'
};

const db = {
  host: process.env.mongo_host || 'localhost',
  port: process.env.mongo_port || '27017',
  database: process.env.mongo_database || 'develop'
};

const server = {
  host: process.env.app_host || 'localhost',
  port: process.env.app_port || '8000'
};


module.exports = {
  rabbit: rabbit,
  db: db,
  server: server
};
