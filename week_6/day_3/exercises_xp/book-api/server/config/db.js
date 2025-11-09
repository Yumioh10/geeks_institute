const { Pool } = require('pg');

// Create the pool using environment variables loaded via dotenv
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  // Simple function to execute a query
  query: (text, params) => pool.query(text, params),
};