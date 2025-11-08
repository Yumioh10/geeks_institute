/**
 * Task 2: Uses the installed 'chalk' package to display a colorful message. install 'chalk' using npm install chalk@4.1.2
 */
const chalk = require('chalk');

function displayColorfulMessage() {
    const message = chalk.bold.blue('Hello World!');
    console.log('--- Task 2 Output ---');
    console.log(message);
}

module.exports = { displayColorfulMessage };
