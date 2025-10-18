// Get references to the form and the output area
const form = document.getElementById('myForm');
const outputDiv = document.getElementById('output');

// Add an event listener for the form submission
form.addEventListener('submit', function(event) {
    // 1. Prevent the default form submission behavior (which causes a page reload)
    event.preventDefault();

    // 2. Retrieve the data from the inputs
    const nameInput = document.getElementById('name').value;
    const lastNameInput = document.getElementById('lastName').value;

    // 3. Create a JS object from the retrieved data
    const formDataObject = {
        name: nameInput,
        lastName: lastNameInput
    };

    // 4. Convert the JS object into a JSON string
    // The third argument (2) is used for pretty-printing (2 spaces for indentation)
    const jsonString = JSON.stringify(formDataObject, null, 2);

    // 5. Append the JSON string to the DOM

    // Clear previous content
    outputDiv.innerHTML = ''; 

    // Create a <pre> tag to preserve formatting (especially for pretty-printed JSON)
    const preElement = document.createElement('pre'); 
    
    // Set the text content to the JSON string
    preElement.textContent = jsonString;

    // Append the <pre> tag to the output div
    outputDiv.appendChild(preElement);

    // Optional: Reset the form fields
    form.reset();
});