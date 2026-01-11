// Exercise 6: Intersection Types and Type Guards
console.log('\n --- Exercise 6: Intersection Types and Type Guards ---');
// Define the Person type
type Person = {
  name: string;
  age: number;
};

// Define the Job type
type Job = {
  position: string;
  department: string;
};

// Create an intersection type that combines Person and Job
type Employee = Person & Job;

// Function that uses type guards to describe the employee
function describeEmployee(employee: Employee): string {
  // Type guard to check if the employee is a Manager
  if (employee.position === "Manager") {
    return `${employee.name} is a ${employee.age}-year-old Manager in the ${employee.department} department. They lead the team and make strategic decisions.`;
  }
  
  // Type guard to check if the employee is a Developer
  if (employee.position === "Developer") {
    return `${employee.name} is a ${employee.age}-year-old Developer in the ${employee.department} department. They write code and build applications.`;
  }
  
  // Default case for other positions
  return `${employee.name} is a ${employee.age}-year-old ${employee.position} in the ${employee.department} department.`;
}

// Test with Manager
const manager: Employee = {
  name: "Alice Johnson",
  age: 35,
  position: "Manager",
  department: "Engineering"
};

console.log("Manager:");
console.log(describeEmployee(manager));

// Test with Developer
const developer: Employee = {
  name: "Bob Smith",
  age: 28,
  position: "Developer",
  department: "Product"
};

console.log("\nDeveloper:");
console.log(describeEmployee(developer));

// Test with another position
const designer: Employee = {
  name: "Carol Williams",
  age: 30,
  position: "Designer",
  department: "UX"
};

console.log("\nOther position:");
console.log(describeEmployee(designer));

// Multiple employees test
console.log("\n--- Team Overview ---");
const team: Employee[] = [manager, developer, designer];

team.forEach(emp => {
  console.log(`\n${describeEmployee(emp)}`);
});

// Exercise 7: Type Assertions and Generic Constraints
console.log('\n --- Exercise 7: Type Assertions and Generic Constraints ---')
// Define an interface for types with a toString() method
interface HasToString {
  toString(): string;
}

// Generic function with constraint and type assertion
function formatInput<T extends HasToString>(input: T): string {
  // Convert to string using the toString() method
  const stringValue = input.toString();
  
  // Use type assertion to ensure it's treated as a string
  const formattedValue = stringValue as string;
  
  // Format the string (add brackets and make uppercase)
  return `[FORMATTED: ${formattedValue.toUpperCase()}]`;
}

// Test with number
console.log("Testing with number:");
console.log(formatInput(42)); // [FORMATTED: 42]

// Test with string
console.log("\nTesting with string:");
console.log(formatInput("hello world")); // [FORMATTED: HELLO WORLD]

// Test with boolean
console.log("\nTesting with boolean:");
console.log(formatInput(true)); // [FORMATTED: TRUE]

// Test with array
console.log("\nTesting with array:");
console.log(formatInput([1, 2, 3])); // [FORMATTED: 1,2,3]

// Test with object that has toString
console.log("\nTesting with Date:");
console.log(formatInput(new Date())); // [FORMATTED: DATE STRING]

// Custom object with toString method
class Product {
  constructor(public name: string, public price: number) {}
  
  toString(): string {
    return `${this.name} - $${this.price}`;
  }
}

console.log("\nTesting with custom object:");
const product = new Product("Laptop", 999);
console.log(formatInput(product)); // [FORMATTED: LAPTOP - $999]

// Alternative version with different formatting
function formatInputWithPrefix<T extends HasToString>(
  input: T,
  prefix: string = ">>>"
): string {
  const stringValue = input.toString() as string;
  return `${prefix} ${stringValue.trim()} <<<`;
}

console.log("\n--- Alternative formatting ---");
console.log(formatInputWithPrefix(123));
console.log(formatInputWithPrefix("TypeScript", "==="));
console.log(formatInputWithPrefix(false, "***"));