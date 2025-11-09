const express = require('express');
const postRoutes = require('./server/routes/postRoutes');
require('dotenv').config();

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===

// 1. Parse incoming JSON request bodies
app.use(express.json());

// === Mount the Router ===
// All routes defined in postRoutes will be prefixed with /posts
app.use('/posts', postRoutes);

// === Error Handling Middleware ===

// 1. 404 Not Found Handler
// This will catch any request that doesn't match the routes above
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// 2. Generic Error Handler (500)
// This will catch any errors passed by next(err)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ error: 'Internal Server Error' });
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});