'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Plugins = require('./libs/plugins');
const Routes = require('./resource/routes');

const server = new Hapi.Server();

server.connection({
  host: Config.server.host,
  port: Config.server.port
});

server.register(Plugins);

const start = () => {
  return server.start(() => console.log('Server running at: ' + server.info.uri));
};

Routes.getRoutes().forEach((route) => server.route(route));

const stop = (reason) =>  server.stop();

const get = () => server;

module.exports = {
    start: start,
    stop: stop,
    get: get
};
