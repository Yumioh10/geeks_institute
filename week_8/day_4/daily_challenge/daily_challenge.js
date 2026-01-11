"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleData = handleData;
exports.isUser = isUser;
exports.isProduct = isProduct;
exports.isOrder = isOrder;
// Type guard functions
function isUser(item) {
    return item.type === 'user';
}
function isProduct(item) {
    return item.type === 'product';
}
function isOrder(item) {
    return item.type === 'order';
}
// Main handler function
function handleData(data) {
    return data.map(function (item) {
        // Handle each type with type guards
        if (isUser(item)) {
            return "Hello ".concat(item.name, ", you are ").concat(item.age, " years old.");
        }
        else if (isProduct(item)) {
            return "Product #".concat(item.id, " costs $").concat(item.price.toFixed(2), ".");
        }
        else if (isOrder(item)) {
            return "Order ".concat(item.orderId, " has a total amount of $").concat(item.amount.toFixed(2), ".");
        }
        else {
            // This case should never happen with proper typing, but handles unexpected cases
            return 'Unknown data type encountered.';
        }
    });
}
// Example usage and testing
var mixedData = [
    { type: 'user', name: 'Alice', age: 30 },
    { type: 'product', id: 101, price: 29.99 },
    { type: 'order', orderId: 'ORD-12345', amount: 150.50 },
    { type: 'user', name: 'Bob', age: 25 },
    { type: 'product', id: 202, price: 99.99 },
];
// Process the data
var results = handleData(mixedData);
// Display results
console.log('Processing mixed data:');
console.log('='.repeat(50));
results.forEach(function (result, index) {
    console.log("".concat(index + 1, ". ").concat(result));
});
