// Exercise 1:
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
console.log("Original Array:", colors);

/* 1. displays the colors in "N# choice is Color." format */
const colorchoices = colors.map((color, index) => {
   const choiceNumber = index + 1;
   const message = `${choiceNumber}# choice is ${color}.`;
   console.log(message);
   return message;
   });

   /* Check if at least one element of the array is equal to the value “Violet”. If yes, console.log("Yeah"), else console.log("No...")*/
const hasViolet = colors.some(color => color === "Violet");

if (hasViolet) {
  console.log("Yeah");
} else {
  console.log("No...");
}

// Exercise 2: 

const ordinal = ["th","st","nd","rd"];
/* 1. const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];
*/
colors.forEach((color, index) => {
   const choiceNumber = index + 1; // 1, 2, 3, ...
   const suffix = (choiceNumber === 1) 
   ? ordinal[1] 
   : (choiceNumber === 2) 
   ? ordinal[2] 
   : (choiceNumber === 3) 
   ? ordinal[3] 
   : ordinal[0];
   const message = `${choiceNumber}${suffix} choice is ${color}.`;
   console.log(message);
});

/* Exercise 3:*/

//------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);

//------2------
const country = "USA";
console.log([...country]);

//------Bonus------
let newArray = [...[,,]];
console.log(newArray);

/* 1. Analyze these pieces of code before executing them. What will be the outputs ? 
1.1 Analysis:
Spread Operator on Arrays: The spread operator (...) is used to unpack iterable elements (like arrays) into a new array literal.
Order of Elements: The result array is constructed sequentially:
The string 'bread' is added first.
The elements of vegetables ('carrot', 'potato') are spread into the new array.
The string 'chicken' is added next.
The elements of fruits ('apple', 'orange') are spread into the new array.

Predicted Output:
[ 'bread', 'carrot', 'potato', 'chicken', 'apple', 'orange' ]

1.2 Analysis:
Analysis:
Spread Operator on Strings: Strings are iterable in JavaScript. When the spread operator is applied to a string, it unpacks the string into its individual characters.
Array Creation: These individual characters ('U', 'S', 'A') are then placed into the new array literal defined by the brackets [...].

Predicted Output:
[ 'U', 'S', 'A' ]

Bonus:
Analysis:
Sparse Arrays: The array literal [,,] creates a sparse array with a length of 2, but no defined elements (known as "holes").
Spreading Sparse Arrays: When a sparse array is spread (...), the new array created (newArray) will copy the holes/empty slots from the source array.
Console Logging Holes: When an array containing empty slots is logged to the console, it typically displays the empty slots as empty or just ,, depending on the environment. Importantly, the array length will be preserved (length 2), and the elements are not automatically converted to undefined upon spreading in this context.

Predicted Output:
The exact console output representation varies by environment (Node, Chrome, Firefox), but the internal structure is an array of length 2 containing two empty slots.
A typical representation in Node or browser consoles might look like this:
[ <2 empty items> ]
Or, simply:
[ , , ]
The length of newArray will be 2, and accessing newArray[0] or newArray[1] would return undefined.
*/

/* Exercise 4:
1. Using the map() method, push into a new array the firstname of the user and a welcome message. You should get an array that looks like this :*/
const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];

function solveEmployeesExercise() {
   
   // 1. Using the map() method, push into a new array the firstname of the user and a welcome message.
   const welcomeStudents = users.map(user => {
   // The map method transforms each user object into a new string.
      return `Hello ${user.firstName}`;
   });

   console.log("\n1. Welcome Messages Array (using map()):");
   console.log(welcomeStudents);
   // Expected: ["Hello Bradley", "Hello Chloe", "Hello Jonathan", "Hello Michael", "Hello Robert", "Hello Wes", "Hello Zach"]


   // 2. Using the filter() method, create a new array, containing only the Full Stack Residents.
   const fullStackResidents = users.filter(user => {
   // The filter method keeps only objects where the condition (user.role === 'Full Stack Resident') is true.
      return user.role === 'Full Stack Resident';
   });

   console.log("\n2. Full Stack Residents (using filter()):");
   console.log(fullStackResidents);
   /* Expected: [
      { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
      { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
      { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' }
   ]*/


   // 3. Bonus : Chain the filter method with a map method, to return an array containing only the lastName of the Full Stack Residents.
   const fsrLastNames = users
      .filter(user => user.role === 'Full Stack Resident') // Step 1: Filter to get only FSR objects
      .map(resident => resident.lastName);                 // Step 2: Map the resulting objects to their lastName property

      console.log("\n3. Bonus: Last Names of Full Stack Residents (using chain filter() and map()):");
      console.log(fsrLastNames);
      // Expected: ["Bouley", "Alnaji", "Hajek"]
}

solveEmployeesExercise()

/* Exercise 5:
Use the reduce() method to combine all of these into a single string. */
const epicString = epic.reduce((accumulator, currentValue) => {
   if (accumulator === '') {
      return currentValue;
   }
   return accumulator + ' ' + currentValue;
}, ''); 
console.log("Original array:", epic);
console.log("Combined string (using reduce()):");
console.log(epicString);

/* Exercise 6:
1. Using the filter() method, create a new array, containing the students that passed the course.*/
const passingStudents = students.filter(student => student.isPassed);
console.log("\n1. Students Who Passed (using filter()):");
console.log(passingStudents);

/* 2. Bonus : Chain the filter method with a forEach method */
console.log("\n2. Bonus: Congratulatory Messages (using chain filter() and forEach()):");
students
   .filter(student => student.isPassed) // Step 1: Filter to keep only students where isPassed is true
   .forEach(student => {
   // Step 2: Iterate over the filtered array and print the message
      console.log(`Good job ${student.name}, you passed the course in ${student.course}!`);
   });

