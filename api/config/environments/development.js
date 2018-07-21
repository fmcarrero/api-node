const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 3000
  },
  db :{
    url : "mongodb://userhotel:sistemas31@ds141671.mlab.com:41671/hoteldb_library"
  },
  logging: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: logPath }
    ]
  }
};
