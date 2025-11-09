const db = require('../config/db');

// Implement the "Read All" operation
const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM books   ORDER BY id ASC'); 
  return rows;
};

// Implement the "Read One" operation
const findById = async (id) => {
  // Use a prepared statement ($1) to prevent SQL injection
  const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [id]);
  return rows[0];
};

// Implement the "Create" operation
const create = async (title, author, publishedYear) => {
  const { rows } = await db.query(
    'INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, publishedYear]
  );
  return rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  // (Update and Delete methods would go here)
};