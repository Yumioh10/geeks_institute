import { Project } from '#@/modules/project/model/index.js';

// Create new project
export const createProject = async (projectData, userId) => {
  const project = await Project.create({
    ...projectData,
    owner: userId
  });

  // Populate in a single query
  const populatedProject = await Project.findById(project._id)
    .populate('owner', 'name email')
    .populate('team', 'name email');

  return populatedProject;
};

// Get all projects (with role-based filtering)
export const getAllProjects = async (userId, userRole, filters = {}) => {
  const query = {};

  // Members can only see their own projects
  if (userRole !== 'admin') {
    query.$or = [
      { owner: userId },
      { team: userId }
    ];
  }

  // Apply filters
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.client) query.client = new RegExp(filters.client, 'i');
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  const projects = await Project.find(query)
    .populate('owner', 'name email')
    .populate('team', 'name email')
    .sort({ createdAt: -1 });

  return projects;
};

// Get project by ID
export const getProjectById = async (projectId, userId, userRole) => {
  const project = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('team', 'name email');

  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  // Check if user has access
  if (userRole !== 'admin') {
    const isOwner = project.owner._id.toString() === userId;
    const isTeamMember = project.team.some(member => member._id.toString() === userId);
    
    if (!isOwner && !isTeamMember) {
      const error = new Error('Access denied to this project');
      error.status = 403;
      throw error;
    }
  }

  return project;
};

// Update project
export const updateProject = async (projectId, updates, userId, userRole) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  // Check permissions
  if (userRole !== 'admin' && project.owner.toString() !== userId) {
    const error = new Error('Only the project owner or admin can update this project');
    error.status = 403;
    throw error;
  }

  // Update project
  Object.assign(project, updates);
  await project.save();

  // Re-fetch with populated fields
  const updatedProject = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('team', 'name email');

  return updatedProject;
};

// Delete project
export const deleteProject = async (projectId, userId, userRole) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  // Check permissions
  if (userRole !== 'admin' && project.owner.toString() !== userId) {
    const error = new Error('Only the project owner or admin can delete this project');
    error.status = 403;
    throw error;
  }

  await Project.findByIdAndDelete(projectId);
  return project;
};

// Add team member to project
export const addTeamMember = async (projectId, memberId, userId, userRole) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  // Check permissions
  if (userRole !== 'admin' && project.owner.toString() !== userId) {
    const error = new Error('Only the project owner or admin can add team members');
    error.status = 403;
    throw error;
  }

  // Check if member already exists
  if (project.team.includes(memberId)) {
    const error = new Error('User is already a team member');
    error.status = 400;
    throw error;
  }

  project.team.push(memberId);
  await project.save();

  // Re-fetch with populated fields
  const updatedProject = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('team', 'name email');

  return updatedProject;
};

// Remove team member from project
export const removeTeamMember = async (projectId, memberId, userId, userRole) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  // Check permissions
  if (userRole !== 'admin' && project.owner.toString() !== userId) {
    const error = new Error('Only the project owner or admin can remove team members');
    error.status = 403;
    throw error;
  }

  project.team = project.team.filter(id => id.toString() !== memberId);
  await project.save();

  // Re-fetch with populated fields
  const updatedProject = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('team', 'name email');

  return updatedProject;
};