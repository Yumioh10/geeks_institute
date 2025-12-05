import mongoose from 'mongoose';
import { Task } from '#@/modules/task/model/index.js';
import { Project } from '#@/modules/project/model/index.js';

// Helper function to check project access
const checkProjectAccess = async (projectId, userId, userRole) => {
  // Validate ObjectId
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error('Invalid project ID');
    error.status = 400;
    throw error;
  }

  const project = await Project.findById(projectId);
  
  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  if (userRole !== 'admin') {
    const isOwner = project.owner.toString() === userId;
    const isTeamMember = project.team && project.team.some(id => id.toString() === userId);
    
    if (!isOwner && !isTeamMember) {
      const error = new Error('Access denied to this project');
      error.status = 403;
      throw error;
    }
  }

  return project;
};

// Create new task
export const createTask = async (taskData, userId, userRole) => {
  // Validate required fields
  if (!taskData.title) {
    const error = new Error('Task title is required');
    error.status = 400;
    throw error;
  }

  if (!taskData.project) {
    const error = new Error('Project ID is required');
    error.status = 400;
    throw error;
  }

  // Check if user has access to the project
  await checkProjectAccess(taskData.project, userId, userRole);

  // Validate assignedTo if provided
  if (taskData.assignedTo && !mongoose.Types.ObjectId.isValid(taskData.assignedTo)) {
    const error = new Error('Invalid assignedTo user ID');
    error.status = 400;
    throw error;
  }

  const task = await Task.create({
    ...taskData,
    createdBy: userId
  });

  // Populate in a single query
  const populatedTask = await Task.findById(task._id)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  return populatedTask;
};

// Get all tasks (with role-based filtering)
export const getAllTasks = async (userId, userRole, filters = {}) => {
  const query = {};

  // Apply project filter first
  if (filters.project) {
    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(filters.project)) {
      const error = new Error('Invalid project ID');
      error.status = 400;
      throw error;
    }
    query.project = filters.project;
  }

  // For members, filter by projects they have access to
  if (userRole !== 'admin') {
    const projects = await Project.find({
      $or: [
        { owner: userId },
        { team: userId }
      ]
    }).select('_id');

    const projectIds = projects.map(p => p._id);
    
    if (query.project) {
      // Check if the filtered project is accessible
      if (!projectIds.some(id => id.toString() === query.project)) {
        const error = new Error('Access denied to this project');
        error.status = 403;
        throw error;
      }
    } else {
      query.project = { $in: projectIds };
    }
  }

  // Apply other filters
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(filters.assignedTo)) {
      const error = new Error('Invalid assignedTo user ID');
      error.status = 400;
      throw error;
    }
    query.assignedTo = filters.assignedTo;
  }
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  const tasks = await Task.find(query)
    .populate('project', 'name status')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return tasks;
};

// Get task by ID
export const getTaskById = async (taskId, userId, userRole) => {
  // Validate task ID
  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error('Invalid task ID');
    error.status = 400;
    throw error;
  }

  const task = await Task.findById(taskId)
    .populate('project', 'name status owner team')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  // Check if user has access to the project
  if (userRole !== 'admin') {
    const isOwner = task.project.owner.toString() === userId;
    const isTeamMember = task.project.team && task.project.team.some(id => id.toString() === userId);
    
    if (!isOwner && !isTeamMember) {
      const error = new Error('Access denied to this task');
      error.status = 403;
      throw error;
    }
  }

  return task;
};

// Update task
export const updateTask = async (taskId, updates, userId, userRole) => {
  // Validate task ID
  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error('Invalid task ID');
    error.status = 400;
    throw error;
  }

  // Validate assignedTo if being updated
  if (updates.assignedTo && !mongoose.Types.ObjectId.isValid(updates.assignedTo)) {
    const error = new Error('Invalid assignedTo user ID');
    error.status = 400;
    throw error;
  }

  // Validate project if being updated
  if (updates.project && !mongoose.Types.ObjectId.isValid(updates.project)) {
    const error = new Error('Invalid project ID');
    error.status = 400;
    throw error;
  }

  const task = await Task.findById(taskId).populate('project');

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  // Check project access
  await checkProjectAccess(task.project._id, userId, userRole);

  // If project is being changed, check access to new project
  if (updates.project && updates.project !== task.project._id.toString()) {
    await checkProjectAccess(updates.project, userId, userRole);
  }

  // Update task
  Object.assign(task, updates);
  await task.save();

  // Re-fetch with populated fields
  const updatedTask = await Task.findById(taskId)
    .populate('project', 'name status')
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  return updatedTask;
};

// Delete task
export const deleteTask = async (taskId, userId, userRole) => {
  // Validate task ID
  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error('Invalid task ID');
    error.status = 400;
    throw error;
  }

  const task = await Task.findById(taskId).populate('project');

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  // Check project access
  await checkProjectAccess(task.project._id, userId, userRole);

  // Only admin or task creator can delete
  if (userRole !== 'admin' && task.createdBy.toString() !== userId) {
    const error = new Error('Only the task creator or admin can delete this task');
    error.status = 403;
    throw error;
  }

  await Task.findByIdAndDelete(taskId);
  return task;
};

// Get tasks by project
export const getTasksByProject = async (projectId, userId, userRole, filters = {}) => {
  // Check project access
  await checkProjectAccess(projectId, userId, userRole);

  const query = { project: projectId };

  // Apply filters
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(filters.assignedTo)) {
      const error = new Error('Invalid assignedTo user ID');
      error.status = 400;
      throw error;
    }
    query.assignedTo = filters.assignedTo;
  }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return tasks;
};