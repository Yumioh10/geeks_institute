// Step 4: Create a Router Module for To-Dos

const express = require('express');
const router = ex
$$press.Router();

// Sample in-memory database for storing to-do items
const todos = [
    { id: 1, task: "Install Express.js", completed: true },
    { id: 2, task: "Define API routes", completed: false }
];
// Simple counter to ensure unique IDs for new tasks
let nextId = id++;

// --- API Endpoints ---

// GET / (Get all to-do items)
router.get('/', (req, res) => {
    // Returns the entire list of todos as JSON
    res.json(todos);
});

// POST / (Add a new to-do item)
router.post('/', (req, res) => {
    const { task } = req.body; // Expects { "task": "..." } in JSON body

    if (!task || task.trim() === "") {
        return res.status(400).json({ error: 'Task content is required.' });
    }

    const newTodo = {
        id: nextId++,
        task: task.trim(),
        completed: false
    };

    todos.push(newTodo);
    // Respond with 201 Created and the new item
    res.status(201).json(newTodo);
});

// PUT /:id (Update a to-do item by ID)
router.put('/:id', (req, res) => {
    // Convert the URL parameter ID to an integer
    const id = parseInt(req.params.id);
    const { task, completed } = req.body; 

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found.' });
    }
    
    // Update fields if they are present in the request body
    if (task !== undefined && task.trim() !== "") {
        todo.task = task.trim();
    }
    if (completed !== undefined) {
        // Ensure completed is a boolean
        todo.completed = !!completed;
    }

    res.json(todo);
});

// DELETE /:id (Delete a to-do item by ID)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'To-do item not found.' });
    }

    // Remove the item from the array
    todos.splice(index, 1);
    
    // Respond with 204 No Content for a successful deletion
    res.status(204).send(); 
});

// Export the router module
module.exports = router;