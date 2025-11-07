// Part 1: Setting up the Express Server
const express = require('express');
// import the fetchPosts function from dataService.js
const { fetchPosts } = require('./data/dataService');

const app = express();
const PORT = 5000;

// middleware to parse JSON bodies
app.use(express.json());

// Part 3: Using the Data Module in the Express App

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
    console.log('Data successfully retrieved and sent as response.');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// set up app to listen on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});