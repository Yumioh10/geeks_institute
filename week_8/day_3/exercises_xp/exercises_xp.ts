// Exercise: Class with Access Modifiers
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}`;
  }
}

// Example usage:
console.log("--- Exercise 1: Class with Access Modifiers ---")
const employee = new Employee("John Doe", 50000, "Software Engineer", "IT");
console.log(employee.getEmployeeInfo()); 
console.log(employee.position); 
console.log(employee.name); 
console.log(employee.salary);
console.log(employee.department);

// Exercise 2: Readonly Properties in a Class
class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public getProductInfo(): string {
    return `id: ${this.id}, Product: $${this.name}, Price: $$${this.price}`;
  }
}

// Example usage:
const product = new Product(101, "Laptop", 999.99);

console.log("\n--- Exercise 2: Class Inheritance ---")
console.log(product.getProductInfo()); 
console.log(product.id); 
// Modifying public properties works fine
product.name = "Gaming Laptop";
product.price = 1299.99;
console.log(product.getProductInfo()); 
// Attempting to modify the readonly property
product.id = 102;

// Exercise 3: Class Inheritance
// Base class Animal
console.log("\n Exercise 3: Class Inheritance");
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some generic animal sound";
  }
}

// Subclass Dog that extends Animal
class Dog extends Animal {
  constructor(name: string) {
    super(name); // Call the parent class constructor
  }

  // Override the makeSound method
  makeSound(): string {
    return "bark";
  }
}

// Create an instance of Dog and call makeSound
const myDog = new Dog("Buddy");
console.log(`${myDog.name} says: ${myDog.makeSound()}`);

// Exercise 4: Static Properties and Methods
// Calculator class with static methods
console.log("\n--- Exercise 4: Static Properties and Methods ---")
class Calculator {
  // Static method to add two numbers
  static add(a: number, b: number): number {
    return a + b;
  }

  // Static method to subtract two numbers
  static subtract(a: number, b: number): number {
    return a - b;
  }
}

// Call static methods without creating an instance
console.log("Addition: 10 + 5 =", Calculator.add(10, 5));

console.log("Subtraction: 10 - 5 =", Calculator.subtract(10, 5));

console.log("Calculator.add(100, 50) =", Calculator.add(100, 50));
console.log("Calculator.subtract(75, 25) =", Calculator.subtract(75, 25));

// Exercise 5: Extending Interfaces with Optional and Readonly Properties
// Base interface User
console.log("\n --- Exercise 5: Extending Interfaces with Optional and Readonly Properties ---")
interface User {
  readonly id: number;  // readonly property - cannot be modified after creation
  name: string;
  email: string;
}

// Extended interface PremiumUser
interface PremiumUser extends User {
  membershipLevel?: string;  // optional property (note the ?)
}

// Function that accepts a PremiumUser and logs details
function printUserDetails(user: PremiumUser): void {
  console.log("=== User Details ===");
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  
  // Check if optional property exists before using it
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  } else {
    console.log("Membership Level: Not specified");
  }
  console.log("===================\n");
}

// Example 1: PremiumUser with membership level
const premiumUser1: PremiumUser = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  membershipLevel: "Gold"
};

printUserDetails(premiumUser1);

// Example 2: PremiumUser without membership level (optional property omitted)
const premiumUser2: PremiumUser = {
  id: 2,
  name: "Bob Smith",
  email: "bob@example.com"
};

printUserDetails(premiumUser2);

// Demonstrating readonly property
// premiumUser1.id = 999; // ❌ Error: Cannot assign to 'id' because it is a read-only property
premiumUser1.name = "Alice Williams";
console.log(`Updated name: ${premiumUser1.name}`);
