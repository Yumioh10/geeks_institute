// server/config/db.js
const knex = require('knex');

// Update with your database connection details
const db = knex({
  client: 'pg', // 'pg' for PostgreSQL, 'mysql' for MySQL, etc.
  connection: {
    host: 'localhost',
    user: 'user_auth_db',
    database: 'user_auth_db'
  }
});

module.exports = db;