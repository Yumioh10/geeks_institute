// Step 3: Create Your Express Application
const express = require('express');
const app = express();
const port = 3000;

// Step 5: Mount the Router in Your Application
// Import the router module from the ./routes directory
const indexRouter = require('./routes/index');

// Mount the router. All routes defined in indexRouter
// (e.g., '/', '/about') will be prefixed with the path
// provided here. Since we pass '/', the routes remain 
// at the root level (http://localhost:3000/)
app.use('/', indexRouter);


// Optional: Add a general error handler for paths not matched by the router
app.use((req, res) => {
    res.status(404).send('404 - Route Not Found');
});

// Step 6: Start Your Server
app.listen(port, () => {
    console.log(`Express application running at http://localhost:${port}`);
    console.log('Test routes: http://localhost:3000/ and http://localhost:3000/about');
});