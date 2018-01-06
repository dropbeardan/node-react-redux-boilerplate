const dbAuth = require('./auth/dbAuth.js');

const config = {
  username: dbAuth.username,
  password: dbAuth.password,
  database: dbAuth.database,
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 20,
    idle: 10000
  },
  logging: false
};

module.exports = config;