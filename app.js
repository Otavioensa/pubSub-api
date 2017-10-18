'use strict';

const Server = require('./src/server');
const Database = require('./src/db');
const stopTimeout = 10 * 1000; // 10 seconds timeout

const finishGracefully = () => {

  Server.get().root.stop({ timeout: stopTimeout }, (err) => {

    return Database.disconnect()
      .then(() => process.exit(err ? 1 : 0));
  });
};

process.on('SIGINT', finishGracefully);

return Database.connect()
  .then(() => Server.start())
  .then(() => console.log('Server is on'))
  .catch((err) => {

    console.error(`${COLOR_RED}Fatal exception on startup!`);
    console.error(`${COLOR_RED}${err}`);

    process.exit(-1);
  });
