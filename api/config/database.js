module.exports = {
  development: {
    username: null,
    password: null,
    database: 'maindb',  
    dialect: "sqlite",
    logging: null,
    storage: './test.sqlite',
  },
  test: {
    username: null,
    password: null,
    database: 'maindb',  
    dialect: "sqlite",
    logging: null,
    storage: './test.sqlite',
  },
  production: process.env.DATABASE_URL
};
