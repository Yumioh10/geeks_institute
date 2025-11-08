const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import the router module
const todoRoutes = require('./routes/todos');

// === Middleware ===
// This line is crucial! It parses incoming JSON request bodies
// and makes them available on `req.body`.
app.use(express.json());

// === Mount the Router ===
// All routes defined in `todoRoutes` will be prefixed with /todos
app.use('/todos', todoRoutes);

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});