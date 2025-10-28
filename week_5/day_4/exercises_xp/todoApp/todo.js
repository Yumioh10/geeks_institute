/* Exercise 4: Todo List using ES6 module syntax*/
export class TodoList {
    constructor() {
        this.tasks = []; // Tasks are stored as an array of objects
    }

    /**
     * Adds a new task to the list.
     * @param {string} description - The task description.
     */
    addTask(description) {
      if (!description || typeof description !== 'string' || description.trim() === '') {
         console.log("Error: Task description cannot be empty.");
          return;
      }
      this.tasks.push({
         id: Date.now(), // Use a timestamp for a simple unique ID
         description: description.trim(),
         isComplete: false
      });
      console.log(`Task added: "${description}"`);
   }

    /**
     * Marks a task as complete using its description (for simplicity).
     * In a real app, you'd use an ID.
     * @param {string} description - The description of the task to complete.
     */
    markTaskAsComplete(description) {
      const task = this.tasks.find(t => t.description.toLowerCase() === description.toLowerCase().trim());
      
      if (task) {
         task.isComplete = true;
         console.log(`Task marked complete: "${description}"`);
      } else {
         console.log(`Task not found: "${description}"`);
      }
   }

    /**
     * Prints all tasks to the console, showing their status.
     */
    listAllTasks() {
      console.log('\n--- TO-DO LIST ---');
      if (this.tasks.length === 0) {
         console.log('The list is empty! 🎉');
         return;
      }
      
      this.tasks.forEach((task, index) => {
         const status = task.isComplete ? '✅ COMPLETE' : '⏳ PENDING';
         console.log(`${index + 1}. [${status}] ${task.description}`);
      });
   }
}