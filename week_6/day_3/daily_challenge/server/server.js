// server/server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the user routes
// All routes defined in userRoutes.js will be prefixed with /api
app.use('/api', userRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('User Management API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});