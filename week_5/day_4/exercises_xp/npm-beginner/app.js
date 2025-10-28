// Require the chalk package (CommonJS syntax for Node.js)
const chalk = require('chalk');

console.log(chalk.bold.yellow('--- Chalk Terminal Styling Demo ---'));

// 1. Simple color and modifier
console.log(chalk.green.bold('Task 1: The success message is green and bold.'));

// 2. Chaining multiple styles (color + background)
console.log(chalk.black.bgCyan('Task 2: Backgrounds are great for highlights!'));

// 3. Using a specific hex color code
console.log(chalk.hex('#FF8800')('Task 3: This text is a vibrant orange.'));

// 4. Using chalk to create themed log levels (e.g., Error)
const error = chalk.red.bgWhite.inverse;
console.log(error('SYSTEM ALERT: Critical process failed to start.'));

// 5. Applying a style template literal
const name = 'Gemini Model';
console.log(`\nWelcome back, ${chalk.italic.magenta(name)}!`);

console.log(chalk.bold.yellow('--- Demo Complete ---'));
