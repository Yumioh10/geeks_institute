/* Exercise 1:
   1.1.
      PREDICTION: The alert will display: "inside the funcOne function 3"
      EXPLANATION: 'a' is declared with 'let' inside the function, giving it function scope.
      The 'if' condition (5 > 1) is true, and since 'a' is a 'let' variable, it can be
      successfully reassigned within its scope to 3.

   1.2. 
      PREDICTION: A TypeError will occur on the line 'a = 3;'.
      EXPLANATION: The 'const' keyword creates an immutable binding. Attempting to
      reassign a value to 'a' will result in an "Assignment to constant variable" error.   2.2 
   
   2.1.
      1. funcThree() (First call): Alert will display: "inside the funcThree function 0"
      (It reads the global variable 'a' which is 0.)
      2. funcTwo(): This function reassigns the global 'a' to 5.
      3. funcThree() (Second call): Alert will display: "inside the funcThree function 5"
      (It reads the modified global variable 'a'.)
      
   2.2.
      If the initial declaration is 'const a = 0;', a TypeError will occur on the line 'a = 5;'
      inside funcTwo(). The program will stop after the first call to funcThree() (which alerts 0),
      and the second funcThree() call will never be reached successfully.   
     
   3.1.   
      PREDICTION: funcFour() sets a global variable 'a' to "hello".
      funcFive() looks up the scope chain, finds 'a' in the global scope, and the alert will display:
      "inside the funcFive function hello"   

   4.1.
      PREDICTION: The alert will display: "inside the funcSix function test"
      EXPLANATION: 'a' is declared locally inside funcSix(). This local 'a' **shadows**
      the global 'a'. The function uses the local value, which is "test".
      The global 'a' remains 1.
   
   4.2. 
      If the local variable is declared with 'const a = "test";', the behavior is identical.
      The local constant still shadows the global variable. Alert will display:
      "inside the funcSix function test"

   5.1. 
      PREDICTION SEQUENCE:
         1. First alert (inside if block): Alert will display: "in the if block 5"
            (It uses the block-scoped 'a' declared with 'let'.)
         2. Second alert (outside if block): Alert will display: "outside of the if block 2"
            (The inner block scope closes, and 'let a = 5' is destroyed. The code falls back
            to accessing the outer 'let a = 2'.)

   5.2.
      If both variables are declared with 'const', the behavior is identical to using 'let'.
      Both 'let' and 'const' create block-scoped variables, so the inner 'const a = 5'
      would shadow the outer 'const a = 2' inside the block, and the outer variable
      would be accessible outside the block.
      */

/* Exercise 2: Ternary operator*/
// 1. 
      const winBattle = () => true;
// 2. Create a variable called experiencePoints  
// 3. Assign to this variable, a ternary operator
      const experiencePoints = winBattle() ? 10 : 1;
//4. Console.log the experiencePoints variable.
      console.log(`Experience Points earned (winBattle): ${experiencePoints}`);

/* Exercise 3:
1. The function should return true or false.*/
const isString = (value) => typeof value === 'string';
console.log(isString('hello')); // result: true
console.log(isString([1, 2, 4, 0])); // result: false

/* Exercise 4: Find the sum
1. Create a one line function (ie. an arrow function) that receives two numbers as parameters and returns the sum.*/
const sum = (a, b) => a + b;
console.log(`The sum of 10 and 25 is: ${sum(10, 25)}`); // Expected:35

/* Exercise 5: Kg and grams 
Create a function that receives a weight in kilograms and returns it in grams. (Hint: 1 kg is 1000gr)*/
// 1. First, use function declaration and invoke it.
function convertKgToGramsDeclaration(kg) {
    return kg * 1000;
}
console.log(`1. Declaration: 5 kg is ${convertKgToGramsDeclaration(5)} grams.`);

// 2. Then, use function expression and invoke it.
const convertKgToGramsExpression = function(kg) {
    return kg * 1000;
};
console.log(`2. Expression: 2.5 kg is ${convertKgToGramsExpression(2.5)} grams.`);

