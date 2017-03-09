const path = require('path');
const config = require('./config');

module.exports = {
  test: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'sql',
      database: 'products_test',
      host: config.default.env.db.host,
    },
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/test'),
    },
  },
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'sql',
      database: 'products_test',
      host: config.default.env.db.host,
    },
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/development'),
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE,
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/production'),
    },
  },
};
