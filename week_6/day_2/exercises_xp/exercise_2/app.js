// Step 3: Create Your Express Application
const express = require('express');
const app = express();
const port = 3000;

// NEW: Middleware to parse incoming JSON request bodies. 
// This is essential for handling POST and PUT data.
app.use(express.json());

// Step 5: Mount the Router in Your Application
// Import the new router module for to-dos
const todosRouter = require('./routes/todos');

// Mount the router at the base path '/todos'.
// All routes inside todosRouter will now be prefixed with /todos
app.use('/todos', todosRouter);


// Optional: Add a simple root route for status check
app.get('/', (req, res) => {
    res.send('<h1>To-Do List API Status</h1><p>API is running. Access endpoints via /todos</p>');
});

// General 404 handler
app.use((req, res) => {
    res.status(404).send('404 - API Endpoint Not Found');
});

// Step 6: Start Your Server
app.listen(port, () => {
    console.log(`Express API running at http://localhost:${port}`);
    console.log('GET   /todos');
    console.log('POST  /todos  (Body: {"task": "New task"})');
    console.log('PUT   /todos/1 (Body: {"completed": true})');
    console.log('DELETE /todos/1');
});