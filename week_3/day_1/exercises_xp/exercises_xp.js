//##########################################################
// Exercise 1:
//##########################################################                  
// Initial array provided for the exercise
const people = ["Greg", "Mary", "Devon", "James"];
console.log("Initial Array:", people);

// Part 1:
// 1. Write code to remove “Greg” from the people array.
people.shift();
console.log("1. After removing 'Greg':", people);

// 2. Write code to replace “James” to “Jason”.
const jamesIndex = people.indexOf("James");
if (jamesIndex !== -1) {
    people[jamesIndex] = "Jason";
}
console.log("2. After replacing 'James' with 'Jason':", people);

// 3. Write code to add your name to the end of the people array.
const myName = "Sarah"; 
people.push(myName);
console.log("3. After adding my name ('Sarah'):", people);

// 4. Write code that console.logs Mary’s index using indexOf method.
const maryIndex = people.indexOf("Mary");
console.log(`4. The index of "Mary" is: ${maryIndex}`);

// 5. Write code to make a copy of the people array using the slice method.
const peopleCopy = people.slice(1, 3);
console.log("5. The peopleCopy (excluding 'Mary' and 'Gemini'):", peopleCopy);
console.log("5. The original 'people' array remains unchanged:", people); 

// 6. Write code that gives the index of “Foo”. Why does it return -1 ?
const fooIndex = people.indexOf("Foo");
console.log(`6. The index of "Foo" is: ${fooIndex}`);
// The 'indexOf' method returns -1 when the requested element ("Foo") is not found in the array.
// This is a standard way in JavaScript to indicate a "not found" result.

// 7. Create a variable called last which value is the last element of the array.
const last = people[people.length - 1];
console.log(`7. The value of 'last' (the last element) is: ${last}`);

// Part 2: Loops
// 1. Using a loop, iterate through the people array and console.log each person.
for (const person of people) {
    console.log(`Person: ${person}`);
}

// 2. Using a loop, iterate through the people array and exit the loop after you console.log “Devon” .
for (let i = 0; i < people.length; i++) {
    const person = people[i];
    console.log(`Checking person: ${person}`);

    if (person === "Devon") {
        console.log("Found 'Devon'. Exiting loop using 'break'.");
        break; // Stops the loop immediately
    }
}

//##########################################################
// Exercise 2:
//##########################################################
// 1. Create an array called colors where the value is a list of your five favorite colors.
const favoriteColors = ["Beige", "Blue", "Pink", "Green", "White"];
console.log("Favorite Colors:", favoriteColors);

// 2. Loop through the array and as you loop console.log a string like so: “My #1 choice is blue”, “My #2 choice is red” ect… .
for (let i = 0; i < favoriteColors.length; i++) {
    // i + 1 gives us the choice number (1, 2, 3, etc.)
    const choiceNumber = i + 1;
    const color = favoriteColors[i];
    console.log(`My #${choiceNumber} choice is ${color}`);
}

// 3. Bonus: Change it to console.log “My 1st choice”, “My 2nd choice”, “My 3rd choice”, picking the correct suffix for each number.
const suffixes = ["st", "nd", "rd", "th", "th"]; // Maps to array indices 0, 1, 2, 3, 4

for (let i = 0; i < favoriteColors.length; i++) {
    const choiceNumber = i + 1;
    const color = favoriteColors[i];

    // The index 'i' directly corresponds to the index of the suffix array.
    const suffix = suffixes[i];

    console.log(`My ${choiceNumber}${suffix} choice is ${color}`);
}

//##########################################################
// Exercise 3:
//##########################################################

// 1. Prompt the user for a number.
// 2. While the number is smaller than 10 continue asking for a new number.
let userNumber;
let counter = 0;

