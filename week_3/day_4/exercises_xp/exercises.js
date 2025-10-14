// Exercise 1:
// setup the necessery elements
let article = document.getElementById('chocolate-article');
let h2 = article.querySelector('h2');
let h3 = article.querySelector('h3');
let boldButton = document.getElementById('bold-button');
let secondParagraph = document.getElementById('second-p');

// 1. Using a DOM property, retrieve the h1 and console.log it.
let h1 = article.querySelector('h1');
console.log('The h1 element:', h1);

// 2. Using DOM methods, remove the last paragraph in the <article> tag.
paragraphs = article.querySelectorAll('p');
   if (paragraphs.length > 0) {
      let lastParagraph = paragraphs[paragraphs.length - 1];
      article.removeChild(lastParagraph);
      console.log('Removed the last paragraph.');
   }

// 3. Add a event listener which will change the background color of the h2 to red, when it’s clicked on.
h2.addEventListener('click', function() {
   h2.classList.toggle('bg-red-500'); 
   h2.classList.toggle('text-white');
});

// 4. Add an event listener which will hide the h3 when it’s clicked on
h3.addEventListener('click', function() {
   h3.style.display = 'none'; 
});

// 5. Add a <button> to the HTML file, that when clicked on, should make the text of all the paragraphs, bold.
boldButton.addEventListener('click', function() {
   let currentParagraphs = article.querySelectorAll('p'); 
   currentParagraphs.forEach(p => {
      p.classList.toggle('font-bold'); 
   });
});

//6. BONUS : When you hover on the h1, set the font size to a random pixel size between 0 to 100.
h1.addEventListener('mouseover', function() {
   let randomSize = Math.floor(Math.random() * 101); 
   h1.style.fontSize = `${randomSize}px`;
   console.log(`h1 font size set to ${randomSize}px`);
});
h1.addEventListener('mouseout', function() {
   h1.style.fontSize = ''; // Reset
});

// 7. BONUS : When you hover on the 2nd paragraph, it should fade out 
secondParagraph.addEventListener('mouseover', function() {
   secondParagraph.classList.add('fade-out');
});

// Exercise 2
// 1. Retrieve the form and console.log it.
let form = document.getElementById('myForm');
console.log('Form Element Retrieved:', form);

//2. Retrieve the inputs by their id and console.log them.
let fnameInput = document.getElementById('fname');
let lnameInput = document.getElementById('lname');
console.log('Input (fname) by ID:', fnameInput);
console.log('Input (lname) by ID:', lnameInput);

//3. Retrieve the inputs by their name attribute and console.log them.
let firstnameByName = document.getElementsByName('firstname');
let lastnameByName = document.getElementsByName('lastname');
console.log('Input (firstname) by Name:', firstnameByName);
console.log('Input (lastname) by Name:', lastnameByName);
let usersAnswerList = document.getElementById('usersAnswerList');
let errorMessage = document.getElementById('error-message');

//4. When the user submits the form
form.addEventListener('submit', function(event) {
   event.preventDefault();
   errorMessage.classList.add('hidden');
   usersAnswerList.innerHTML = ''; 
   let firstNameValue = fnameInput.value.trim();
   let lastNameValue = lnameInput.value.trim();
   if (firstNameValue === '' || lastNameValue === '') {
      errorMessage.classList.remove('hidden');
      return; // Stop execution if fields are empty
      }
      console.log('4. Form Submitted Successfully with data:', { firstNameValue, lastNameValue });
      let createListItem = (label, value) => {
         let li = document.createElement('li');
         li.textContent = `${label} of the user: ${value}`;
         li.classList.add('text-gray-600', 'p-2', 'bg-indigo-50', 'rounded-md', 'shadow-sm', 'text-base', 'font-medium');
         return li;
      };
      let firstNameLi = createListItem('First Name', firstNameValue);
      let lastNameLi = createListItem('Last Name', lastNameValue);
      usersAnswerList.appendChild(firstNameLi);
      usersAnswerList.appendChild(lastNameLi);
   });

// Exercise 3:
// 1. Declare a global variable named allBoldItems.
let allBoldItems;
let sentenceParagraph = document.getElementById('sentence-paragraph');

// 2. Create a function called getBoldItems() that takes no parameter. This function should collect all the bold items inside the paragraph and assign them to the allBoldItems variable.
function getBoldItems() {
   allBoldItems = sentenceParagraph.querySelectorAll('strong');
   console.log('Bold Items collected:', allBoldItems);
}

// 3. Create a function called highlight() that changes the color of all the bold text to blue.
function highlight() {
   if (!allBoldItems) {
      getBoldItems(); 
   }
   allBoldItems.forEach(item => {
   item.style.color = 'blue';
   });
   console.log('Bold items highlighted (blue) on mouseover.');
}
// 4. Create a function called returnItemsToDefault() that changes the color of all the bold text back to black.
function returnItemsToDefault() {
   // Ensure the bold items list is populated
   if (!allBoldItems) {
      getBoldItems(); 
   }
   allBoldItems.forEach(item => {
   // Change color back to black (default)
   item.style.color = 'initial'; // Use 'initial' to revert to default text color
   });
   console.log('4. Bold items returned to default color (black) on mouseout.');
}
// Run this once to populate the list before the events fire
getBoldItems();
// 5. Call the functions on mouseover and mouseout events
sentenceParagraph.addEventListener('mouseover', highlight);
sentenceParagraph.addEventListener('mouseout', returnItemsToDefault);

