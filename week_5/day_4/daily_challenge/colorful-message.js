/**
 * Task 2: Uses the installed 'chalk' package to display a colorful message.
 * The function is exported using CommonJS module system.
 */
const chalk = require('chalk');

function displayColorfulMessage() {
    const message = chalk.bold.blue('Hello World!');
    console.log('--- Task 2 Output ---');
    console.log(message);
}

module.exports = { displayColorfulMessage };
