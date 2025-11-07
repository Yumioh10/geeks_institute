// Import the express module and create an app instance
const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// --- Basic Data Array ---
let books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 },
    { id: 2, title: 'The Algorithm Design Manual', author: 'Steven Skiena', publishedYear: 1997 },
    { id: 3, title: 'Python Crash Course', author: 'Eric Matthes', publishedYear: 2015 }
];

let nextBookId = books.length + 1; // Used to auto-increment the ID for new books

// --- Routes ---
// Read all books
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// Read a single book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.status(200).json(book); // Book found
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = { id: nextBookId++, title, author, publishedYear: parseInt(publishedYear) };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});