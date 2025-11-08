const express = require('express');
const router = express.Router();

// Sample in-memory "database" for storing books
const books = [];
let nextId = 1; // Simple counter for generating unique IDs

// ------------------------------------
// --- Define CRUD Routes ---
// ------------------------------------

/**
 * GET /books
 * Get all books
 */
router.get('/', (req, res) => {
  res.json(books);
});

/**
 * POST /books
 * Add a new book
 */
router.post('/', (req, res) => {
  const { title, author } = req.body;

  // Basic validation
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: nextId++,
    title: title,
    author: author
  };

  books.push(newBook);
  res.status(201).json(newBook); // 201 Created
});

/**
 * PUT /books/:id
 * Update a book by ID
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find(b => b.id === parseInt(id));

  // Handle "Not Found"
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Update fields if they were provided in the request body
  if (title !== undefined) {
    book.title = title;
  }
  if (author !== undefined) {
    book.author = author;
  }

  res.json(book); // Send back the updated book
});

/**
 * DELETE /books/:id
 * Delete a book by ID
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === parseInt(id));

  // Handle "Not Found"
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Remove the book from the array
  books.splice(bookIndex, 1);

  res.status(204).send(); // 204 No Content (standard for successful delete)
});

// Export the router so it can be used in app.js
module.exports = router;