const express = require('express');
const Db = require('../../infra/database/Db');
class Server {
  constructor({  router, logger }) {
   
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    
    return new Promise((resolve) => {
      Db.init();
      const http = this.express
        .listen(3000, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
