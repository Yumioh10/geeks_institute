const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

// GET /posts: Return a list of all blog posts.
router.get('/', controller.handleGetAllPosts);

// GET /posts/:id: Return a specific blog post based on its id.
router.get('/:id', controller.handleGetPostById);

// POST /posts: Create a new blog post.
router.post('/', controller.handleCreatePost);

// PUT /posts/:id: Update an existing blog post.
router.put('/:id', controller.handleUpdatePost);

// DELETE /posts/:id: Delete a blog post.
router.delete('/:id', controller.handleDeletePost);

module.exports = router;