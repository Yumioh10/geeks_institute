/* Exercise 1: Multiple Exports and Import using CommonJS syntax*/
/* In shop.js, require the product objects from the products.js module.*/

const products = require('./products');

/* 6. Create a function that takes a product name as a parameter*/
function findProductDetails(productName) {
    const foundProduct = products.find(product => product.name === productName);
    if (foundProduct) {
        console.log(`\nProduct Found: ${productName}`);
        console.log(`Name: ${foundProduct.name}`);
        console.log(`Price: $${foundProduct.price.toFixed(2)}`);
        console.log(`Category: ${foundProduct.category}`);
        return foundProduct;
    } else {
        console.log(`\nProduct Not Found: ${productName}`);
        return null;
    }
}

// 7. Call this function with different product names
console.log("--- Starting Product Search ---");
findProductDetails("Apple iPhone pro Max");
findProductDetails("Artificial Intelligence For Dummies");
findProductDetails("Redme smartphone"); // Test case for a product not in the list
findProductDetails("Javascript for dummies");

console.log("\n--- Product Search Complete ---");