// 3. Write in a one line comment, the difference between function declaration and function expression.
// Difference: Declarations are hoisted (can be called before defined); expressions are not.

// 4. Finally, use a one line arrow function and invoke it.
const convertKgToGramsArrow = kg => kg * 1000;
console.log(`4. Arrow Function: 1.2 kg is ${convertKgToGramsArrow(1.2)} grams.`);

/* Exercise 6:
1. Create a self invoking function with 4 arguments: number of children, partner’s name, geographic location, job title.*/

(function(numChildren, partnerName, geoLocation, jobTitle) {
   const fortuneElement = document.getElementById('fortune-output');
   const fortune = `You will be a ${jobTitle} in ${geoLocation}, and married to ${partnerName} with ${numChildren} kids.`;
   console.log(`${fortune}`);
})(4, "Sarah", "Morocco", "junior JavaScript Developer");
   
/* Exercise 7:*/
// Create a self invoking funtion that takes 1 argument: the name of the user
(function(userName) {
   const navbarContainer = document.getElementById('navbar-welcome-container');
   const welcomeDiv = document.createElement('div');
            
   // Using inline SVG for a profile picture icon
   const profileIcon = `
      <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.938.804 6.879 2.227M12 14v2m-3-4a3 3 0 116 0 3 3 0 01-6 0zM12 2a10 10 0 100 20 10 10 0 000-20z"></path>
      </svg>`;

   // Create and style the div to hold the icon and name
      welcomeDiv.classList.add('flex', 'items-center', 'space-x-3', 'p-2', 'bg-indigo-100', 'rounded-full', 'shadow-inner', 'cursor-pointer', 'hover:bg-indigo-200', 'transition', 'duration-150');
            
      welcomeDiv.innerHTML = `
         ${profileIcon}
         <span class="text-sm font-semibold text-gray-800">Welcome, ${userName}!</span>`;

      // Add the div to the Navbar
      if (navbarContainer) {
         navbarContainer.appendChild(welcomeDiv);
         console.log(`Welcome message displayed for user: ${userName} in the Navbar.`);
      }

      // Argument passed to the IIFE immediately:
})("John");

// Exercise 8:
function makeJuice(size) {
    // 2. The inner function named addIngredients
    function addIngredients(ing1, ing2, ing3) {
        // Displays the sentence on the DOM.
        // For this example, we'll use console.log as a proxy for DOM display.
        const message = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}.`;
        console.log("Part I Output:");
        console.log(message);
        
        // In a real browser environment, you might use:
        // const outputDiv = document.getElementById('output');
        // outputDiv.textContent = message;
    }

    // 3. Invoke the inner function ONCE inside the outer function.
    addIngredients("apple", "carrot", "ginger");
}

// 3. Invoke the outer function in the global scope.
makeJuice("medium");

function makeJuice(size) {
    // 1. Create an empty array named ingredients.
    const ingredients = [];

    // 2. The addIngredients function should now receive 3 ingredients, 
    // and push them into the ingredients array.
    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    // 3. Create a new inner function named displayJuice that displays the final sentence.
    function displayJuice() {
        // Join the array elements into a comma-separated string for the output.
        const ingredientsList = ingredients.join(", ");

        // Displays the sentence on the DOM.
        const message = `The client wants a ${size} juice, containing ${ingredientsList}.`;
        console.log("\nPart II Output:");
        console.log(message);
    }
    
    // 4. The client wants 6 ingredients:
    // Invoke the addIngredients function TWICE.
    addIngredients("banana", "spinach", "kale"); // First 3 ingredients
    addIngredients("pineapple", "coconut water", "lime"); // Next 3 ingredients

    // Then invoke once the displayJuice function.
    displayJuice();
}

// 4. Finally, invoke the makeJuice function in the global scope.
makeJuice("large");









