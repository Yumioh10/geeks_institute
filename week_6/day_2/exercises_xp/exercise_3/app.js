const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import the router module
const bookRoutes = require('./routes/books');

// === Middleware ===
// This middleware is necessary to parse JSON bodies
// from POST, PUT, and PATCH requests.
app.use(express.json());

// === Mount the Router ===
// All routes defined in `bookRoutes` will be prefixed with /books
app.use('/books', bookRoutes);

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});