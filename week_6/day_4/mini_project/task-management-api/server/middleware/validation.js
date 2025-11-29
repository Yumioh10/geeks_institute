const validateTask = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;
  const errors = [];

  // Validate title
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  } else if (typeof title !== 'string') {
    errors.push('Title must be a string');
  } else if (title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

  // Validate description (optional)
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
  }

  // Validate status (optional)
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status !== undefined && !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // Validate priority (optional)
  const validPriorities = ['low', 'medium', 'high'];
  if (priority !== undefined && !validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  // Validate dueDate (optional)
  if (dueDate !== undefined && dueDate !== null) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Due date must be a valid date');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateTaskUpdate = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;

  // For updates, at least one field must be provided
  if (!title && !description && status === undefined && priority === undefined && dueDate === undefined) {
    return res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update'
    });
  }

  const errors = [];

  // Validate title if provided
  if (title !== undefined) {
    if (title.trim() === '') {
      errors.push('Title cannot be empty');
    } else if (typeof title !== 'string') {
      errors.push('Title must be a string');
    } else if (title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    } else if (title.length > 100) {
      errors.push('Title must not exceed 100 characters');
    }
  }

  // Validate description if provided
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
  }

  // Validate status if provided
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status !== undefined && !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // Validate priority if provided
  const validPriorities = ['low', 'medium', 'high'];
  if (priority !== undefined && !validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  // Validate dueDate if provided
  if (dueDate !== undefined && dueDate !== null) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Due date must be a valid date');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  const mongoose = require('mongoose');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID format'
    });
  }

  next();
};

module.exports = { validateTask, validateTaskUpdate, validateId };
