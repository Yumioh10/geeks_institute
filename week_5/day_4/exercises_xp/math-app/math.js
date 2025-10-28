
/**
 * Custom module for basic mathematical operations.
 */

// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Export the functions using the CommonJS module pattern
module.exports = {
    add: add,
    multiply: multiply
};