const Book = require('../models/bookModel');

// 8. GET /api/books (Read All)
const handleGetAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// 9. GET /api/books/:bookId (Read One)
const handleGetBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    // Use parseInt to ensure the ID is a number before querying the database
    const book = await Book.findById(parseInt(bookId));
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // Status 200 (OK) is the default, but we send it explicitly
    res.status(200).json(book); 
  } catch (err) {
    next(err);
  }
};

// 10. POST /api/books (Create)
const handleCreateBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body;
    
    // Basic input validation
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required fields.' });
    }
    
    const newBook = await Book.create(title, author, publishedYear);
    res.status(201).json(newBook); // 201 Created
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGetAllBooks,
  handleGetBookById,
  handleCreateBook,
};