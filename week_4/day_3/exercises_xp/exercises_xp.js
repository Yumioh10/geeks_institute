/* Exercise 1:
1. */
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

/* The output of the code will be:
I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

Explanation of the Code:
The exercise demonstrates destructuring object in JavaScrn ipt, a feature that makes it possible to unpack values from arrays or properties from objects into distinct variables.
Original Object: The person object contains nested data, including a location object and an array of coordinates inside that.
name is extracted directly from person. The variable name now holds 'John Doe'.
location: { ... } tells JavaScript to look inside the location property.
country and city are extracted from the location object. The variables country and city now hold 'Canada' and 'Vancouver', respectively.
coordinates: [lat, lng] instructs JavaScript to look at the coordinates property, which is an array, and then use array destructuring to assign the first element (49.2827) to a new variable called lat and the second element (-123.1207) to a new variable called lng.

/* Exercise 2:
Using the code above, destructure the parameter inside the function and return a string as the example seen below:*/
function displayStudentInfo(objUser){
    //destructuring
    const {first, last} = objUser;
    return `Your full name is ${first} ${last}`;
}

const student = {first: 'Elie', last:'Schoppik'};
const output = displayStudentInfo(student);

console.log(output);

/* Exercise 3:
1. Using methods taught in class, turn the users object into an array:
Excepted output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]
FYI : The number is their ID number.*/
const users = { user1: 18273, user2: 92833, user3: 90315 };
// Use Object.entries() to turn the object into an array of [key, value] pairs.
const usersArray = Object.entries(users);
console.log(usersArray);

/* 2. Modify the outcome of part 1, by multipling the user’s ID by 2. */
// Start with the result from Part 1
let usersArrayDoubled = [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ];

// Use map() to iterate over the array and create a new one.
const modifiedUsersArray = usersArray.map(([username, id]) => {
    // [username, id] is using array destructuring to easily access the elements.
    const newId = id * 2;
    // Return a new array containing the original username and the new ID.
    return [username, newId];
});

console.log(modifiedUsersArray);

/* Exercise 4: 
1. Analyze the code below. What will be the output? */
class Person {
  constructor(name) {
    this.name = name;
  }
}
const member = new Person('John');
console.log(typeof member);
/* Explanation of the Output
Class and Constructor: The code defines a Person class with a constructor that takes a name and assigns it to the instance's name property (this.name = name;).
Instance Creation: The line const member = new Person('John'); uses the new keyword to create a new instance of the Person class. This instance, stored in the member variable, is an object representing a person named 'John'.
The typeof Operator: The console.log(typeof member); statement uses the typeof operator to check the data type of the variable member.
Result: In JavaScript, when you create an instance of a class using new, the resulting value is always an object. Therefore, typeof member returns the string "object".
This demonstrates a fundamental concept in object-oriented programming in JavaScript: classes are blueprints for creating objects.*/

/* Exercise 5: */
class Dog {
  constructor(name) {
    this.name = name;
  }
};
  // 1
class Labrador extends Dog {
  constructor(name, size) {
    this.size = size;
  }
};
  // 2
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};
  // 3
class Labrador extends Dog {
  constructor(size) {
    super(name);
    this.size = size;
  }
};
  // 4
class Labrador extends Dog {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
};
/* The constructor that will successfully extend the Dog class is Option 2.
Why Option 2 Works:
When a class extends another class in JavaScript (like Labrador extending Dog), it's known as a derived class or subclass. A crucial rule for constructors in derived classes is that they must call super() before accessing this.
super(name): This call executes the constructor of the parent class (Dog), which initializes the name property on the new object by running this.name = name; inside the Dog constructor. It also correctly sets up the inheritance chain.
this.size = size: After calling super(), the derived class can then safely use this to initialize its own new properties, like size. 

Option 1:
Error: It accesses this (this.size = size;) before calling super(). In a subclass constructor, this will throw a ReferenceError because the object's creation and linking to the parent's prototype are handled by super().

Option 3:
Error: The Labrador constructor only takes size as an argument, but it tries to pass an undefined variable name to super(). This would either pass undefined to the Dog constructor (setting this.name to undefined) or potentially throw a ReferenceError if name wasn't declared in the surrounding scope (though generally, it'll just be undefined within the constructor scope). More fundamentally, the constructor needs to be able to accept the name to pass it up.

Optioin 4:
Error: Similar to Option 1, it accesses this (this.name = name;) before calling super(). Even though it manually sets this.name, it fails to properly initialize the inheritance mechanism, violating the rule for subclass constructors. It must call super(name) to delegate the parent's initialization.*/

/* Exercise 6:
1. Evaluate these (ie True or False) 
Comparison	Evaluation	Reason
[2] === [2]	False	      Arrays and objects in JavaScript are compared by reference. Even though both arrays contain the same value, they are two separate objects in memory. The strict equality operator (===) returns true only if they refer to the exact same object.
{ } === { }	False	      Similar to arrays, two object literals ({}) are also compared by reference. Each literal creates a new, separate object in memory, so they do not refer to the same instance.
*/

/* 2. What is, for each object below, the value of the property number and why?
Object	Value of number	Reason
object1	4	               Its number property was explicitly set to 4 by object1.number = 4;.
object2	4	               object2 = object1 assigns the reference to the object stored in object1. When object1.number is changed to 4, it changes the property on the single object that both object1 and object2 point to.
object3	4	               object3 = object2 assigns the reference from object2. Since object2 references the same object as object1, all three variables point to the same object in memory, and the change made by object1.number = 4; is reflected in object3.
object4	5	               
object4 = { number: 5 }    creates a new, separate object in memory. It has no connection to object1, object2, or object3. The change to object1.number does not affect this distinct object.
console.log(object2.number) // Output: 4
console.log(object3.number) // Output: 4
console.log(object4.number) // Output: 5*/

/* Class Creation:
1. Create a class Animal with the attributes name, type and color. */
class Animal {
  /**
   * Initializes a new Animal object.
   * @param {string} name - The name of the animal.
   * @param {string} type - The type of the animal (e.g., dog, cat).
   * @param {string} color - The color of the animal.
   */
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

/* 2. Create a class Mammal that extends from the Animal class.*/
class Mammal extends Animal {
  /**
   * Initializes a new Mammal object by calling the Animal constructor.
   * @param {string} name - The name of the animal.
   * @param {string} type - The type of the animal (e.g., cow, whale).
   * @param {string} color - The color of the animal.
   */
  constructor(name, type, color) {
    super(name, type, color);
  }

  /**
   * Returns a detailed string describing the animal and the sound it makes.
   * @param {string} noise - The sound the animal makes.
   * @returns {string} - The descriptive sentence.
   */
  sound(noise) {
    // Uses template literals for easy string construction
    return `${noise} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}
/* 3. Create a farmerCow object that is an instance of the class Mammal.  */
// Create an instance of the Mammal class
const farmerCow = new Mammal("Lily", "cow", "brown and white");

// Call the sound method
const cowInfo = farmerCow.sound("Moooo");

console.log(cowInfo);
