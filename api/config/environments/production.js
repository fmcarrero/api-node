module.exports = {
  web: {
    port: process.env.PORT
  },
  db :{
    url : "mongodb://userhotel:sistemas31@ds141671.mlab.com:41671/hoteldb_library"
  },
  logging: {
    appenders: [
      { type: 'console', layout: { type: 'basic' } }
    ]
  }
};
