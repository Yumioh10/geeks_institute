const FileHandler = require('../utils/fileHandler');

class TaskController {
  // GET /tasks - Get all tasks
  static async getAllTasks(req, res) {
    try {
      const tasks = await FileHandler.readTasks();
      
      // Optional filtering by status
      const { status } = req.query;
      let filteredTasks = tasks;
      
      if (status) {
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (validStatuses.includes(status)) {
          filteredTasks = tasks.filter(task => task.status === status);
        }
      }

      res.status(200).json({
        success: true,
        count: filteredTasks.length,
        data: filteredTasks
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
      const task = await FileHandler.findTaskById(req.taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: `Task with ID ${req.taskId} not found`
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
      const { title, description, status } = req.body;
      const tasks = await FileHandler.readTasks();

      // Create new task object
      const newTask = {
        id: FileHandler.generateId(tasks),
        title: title.trim(),
        description: description ? description.trim() : '',
        status: status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add task to array
      tasks.push(newTask);

      // Save to file
      await FileHandler.writeTasks(tasks);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTask
      });
    } catch (error) {
      console.error('Create task error:', error);
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
      const tasks = await FileHandler.readTasks();
      const taskIndex = await FileHandler.findTaskIndexById(req.taskId);

      if (taskIndex === -1) {
        return res.status(404).json({
          success: false,
          message: `Task with ID ${req.taskId} not found`
        });
      }

      const { title, description, status } = req.body;

      // Update task properties
      if (title !== undefined) {
        tasks[taskIndex].title = title.trim();
      }
      if (description !== undefined) {
        tasks[taskIndex].description = description.trim();
      }
      if (status !== undefined) {
        tasks[taskIndex].status = status;
      }

      // Update timestamp
      tasks[taskIndex].updatedAt = new Date().toISOString();

      // Save to file
      await FileHandler.writeTasks(tasks);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: tasks[taskIndex]
      });
    } catch (error) {
      console.error('Update task error:', error);
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
      const tasks = await FileHandler.readTasks();
      const taskIndex = await FileHandler.findTaskIndexById(req.taskId);

      if (taskIndex === -1) {
        return res.status(404).json({
          success: false,
          message: `Task with ID ${req.taskId} not found`
        });
      }

      // Get deleted task for response
      const deletedTask = tasks[taskIndex];

      // Remove task from array
      tasks.splice(taskIndex, 1);

      // Save to file
      await FileHandler.writeTasks(tasks);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: deletedTask
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
}

module.exports = TaskController;
