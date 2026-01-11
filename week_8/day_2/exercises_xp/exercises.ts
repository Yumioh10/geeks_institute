// Exercise 1: Hello, World! Program
let message: string = "Hello, World!";

console.log("Exercise 1: Hello, World! Program");
console.log(message);

// Exercise 2: Type Annotations
let age: number = 25;
let name: string = "Alice";

console.log("\n Exercise 2: Type Annotations");
console.log(`Name: ${name}, Age: ${age}`);

// Exercise 3: Union Types
console.log("\n Exercise 3: Union Types");
let id: string | number;
id = "ABC123";
console.log(`ID as string: ${id}`);
id = 12345;
console.log(`ID as number: ${id}`);

// Exercise 4: Control Flow with if...else
console.log("\n Exercise 4: Control Flow with if...else ");
function checkNumber(num: number): string {
  if (num > 0) {
    return "The number is positive";
  } else if (num < 0) {
    return "The number is negative";
  } else {
    return "The number is zero";
  }
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));

// Exercise 5: Tuple Types
console.log("\n Exercise 5: Tuple Types");
function getDetails(name: string, age: number): [string, number, string] {
  let greeting = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, greeting];
}

let details = getDetails("Alice", 25);
console.log(details);

// Exercise 6: Object Type Annotations
console.log("\n Exercise 6: Object Type Annotations");
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return {
    name: name,
    age: age
  };
}

const person = createPerson("Alice", 25);
console.log(person);

// Exercise 7: Type Assertions
console.log("\n Exercise 7: Type Assertions");
// check index.html in browser

// Exercise 8: switch Statement with Complex Conditions
console.log("\n Exercise 8: switch Statement with Complex Conditions");
interface RoleDetails {
    action: string;
    permissions: string[];
}

function getAction(role: string): RoleDetails {
    switch (role.toLowerCase()) {
        case "admin":
            return {
                action: "Manage users and settings",
                permissions: ["read", "write", "delete", "manage"],
            };
        
        case "editor":
            return {
                action: "Edit content",
                permissions: ["read", "write", "publish"],
            };
        
        case "viewer":
            return {
                action: "View content",
                permissions: ["read"],
            };
        
        case "guest":
            return {
                action: "Limited access",
                permissions: ["read_public"],
            };
        
        default:
            return {
                action: "Invalid role",
                permissions: [],
            };
    }
}

console.log("Role details for admin:");
console.log(getAction("admin"));

// Exercise 9: Function Overloading with Default Parameters
// Function overload signatures (declarations)
function greet(): string;
function greet(name: string): string;

// Implementation signature
function greet(name?: string): string {
    if (name) {
        return `Hello, ${name}!`;
    } else {
        return "Hello, Guest!";
    }
}

// Test the overloaded function
console.log("\n Exercise 9: Function Overloading with Default Parameters");
console.log(greet());          
console.log(greet("Sarah"));    
console.log(greet("Bob"));



