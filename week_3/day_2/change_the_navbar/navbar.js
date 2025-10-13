// Exercise 6: Change the navbar 
//2. Using Javascript, in the <div>, change the value of the id attribute from navBar to socialNetworkNavigation, using the setAttribute method.
let navBarDiv = document.getElementById('navBar');
navBarDiv.setAttribute('id', 'socialNetworkNavigation');
console.log(navBarDiv.id);

//3.1. First, create a new <li> tag (use the createElement method).
let ulElement = document.querySelector('#socialNetworkNavigation ul');
let newLi = document.createElement('li');

// 3.2. Create a new text node with “Logout” as its specified text.
let logoutText = document.createTextNode('Logout');

// 3.3. Append the text node to the newly created list node (<li>).
newLi.appendChild(logoutText);

// 3.4. Finally, append this updated list node to the unordered list (<ul>), using the appendChild method.
ulElement.appendChild(newLi);
console.log(ulElement.outerHTML);

// 4. Display the text of each link.
   let firstLi = ulElement.firstElementChild;
let lastLi = ulElement.lastElementChild;
let firstLinkText = firstLi.firstElementChild ? firstLi.firstElementChild.textContent : firstLi.textContent;
let lastLinkText = lastLi.textContent;
console.log(firstLinkText); 
console.log(lastLinkText);
