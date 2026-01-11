// Step 1: Get an Element from the DOM
const element = document.getElementById('myInput');

// Step 2: Use Type Assertion to cast to specific type
const inputElement = element as HTMLInputElement;

// Alternative type assertion syntax:
// const inputElement = <HTMLInputElement>element;

// Step 3: Access and manipulate the element's properties
inputElement.value = "Hello, TypeScript!";
inputElement.focus();
inputElement.style.border = "2px solid blue";

// Optional: Additional example with null check
const anotherElement = document.getElementById('myButton');

if (anotherElement) {
    const buttonElement = anotherElement as HTMLButtonElement;
    buttonElement.textContent = "Click Me!";
    buttonElement.disabled = false;
}

// Example with event handler using type assertion
const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log(`Input value changed to: ${target.value}`);
    
    // Now we can safely access input-specific properties
    const maxLength = target.maxLength; // This is specific to HTMLInputElement
    console.log(`Max allowed length: ${maxLength}`);
};

// Attach the event listener
inputElement.addEventListener('input', handleInputChange);