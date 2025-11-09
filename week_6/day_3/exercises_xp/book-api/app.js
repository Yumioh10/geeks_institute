// Load environment variables (must be the first line)
require('dotenv').config(); 

const express = require('express');
const bookRoutes = require('./server/routes/bookRoutes');

// 4. Create an instance of the Express app
const app = express();
const PORT = 5000; // 7. Set up the app to listen on port 5000

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the router, prefixed with /api/books
app.use('/api/books', bookRoutes);

// --- Simple Error Handling Middleware (Recommended) ---

// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint Not Found' });
});

// Generic 500 Internal Server Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
});

// 7. Start the Express app and listen on a specified port
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});