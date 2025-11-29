const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const { validateTask, validateTaskUpdate, validateId } = require('../middleware/validation');

// GET task statistics
router.get('/tasks/stats', TaskController.getTaskStats);

// GET all tasks
router.get('/tasks', TaskController.getAllTasks);

// GET task by ID
router.get('/tasks/:id', validateId, TaskController.getTaskById);

// POST create new task
router.post('/tasks', validateTask, TaskController.createTask);

// PUT update task
router.put('/tasks/:id', validateId, validateTaskUpdate, TaskController.updateTask);

// DELETE task
router.delete('/tasks/:id', validateId, TaskController.deleteTask);

module.exports = router;

