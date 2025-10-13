// --- Exercise 1 --- //
// 1. Create a function call displayNumbersDivisible() that takes no parameter.
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let divisibleNumbers = [];
        for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            divisibleNumbers.push(i);
            sum += i;
        }
    }
    console.log(`\n--- Results for Divisor: ${divisor} ---`);
    console.log(`Divisible Numbers: ${divisibleNumbers.join(" ")}`);
    console.log(`Sum: ${sum}`);
}
displayNumbersDivisible();
// --- Bonus Examples ---

// Example 1: Divisible by 3
displayNumbersDivisible(3);

// Example 2: Divisible by 45
displayNumbersDivisible(45);

// --- Exercise 2 --- //
// 1. Add the stock and prices objects
let stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};  

let prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
}; 

// 2. Create an array called shoppingList
// Items: 1 banana, 1 orange, and 1 apple
let shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let totalPrice = 0;
    
    // 4. Loop through the shopping list items
    for (let item of shoppingList) {
        
        // Check if the item exists in stock AND if the stock count is greater than 0
        if (stock[item] && stock[item] > 0) {
            // Item is in stock: Add price to total
            totalPrice += prices[item];
            // Bonus: Decrease the item's stock by 1
            stock[item] -= 1;
            console.log(` Purchased 1 ${item} for $${prices[item]}. Stock remaining: ${stock[item]}`);
        } else if (stock[item] === 0) {
            console.log(`OUT OF STOCK: Cannot purchase 1 ${item}.`);
        } else {
            console.log(`ERROR: ${item} is not a valid item in the store.`);
        }
    }
    console.log(`Final Total Bill: $${totalPrice}`);
    // Log the updated stock for verification
    console.log("\nUpdated Stock after transactions:");
    console.log(stock);
    // The function should return the total price
    return totalPrice;
}
// 5. Call the myBill() function.
let finalBill = myBill();

// --- Exercise 3 --- //
 // 1. Create a function named changeEnough
function changeEnough(itemPrice, amountOfChange) {
    let coinValues = [0.25, 0.10, 0.05, 0.01];
    let totalChangeValue = 0;
    for (let i = 0; i < amountOfChange.length; i++) {
        totalChangeValue += amountOfChange[i] * coinValues[i];
    }
    let roundedTotal = parseFloat(totalChangeValue.toFixed(2));
    return roundedTotal >= itemPrice;
}
console.log("--- Testing changeEnough Function ---");
let test1 = changeEnough(4.25, [25, 20, 5, 0]);
console.log(`Can afford $4.25 with [25Q, 20D, 5N, 0P]? -> ${test1}`); 
let test2 = changeEnough(14.11, [2, 100, 0, 0]);
console.log(`Can afford $14.11 with [2Q, 100D, 0N, 0P]? -> ${test2}`); 
let test3 = changeEnough(0.75, [0, 0, 20, 5]);
console.log(`Can afford $0.75 with [0Q, 0D, 20N, 5P]? -> ${test3}`); 

// --- Exercise 4 --- //
 /* 1. Calculates the total cost of the hotel stay.*/
function hotelCost(nights) {
    // The hotel costs $140 per night
    return nights * 140;
}
/**
 * 2. Calculates the cost of the plane ride based on destination.*/
function planeRideCost(destination) {
    let dest = destination.toLowerCase().trim();

    switch (dest) {
        case "london":
            return 183;
        case "paris":
            return 220;
        default:
            return 300;
    }
}
/**
 * 3. Calculates the cost of the car rental, including discounts.*/
function rentalCarCost(days) {
    let dailyRate = 40;
    let cost = days * dailyRate;

    // 5% discount if renting for more than 10 days
    if (days > 10) {
        cost *= 0.95; // 5% discount means paying 95% of the cost
    }
    return cost;
}
/**
 * 4. Defines a function called totalVacationCost() that calculates and logs */
function totalVacationCost() {
    // --- 1. Get and Validate Number of Nights ---
    let nights;
    do {
        let input = prompt("How many nights would you like to stay in the hotel?");
        nights = parseInt(input);
        // Validation: Must be a number and greater than 0
    } while (isNaN(nights) || nights <= 0);
    let hotelPrice = hotelCost(nights);
    // --- 2. Get and Validate Destination ---
    let destination;
    do {
        destination = prompt("What is your destination?");
        // Validation: Must be a non-empty string
    } while (destination === null || destination.trim() === "");
    let planePrice = planeRideCost(destination);
    // --- 3. Get and Validate Rental Days ---
    let days;
    do {
        let input = prompt("How many days would you like to rent the car for?");
        days = parseInt(input);
        // Validation: Must be a number and greater than 0
    } while (isNaN(days) || days <= 0);
    let carPrice = rentalCarCost(days);
    // --- 4. Calculate Total ---
    let totalCost = hotelPrice + planePrice + carPrice;
    // Output breakdown and total cost, formatted to two decimal places for currency
    console.log(`\n--- VACATION COST BREAKDOWN ---`);
    console.log(`The car cost: $${carPrice.toFixed(2)}`);
    console.log(`The hotel cost: $${hotelPrice.toFixed(2)}`);
    console.log(`The plane tickets cost: $${planePrice.toFixed(2)}`);
    console.log(`-----------------------------`);
    console.log(`TOTAL VACATION COST: $${totalCost.toFixed(2)}`);
    return totalCost;
}
// 5. Call the function totalVacationCost() to start the process
totalVacationCost();

