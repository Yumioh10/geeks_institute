const Task = require('../models/Task');

class TaskController {
  // GET /tasks - Get all tasks
  static async getAllTasks(req, res) {
    try {
      const { status, priority, sortBy = '-createdAt', limit, page = 1 } = req.query;

      // Build query
      const query = {};
      if (status) query.status = status;
      if (priority) query.priority = priority;

      // Build options
      const options = {
        sort: sortBy,
        limit: limit ? parseInt(limit) : 0,
        skip: limit ? (parseInt(page) - 1) * parseInt(limit) : 0
      };

      // Execute query
      const tasks = await Task.find(query)
        .sort(options.sort)
        .limit(options.limit)
        .skip(options.skip);

      // Get total count for pagination
      const total = await Task.countDocuments(query);

      res.status(200).json({
        success: true,
        count: tasks.length,
        total: total,
        page: parseInt(page),
        pages: limit ? Math.ceil(total / parseInt(limit)) : 1,
        data: tasks
      });
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve tasks',
        error: error.message
      });
    }
  }

  // GET /tasks/:id - Get task by ID
  static async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      console.error('Get task by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve task',
        error: error.message
      });
    }
  }

  // POST /tasks - Create new task
  static async createTask(req, res) {
    try {
      const { title, description, status, priority, dueDate } = req.body;

      const task = new Task({
        title: title.trim(),
        description: description ? description.trim() : '',
        status: status || 'pending',
        priority: priority || 'medium',
        dueDate: dueDate || null
      });

      await task.save();

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      console.error('Create task error:', error);

      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error.message
      });
    }
  }

  // PUT /tasks/:id - Update task
  static async updateTask(req, res) {
    try {
      const { title, description, status, priority, dueDate } = req.body;

      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (description !== undefined) updateData.description = description.trim();
      if (status !== undefined) updateData.status = status;
      if (priority !== undefined) updateData.priority = priority;
      if (dueDate !== undefined) updateData.dueDate = dueDate;

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        updateData,
        { 
          new: true, // Return updated document
          runValidators: true // Run schema validators
        }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task
      });
    } catch (error) {
      console.error('Update task error:', error);

      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error.message
      });
    }
  }

  // DELETE /tasks/:id - Delete task
  static async deleteTask(req, res) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: task
      });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error.message
      });
    }
  }

  // GET /tasks/stats - Get task statistics
  static async getTaskStats(req, res) {
    try {
      const stats = await Task.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const total = await Task.countDocuments();
      
      const formattedStats = {
        total: total,
        byStatus: {}
      };

      stats.forEach(stat => {
        formattedStats.byStatus[stat._id] = stat.count;
      });

      res.status(200).json({
        success: true,
        data: formattedStats
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve statistics',
        error: error.message
      });
    }
  }
}

module.exports = TaskController;
