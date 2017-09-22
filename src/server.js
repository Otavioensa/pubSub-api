'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Plugins = require('./libs/plugins');

const server = new Hapi.Server();

server.connection({
  host: Config.server.host,
  port: Config.server.port
});

server.register(Plugins, (err) => {

  if (err) {

    console.log(err);
  }
});

const start = () => {

  return server.start(() => console.log('Server running at: ' + server.info.uri));
};

const stop = (reason) => {

  console.log('server stopping');
  return server.stop();
};

const get = () => server;

module.exports = {
    start: start,
    stop: stop,
    get: get
};
