const express = require('express');
const Db = require('../../infra/database/Db');
class Server {
  constructor({ config,  router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    
    return new Promise((resolve) => {
      Db.init(this.config.db.url);
      const http = this.express
        .listen(this.config.web.port, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
