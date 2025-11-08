// Step 4: Create a Router Module

const express = require('express');
const router = express.Router();

// Define the route for the Homepage (GET /)
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the Homepage!</h1><p>This is the homepage.</p>');
});

// Define the route for the About Us page (GET /about)
router.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is about page</p>');
});

// Export the router module to be used in app.js
module.exports = router;