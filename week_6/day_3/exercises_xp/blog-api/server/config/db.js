const { configDotenv } = require('dotenv');
const { Pool } = require('pg');

// !! IMPORTANT !!
// You can also use environment variables for better security
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export a single query function
module.exports = {
  query: (text, params) => pool.query(text, params),
};