do {
    let promptResult;
    if (counter === 0) {
        promptResult = prompt("Please enter a number:");
        console.log(`Initial type check (Task 1 Hint): prompt returned a ${typeof promptResult}. We must convert it to a number.`);
    } else {
        promptResult = prompt(`The last number (${userNumber}) was smaller than 10. Please enter a new number greater than or equal to 10:`);
    }
    userNumber = Number(promptResult);
        if (isNaN(userNumber)) {
            console.log("Invalid input detected (NaN). Treating as 0 to keep the loop running if less than 10.");
            userNumber = 0;
        }
        counter++;
    } 
while (userNumber < 10);
    console.log(`Final number (${userNumber}) is >= 10 after ${counter} iteration(s).`);

//##########################################################
// Exercise 4:
//##########################################################
// 1. Copy and paste the building object
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
};
console.log("Building object defined.");

// 2. Console.log the number of floors in the building.
console.log(`Number of floors: ${building.numberOfFloors}`);

// 3. Console.log how many apartments are on the floors 1 and 3.
const aptsFloor1 = building.numberOfAptByFloor.firstFloor;
const aptsFloor3 = building.numberOfAptByFloor.thirdFloor;
const totalApts = aptsFloor1 + aptsFloor3;

console.log(`Number of apartments on floors 1 and 3 combined: ${aptsFloor1} + ${aptsFloor3} = ${totalApts}`);

// 4. Console.log the name of the second tenant and the number of rooms he has in his apartment.
// The second tenant is at index 1 in the nameOfTenants array.
const secondTenantName = building.nameOfTenants[1]; // "Dan"
// We use the lowercase name ("dan") as the key to access the room/rent data.
const danRooms = building.numberOfRoomsAndRent.dan[0]; // [4, 1000] -> index 0 is rooms (4)

console.log(`The second tenant is ${secondTenantName} and they have ${danRooms} rooms.`);

// 5. Check if the sum of Sarah’s and David’s rent is bigger than Dan’s rent.
// If it is, then increase Dan’s rent to 1200.
const sarahRent = building.numberOfRoomsAndRent.sarah[1]; // 990
const davidRent = building.numberOfRoomsAndRent.david[1]; // 500
let danRent = building.numberOfRoomsAndRent.dan[1];       // 1000

const combinedRent = sarahRent + davidRent;

console.log(` Sarah's rent ($${sarahRent}) + David's rent ($${davidRent}) = $${combinedRent}. Dan's current rent is $${danRent}.`);

if (combinedRent > danRent) {
    // Increase Dan's rent to 1200
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log(`   Condition met (Combined Rent > Dan's Rent). Dan's new rent is: $${building.numberOfRoomsAndRent.dan[1]}`);
} else {
    console.log("   Condition not met. Dan's rent remains unchanged.");
}

//##########################################################
// Exercise 5:
//##########################################################
// 1. Create an object called family with a few key value pairs.
const family = {
    surname: "Mernissi",
    members: 4,
    city: "London",
    isHappy: true
};
console.log("Family object created:", family);

// 2. Using a for in loop, console.log the keys of the object.
console.log("Family object keys using for...in:");
for (const key in family) {
    console.log(key);
}
// 3. Using a for in loop, console.log the values of the object.
console.log("3. Family object values using for...in:");
for (const key in family) {
    // We use the bracket notation (family[key]) to access the value associated with the current key.
    console.log(family[key]);
}

//##########################################################
// Exercise 6:
//##########################################################
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};
// Given the object above and using a for loop, console.log “my name is Rudolf the reindeer”
let sentence = "";

for (const key in details) {
  if (details.hasOwnProperty(key)) {
    // Append the key, a space, the value, and another space
    sentence += key + " " + details[key] + " ";
  }
}
console.log(sentence.trim());

//##########################################################
// Exercise 7:
//##########################################################
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
// 1.
const secretSocietyName = names
  .map(name => name[0]) // Get first letters
  .sort()               // Sort them alphabetically
  .join("");            // Join them into a string

// 2. Console.log the result
console.log(secretSocietyName);
