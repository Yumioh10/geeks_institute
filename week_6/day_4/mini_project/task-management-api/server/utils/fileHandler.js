const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

class FileHandler {
  // Read tasks from JSON file
  static async readTasks() {
    try {
      const data = await fs.readFile(TASKS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, create it with empty array
        await this.writeTasks([]);
        return [];
      }
      throw new Error(`Error reading tasks file: ${error.message}`);
    }
  }

  // Write tasks to JSON file
  static async writeTasks(tasks) {
    try {
      await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
      throw new Error(`Error writing tasks file: ${error.message}`);
    }
  }

  // Find task by ID
  static async findTaskById(id) {
    const tasks = await this.readTasks();
    return tasks.find(task => task.id === id);
  }

  // Find task index by ID
  static async findTaskIndexById(id) {
    const tasks = await this.readTasks();
    return tasks.findIndex(task => task.id === id);
  }

  // Generate unique ID
  static generateId(tasks) {
    if (tasks.length === 0) return 1;
    const maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
  }
}

module.exports = FileHandler;
