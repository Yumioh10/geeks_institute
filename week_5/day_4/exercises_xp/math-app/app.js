
// Require the lodash package (installed via npm)
const _ = require('lodash');

// Require the custom math module (local file)
const math = require('./math'); 

console.log("--- Math App Demo ---");

// 1. Use the custom math module

const num1 = 15;
const num2 = 7;

const sum = math.add(num1, num2);
console.log(`Addition (${num1} + ${num2}): ${sum}`); // Expected: 22

const product = math.multiply(num1, num2);
console.log(`Multiplication (${num1} * ${num2}): ${product}`); // Expected: 105

// 2. Use the lodash package (demonstrating a utility function)

const numbers = [10, 5, 20, 8, 12];
console.log(`\nOriginal Array: [${numbers.join(', ')}]`);

// Use lodash's 'sortBy' function
const sortedNumbers = _.sortBy(numbers);
console.log(`Sorted Array (using lodash): [${sortedNumbers.join(', ')}]`); // Expected: [5, 8, 10, 12, 20]

// Use lodash to find the sum of the array
const sumOfArray = _.sum(numbers);
console.log(`Sum of Array (using lodash): ${sumOfArray}`); // Expected: 55

// Combining modules: Use lodash's 'mean' function on a new array created with the math module results
const combinedArray = [sum, product];
const average = _.mean(combinedArray);
console.log(`\nResults Array: [${combinedArray.join(', ')}]`);
console.log(`Average of results (using lodash): ${average}`); // Expected: (22 + 105) / 2 = 63.5

