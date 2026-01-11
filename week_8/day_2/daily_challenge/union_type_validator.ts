/**
 * Validates if a value's type matches one of the allowed types
 * @param value - The value to check
 * @param allowedTypes - Array of allowed type names as strings
 * @returns true if the value's type is in the allowed types, false otherwise
 */
function validateUnionType(value: any, allowedTypes: string[]): boolean {
  // Get the actual type of the value using typeof
  const actualType = typeof value;
  
  // Check if the actual type is in the array of allowed types
  for (const allowedType of allowedTypes) {
    if (actualType === allowedType) {
      return true;
    }
  }
  
  return false;
}

// ========================================
// Demonstration and Testing
// ========================================

console.log("=== Union Type Validator Demo ===\n");

// Test 1: Validating a string
const name = "Alice";
const isValidString = validateUnionType(name, ["string", "number"]);
console.log(`Test 1: "${name}" is valid for types ["string", "number"]?`, isValidString);
// Expected: true

// Test 2: Validating a number
const age = 25;
const isValidNumber = validateUnionType(age, ["string", "number"]);
console.log(`Test 2: ${age} is valid for types ["string", "number"]?`, isValidNumber);
// Expected: true

// Test 3: Validating a boolean (should fail)
const isActive = true;
const isValidBoolean = validateUnionType(isActive, ["string", "number"]);
console.log(`Test 3: ${isActive} is valid for types ["string", "number"]?`, isValidBoolean);
// Expected: false

// Test 4: Validating a boolean (should pass)
const flag = false;
const isValidBooleanType = validateUnionType(flag, ["boolean", "object"]);
console.log(`Test 4: ${flag} is valid for types ["boolean", "object"]?`, isValidBooleanType);
// Expected: true

// Test 5: Validating an object
const user = { id: 1, name: "Bob" };
const isValidObject = validateUnionType(user, ["object", "function"]);
console.log(`Test 5: User object is valid for types ["object", "function"]?`, isValidObject);
// Expected: true

// Test 6: Validating undefined
const undefinedValue = undefined;
const isValidUndefined = validateUnionType(undefinedValue, ["undefined", "null"]);
console.log(`Test 6: undefined is valid for types ["undefined", "null"]?`, isValidUndefined);
// Expected: true

// Test 7: Validating a function
const myFunction = () => console.log("Hello");
const isValidFunction = validateUnionType(myFunction, ["function"]);
console.log(`Test 7: Function is valid for types ["function"]?`, isValidFunction);
// Expected: true

// Test 8: Type not in allowed list
const symbol = Symbol("test");
const isValidSymbol = validateUnionType(symbol, ["string", "number", "boolean"]);
console.log(`Test 8: Symbol is valid for types ["string", "number", "boolean"]?`, isValidSymbol);
// Expected: false

console.log("\n=== Practical Use Case ===\n");

// Practical example: Form input validation
function processFormInput(input: any): string {
  if (validateUnionType(input, ["string", "number"])) {
    return `Valid input: ${input}`;
  } else {
    return `Invalid input type: ${typeof input}. Expected string or number.`;
  }
}

console.log(processFormInput("John Doe"));
console.log(processFormInput(42));
console.log(processFormInput(true));
console.log(processFormInput({ name: "Test" }));