// Exercise 1: Intersection Types
// Define the Person type
type Person = {
  name: string;
  age: number;
};

// Define the Address type
type Address = {
  street: string;
  city: string;
};

// Create an intersection type that combines Person and Address
type PersonWithAddress = Person & Address;

// Create a variable with properties from both types
const personWithAddress: PersonWithAddress = {
  name: "John Doe",
  age: 30,
  street: "123 Main Street",
  city: "New York"
};

// Display the result
console.log('\n --- Exercise 1: Intersection Types')
console.log(personWithAddress);
console.log(`${personWithAddress.name} is ${personWithAddress.age} years old`);
console.log(`Lives at ${personWithAddress.street}, ${personWithAddress.city}`);

// Exercise 2: Type Guards with Union Types
// Function that uses type guards with union types
function describeValue(value: number | string): string {
  // Type guard using typeof operator
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}

// Test the function with different input types
console.log('\n --- Exercise 2: Type Guards with Union Types ---')
console.log(describeValue(42));           
console.log(describeValue("Hello"));      
console.log(describeValue(3.14));         
console.log(describeValue("TypeScript")); 

// Exercise 3: Type Casting
// Create a variable of type any
let someValue: any = "Hello, TypeScript!";

// Method 1: Type casting using angle-bracket syntax
let stringValue1 = <string>someValue;

// Method 2: Type assertion using 'as' syntax (preferred in TSX/JSX)
let stringValue2 = someValue as string;

// Use the casted value as a string
console.log('\n --- Exercise 3: Type Casting ---')
console.log("Using angle-bracket syntax:");
console.log(stringValue1.toUpperCase());
console.log(stringValue1.length);
console.log(stringValue1.substring(0, 5));

console.log("\nUsing 'as' syntax:");
console.log(stringValue2.toLowerCase());
console.log(stringValue2.split(" "));

// Additional example showing type casting with different values
let anotherValue: any = "TypeScript";
let castedString = anotherValue as string;

console.log("\nString methods available after casting:");
console.log(`Original: ${castedString}`);
console.log(`Uppercase: ${castedString.toUpperCase()}`);
console.log(`Starts with 'Type': ${castedString.startsWith("Type")}`);
console.log(`Character at index 0: ${castedString.charAt(0)}`);

// Exercise 4: Type Assertions with Union Types
// Function that uses type assertion to return first element as string
function getFirstElement(arr: (number | string)[]): string {
  // Get the first element
  const firstElement = arr[0];
  
  // Use type assertion to treat it as a string
  return firstElement as string;
}

console.log('\n --- Exercise 4: Type Assertions with Union Types ---')
// Test with different arrays of mixed types
console.log("Test 1 - String first:");
const array1 = ["Hello", 42, "World", 100];
console.log(getFirstElement(array1)); 
console.log(typeof getFirstElement(array1));

console.log("\nTest 2 - Another string first:");
const array2 = ["TypeScript", 3.14, 99, "JavaScript"];
console.log(getFirstElement(array2)); 

console.log("\nTest 3 - Number first (assertion still works):");
const array3 = [42, "Hello", 100, "World"];
console.log(getFirstElement(array3)); 
console.log(typeof getFirstElement(array3)); 

console.log("\nTest 4 - Using the returned value as string:");
const array4 = ["Programming", 2024, "is", "fun"];
const result = getFirstElement(array4);
console.log(result.toUpperCase()); 
console.log(result.length); 

// Alternative implementation with runtime check
function getFirstElementSafe(arr: (number | string)[]): string {
  const firstElement = arr[0];
  
  // Convert to string if it's a number
  if (typeof firstElement === "number") {
    return firstElement.toString();
  }
  
  return firstElement as string;
}

console.log("\n--- Safe version with runtime conversion ---");
console.log(getFirstElementSafe([42, "test"]));     
console.log(getFirstElementSafe(["hello", 99]));    

// Exercise 5: Generic Constraints
// Define an interface for types with a length property
console.log('\n --- Exercise 5: Generic Constraints ---')
interface HasLength {
  length: number;
}

// Generic function with constraint
function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

// Test with string
console.log("Testing with string:");
logLength("Hello, TypeScript!");

// Test with array of numbers
console.log("\nTesting with array of numbers:");
logLength([1, 2, 3, 4, 5]); 

// Test with array of strings
console.log("\nTesting with array of strings:");
logLength(["apple", "banana", "cherry"]); 
// Test with empty string
console.log("\nTesting with empty string:");
logLength("123"); 

// Test with empty array
console.log("\nTesting with empty array:");
logLength([]); 

// Generic function that returns the item and logs length
function logAndReturn<T extends HasLength>(item: T): T {
  console.log(`Item length: ${item.length}`);
  return item;
}

console.log("\n--- Using logAndReturn function ---");
const myString = logAndReturn("TypeScript");
const myArray = logAndReturn([10, 20, 30]);

console.log(`Returned string: ${myString}`);
console.log(`Returned array: ${myArray}`);

// This would cause a TypeScript error (uncomment to see):
// logLength(123); // Error: number doesn't have a length property
// logLength({ name: "John" }); // Error: object doesn't have length property


