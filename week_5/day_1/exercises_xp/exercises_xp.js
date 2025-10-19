/* Exercise 1:
1. Create a function called compareToTen(num) that takes a number as an argument. */
const compareToTen = (num) => {
    // Return a new Promise
    return new Promise((resolve, reject) => {
        // Check the condition
        if (num <= 10) {
            // Resolve if the number is less than or equal to 10
            resolve(`✅ Success: ${num} is less than or equal to 10.`);
        } else {
            // Reject if the number is greater than 10
            reject(`❌ Error: ${num} is greater than 10.`);
        }
    });
};
/* 2. The function should return a Promise 
Test 1: Argument greater than 10 (Should Reject)
 In the example, the promise should reject */
compareToTen(15)
  .then(result => console.log(result)) // Skipped
  .catch(error => console.log(error)); // Executed

/* Expected Output:
 ❌ Error: 15 is greater than 10.

Test 2: Argument less than 10 (Should Resolve)
 In the example, the promise should resolve */
compareToTen(8)
  .then(result => console.log(result)) // Executed
  .catch(error => console.log(error)); // Skipped

/* Expected Output:
 ✅ Success: 8 is less than or equal to 10.*/

/* Exercise 2: 
1. Create a promise that resolves itself in 4 seconds and returns a “success” string.*/
const delayedSuccessPromise = new Promise((resolve, reject) => {
    // Set a timer for 4000 milliseconds (4 seconds)
    setTimeout(() => {
        // After 4 seconds, call resolve() with the success string
        resolve("success");
    }, 4000);
});
/* Testing and Execution*/
console.log("Starting promise execution... waiting 4 seconds.");

delayedSuccessPromise
    .then(result => {
        // This will only run after the 4-second delay
        console.log(`Promise resolved! Result: "${result}"`);
    })
    .catch(error => {
        // This won't be executed since we only call resolve()
        console.error("Promise rejected:", error);
    });
console.log("This line runs immediately (non-blocking code).");

/* Exercise 3:
1. Use Promise.resolve(value) to create a promise that will resolve itself with a value of 3.*/
// Creates a promise that resolves immediately with the value 3
const resolvedPromise = Promise.resolve(3);

// Test the resolved promise
resolvedPromise
    .then(result => {
        console.log(`✅ Resolved Promise Value: ${result}`); // Output: 3
    })
    .catch(error => {
        // This won't be executed
        console.error("Should not reject.", error);
    });

/* 2. Use Promise.reject(error) to create a promise that will reject itself with the string “Boo!” */
// Creates a promise that rejects immediately with the string "Boo!"
const rejectedPromise = Promise.reject("Boo!");

// Test the rejected promise
rejectedPromise
    .then(result => {
        // This won't be executed
        console.log("Should not resolve.", result);
    })
    .catch(error => {
        console.error(`❌ Rejected Promise Error: ${error}`); // Output: Boo!
    });

