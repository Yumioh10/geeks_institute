const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Part I - GET request to /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

// Part II - POST request to /api/world
app.post('/api/world', (req, res) => {
  const { message } = req.body;
  
  // Console log the request body
  console.log('Request body:', req.body);
  
  // Send response with the received message
  res.json({ 
    message: `I received your POST request. This is what you sent me: ${message}` 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});