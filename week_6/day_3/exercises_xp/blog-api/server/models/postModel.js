const db = require('../config/db');

const getAllPosts = async () => {
  const { rows } = await db.query('SELECT * FROM posts ORDER BY id ASC');
  return rows;
};

const getPostById = async (id) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows[0];
};

const createPost = async (title, content) => {
  const { rows } = await db.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return rows[0];
};

const updatePost = async (id, title, content) => {
  const { rows } = await db.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return rows[0];
};

const deletePost = async (id) => {
  // Use RETURNING * to see which post was deleted
  const { rows } = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return rows[0]; // Returns the deleted post, or undefined if not found
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};