let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// 1. displayGroceries function
const displayGroceries = () => {
    console.log("--- Fruits ---");
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
    console.log("--------------");
};

// 2. cloneGroceries function
const cloneGroceries = () => {
    // a. Copy client to user
    let user = client; // Copy by Value (for primitive types)

    // b. Change client
    client = "Betty";

    // Will we also see this modification in the user variable?
    console.log(`\nClient after change: ${client}`); // Betty
    console.log(`User after copy: ${user}`); // John

    // --- Analysis of client/user change ---
    /*
    No, the modification in 'client' is NOT seen in 'user'.
    This is because 'client' is a **primitive type** (string).
    When you assign 'client' to 'user' ($let user = client$), the **value** ("John") is copied
    to 'user'. 'client' and 'user' now hold separate values in memory. Changing 'client'
    only affects that specific variable's value. This is **Pass by Value**.
    */

    // c. Copy groceries to shopping
    let shopping = groceries; // Copy by Reference (for non-primitive types/objects)

    // d. Change totalPrice
    shopping.totalPrice = "35$";

    // Will we also see this modification in the shopping object?
    console.log(`\nGroceries totalPrice after shopping change: ${groceries.totalPrice}`); // 35$
    console.log(`Shopping totalPrice after change: ${shopping.totalPrice}`); // 35$

    // --- Analysis of totalPrice change ---
    /*
    Yes, the modification is seen in the 'shopping' object (and also in the original 'groceries' object).
    This is because 'groceries' is a **non-primitive type** (object).
    When you assign 'groceries' to 'shopping' ($let shopping = groceries$), they both point to the
    **same location in memory** where the object resides. They share the same reference.
    Changing a property in 'shopping' modifies the object at that shared memory location,
    which is reflected in 'groceries' as well. This is **Pass by Reference**.
    */

    // e. Change paid
    shopping.other.paid = false;

    // Will we also see this modification in the shopping object?
    console.log(`\nGroceries paid status after shopping change: ${groceries.other.paid}`); // false
    console.log(`Shopping paid status after change: ${shopping.other.paid}`); // false

    // --- Analysis of paid change ---
    /*
    Yes, the modification is also seen in the 'shopping' object (and the original 'groceries' object).
    The same principle of **Pass by Reference** applies. Since 'shopping' and 'groceries' point to
    the same object, changing the nested 'paid' property within that single object's structure
    is visible through both variables.
    */
};

// 3. Invoke the functions
displayGroceries();
cloneGroceries();

// Output of client after cloneGroceries:
console.log(`\nFinal client value outside the function: ${client}`); // Betty