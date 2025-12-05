import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTeamMember,
  removeTeamMember
} from '#@/modules/project/index.js';
import { auth } from '#@/middlewares/auth.js';
import { asyncHandler } from '#@/middlewares/asyncHandler.js';

const router = Router();

// All routes require authentication
router.use(auth);

// Create new project
router.post('/', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  const project = await createProject(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project
  });
}));

// Get all projects
router.get('/', asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status,
    priority: req.query.priority,
    client: req.query.client,
    search: req.query.search
  };

  const projects = await getAllProjects(req.user.id, req.user.role, filters);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
}));

// Get project by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id, req.user.id, req.user.role);

  res.status(200).json({
    success: true,
    data: project
  });
}));

// Update project
router.put('/:id', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  const project = await updateProject(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: project
  });
}));

// Delete project
router.delete('/:id', asyncHandler(async (req, res) => {
  await deleteProject(req.params.id, req.user.id, req.user.role);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
}));

// Add team member to project
router.post('/:id/team', asyncHandler(async (req, res) => {
  const { memberId } = req.body;

  if (!memberId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide memberId'
    });
  }

  const project = await addTeamMember(
    req.params.id,
    memberId,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: 'Team member added successfully',
    data: project
  });
}));

// Remove team member from project
router.delete('/:id/team/:memberId', asyncHandler(async (req, res) => {
  const project = await removeTeamMember(
    req.params.id,
    req.params.memberId,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: 'Team member removed successfully',
    data: project
  });
}));

export default router;