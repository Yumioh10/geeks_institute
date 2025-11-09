const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

// GET /api/books - Read All
router.get('/', controller.handleGetAllBooks);

// GET /api/books/:bookId - Read One
router.get('/:bookId', controller.handleGetBookById);

// POST /api/books - Create
router.post('/', controller.handleCreateBook);

module.exports = router;