const Log4js = require('log4js');

module.exports = () => {
  Log4js.configure();

  return Log4js.getLogger();
};
