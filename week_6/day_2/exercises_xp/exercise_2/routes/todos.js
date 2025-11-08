const express = require('express');
const router = express.Router();

// Sample in-memory "database"
const todos = [];
let nextId = 1; // Simple counter for generating unique IDs

// ------------------------------------
// --- Define CRUD Routes ---
// ------------------------------------

/**
 * GET /todos
 * Get all to-do items
 */
router.get('/', (req, res) => {
  res.json(todos);
});

/**
 * POST /todos
 * Add a new to-do item
 */
router.post('/', (req, res) => {
  const { task } = req.body;

  // Basic validation
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTodo = {
    id: nextId++,
    task: task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // 201 Created
});

/**
 * PUT /todos/:id
 * Update a to-do item by ID
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  const todo = todos.find(t => t.id === parseInt(id));

  // Handle "Not Found"
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Update fields if they were provided
  if (task !== undefined) {
    todo.task = task;
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});

/**
 * DELETE /todos/:id
 * Delete a to-do item by ID
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === parseInt(id));

  // Handle "Not Found"
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Remove the item from the array
  todos.splice(todoIndex, 1);

  res.status(204).send(); // 204 No Content (successful deletion)
});

// Don't forget to export the router!
module.exports = router;