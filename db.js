const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '8792',
  host: 'localhost',
  port: 5432,
  database: 'twitter'
});

module.exports = pool;