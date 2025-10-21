/* Exercise 2
5. import the array of person objects from the data.js module.*/
import people from "./data.js";

/* 6. Write a function that calculates and prints the average age of all the persons in the array.*/
function averageAge(personArray) {
   if (personArray.length === 0) {
      console.log("The array is empty, cannot calculate the average age.")
      return 0
   }
   /* Calcukate the Totale sum of ages*/
   const totalAge = personArray.reduce((sum, person) => sum + person.age, 0);
   /* Calculate the average age*/
   const averageAge = totalAge / personArray.length;
   console.log(`The average age is: ${averageAge.toFixed(0)} years`);
   return averageAge;
}

/* 7. Use the imported array and the average age function in app.js.*/
console.log("imported data review:", people);
averageAge(people);

/* 8. Run app.js and confirm that the average age is correctly calculated and displayed. */