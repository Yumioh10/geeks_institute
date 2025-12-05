import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProject
} from '#@/modules/task/index.js';
import { auth } from '#@/middlewares/auth.js';
import { asyncHandler } from '#@/middlewares/asyncHandler.js';

const router = Router();

// All routes require authentication
router.use(auth);

// Create new task
router.post('/', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  // Validate required fields
  if (!req.body.title) {
    return res.status(400).json({
      success: false,
      message: 'Task title is required'
    });
  }

  if (!req.body.project) {
    return res.status(400).json({
      success: false,
      message: 'Project ID is required'
    });
  }

  const task = await createTask(req.body, req.user.id, req.user.role);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
}));

// Get all tasks
router.get('/', asyncHandler(async (req, res) => {
  const filters = {
    project: req.query.project,
    status: req.query.status,
    priority: req.query.priority,
    assignedTo: req.query.assignedTo,
    search: req.query.search
  };

  const tasks = await getAllTasks(req.user.id, req.user.role, filters);

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
}));

// Get tasks by project
router.get('/project/:projectId', asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status,
    priority: req.query.priority,
    assignedTo: req.query.assignedTo
  };

  const tasks = await getTasksByProject(
    req.params.projectId,
    req.user.id,
    req.user.role,
    filters
  );

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
}));

// Get task by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user.id, req.user.role);

  res.status(200).json({
    success: true,
    data: task
  });
}));

// Update task
router.put('/:id', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  const task = await updateTask(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task
  });
}));

// Delete task
router.delete('/:id', asyncHandler(async (req, res) => {
  await deleteTask(req.params.id, req.user.id, req.user.role);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
}));

export default router;