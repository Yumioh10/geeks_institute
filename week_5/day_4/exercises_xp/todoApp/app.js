/* Exercise 4: Todo List using ES6 module syntax*/ 
// Import the TodoList class using ES6 module syntax
import { TodoList } from './todo.js';

// 1. Create an instance of the TodoList class
const myTodoList = new TodoList();

console.log("--- Starting Todo List Application Demo ---");

// 2. Add a few tasks
myTodoList.addTask("Buy groceries");
myTodoList.addTask("Finish JavaScript exercise");
myTodoList.addTask("Call electrician");
myTodoList.addTask("Plan weekend trip");

// 3. List all tasks (Initial status)
myTodoList.listAllTasks();

// 4. Mark some tasks as complete
myTodoList.markTaskAsComplete("Finish JavaScript exercise");
myTodoList.markTaskAsComplete("Buy groceries");

// Attempt to mark a non-existent task
myTodoList.markTaskAsComplete("Walk the dog"); 

// 5. List all tasks (Updated status)
myTodoList.listAllTasks();
