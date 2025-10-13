// 2.1. Retrive the div and console.log it
 
let containerDiv = document.getElementById("container");
console.log(containerDiv);

// 2.2 
/* Get all uls for easier access */
let allUls = document.querySelectorAll('ul.list');
let firstUl = allUls[0];
let secondUl = allUls[1];

/* Change the name 'Pete' to 'Richard */
let peteLi = firstUl.children[1];
        if (peteLi) {
            peteLi.textContent = "Richard";
            console.log(peteLi);
        }
/* 2.3 Delete the second <li> of the second <ul>.*/
let danLi = secondUl.children[1];
        if (danLi) {
            secondUl.removeChild(danLi);
            console.log(danLi);
        }

/* 2.4 Change the name of the first <li> of each <ul> to your name. (Hint : use a loop)*/
allUls.forEach((ul) => {
            let firstLi = ul.firstElementChild;
            if (firstLi) {
                firstLi.textContent = "Sarah";
            }
        });
        console.log(allUls);

/* 3. Using Javascript: 
1. Add a class called student_list to both of the <ul>'s */
allUls.forEach((ul) => {
            ul.classList.add("student_list");
        });

/* 2. Add the classes university and attendance to the first <ul>.*/
firstUl.classList.add("university", "attendance");
        console.log(firstUl);
      
/* 4. Using Javascript:
1. Add a “light blue” background color and some padding to the <div>.*/
containerDiv.style.backgroundColor = "lightblue";
        containerDiv.style.padding = "20px";

/* 2. Do not display the <li> that contains the text node “Dan”. (the last <li> of the first <ul>)*/

document.querySelectorAll('li').forEach(li => {
            if (li.textContent.trim() === 'Dan') {
                li.style.display = 'none';
            }
        });

/* 3. Add a border to the <li> that contains the text node “Richard”. (the second <li> of the <ul>)*/
document.querySelectorAll('li').forEach(li => {
            if (li.textContent.trim() === 'Richard') {
                li.style.border = '2px solid red';
                li.style.borderRadius = '5px';
            }
        });
      
/* 4. Change the font size of the whole body.*/
document.body.style.fontSize = "18px"; 

/* 5. Bonus: If the background color of the div is “light blue”, alert “Hello x and y” (x and y are the users in the div).*/
if (containerDiv.style.backgroundColor === 'lightblue') 
   {
      let userX = allUls[0].children[0].textContent; 
      let userY = allUls[0].children[1].textContent; 

      alert(`Hello ${userX} and ${userY}!`);
   }

