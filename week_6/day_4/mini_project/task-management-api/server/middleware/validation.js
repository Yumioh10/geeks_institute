const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  // Validation errors array
  const errors = [];

  // Validate title
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  } else if (typeof title !== 'string') {
    errors.push('Title must be a string');
  } else if (title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

  // Validate description (optional but must be string if provided)
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
  }

  // Validate status (optional but must be valid value if provided)
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status !== undefined) {
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  // If there are validation errors, return them
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
  const { title, description, status } = req.body;

  // For updates, at least one field must be provided
  if (!title && !description && status === undefined) {
    return res.status(400).json({
      success: false,
      message: 'At least one field (title, description, or status) must be provided'
    });
  }

  const errors = [];

  // Validate title if provided
  if (title !== undefined) {
    if (title.trim() === '') {
      errors.push('Title cannot be empty');
    } else if (typeof title !== 'string') {
      errors.push('Title must be a string');
    } else if (title.length < 3) {
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
  if (status !== undefined) {
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
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
  const taskId = parseInt(id);

  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID. ID must be a positive number'
    });
  }

  // Attach parsed ID to request
  req.taskId = taskId;
  next();
};

module.exports = { validateTask, validateTaskUpdate, validateId };
