// Task 1: greet module
const { greet } = require('./greeting.js');
// Task 2: displayColorfulMessage module
const {displayColorfulMessage} = require('./colorful-message.js');
// Task 3: readAndDisplayFileContent module
const {readAndDisplayFileContent} = require ('./files/read-file.js');

// --- Execution ---
// 1. Greet the user
const userName = 'Sarah';
const greetingMessage = greet(userName);
console.log(greetingMessage);

// 2. Display the colorful message
displayColorfulMessage();

// 3. Read and display the file content
readAndDisplayFileContent();
