// enables ES6 support
require('babel-core/register');
require('babel-polyfill');

const knex = require('../db/knex');

knex.migrate.latest()
  .then(() => {
    console.log('Migrations --> OK') // eslint-disable-line
    return knex.seed.run()
      .then(() => {
        console.log('Seed --> OK'); // eslint-disable-line
      });
  });

require(process.env.NODE_ENV === 'production' ? '../lib' : '../src/app').start(require('../config').default);
