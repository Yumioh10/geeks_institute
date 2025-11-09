const Post = require('../models/postModel');

// GET /posts
const handleGetAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err); // Pass error to the error handler
  }
};

// GET /posts/:id
const handleGetPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.getPostById(id);
    if (!post) {
      // Use return to stop execution
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /posts
const handleCreatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newPost = await Post.createPost(title, content);
    res.status(201).json(newPost); // 201 Created
  } catch (err) {
    next(err);
  }
};

// PUT /posts/:id
const handleUpdatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const updatedPost = await Post.updatePost(id, title, content);
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// DELETE /posts/:id
const handleDeletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.deletePost(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    // Or send a 204 No Content response
    // res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGetAllPosts,
  handleGetPostById,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
};