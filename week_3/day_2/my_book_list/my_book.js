/* Exercise 7:
2. create an array called allBooks 
3. Initiate nitiate the array with 2 books*/
let allBooks = [
    {
        title: "Javascript all in one for dummies",
        author: "Chris Minnick",
        image: "https://m.media-amazon.com/images/I/51AthOb06jL._SX342_SY445_FMwebp_.jpg", 
        alreadyRead: false
    },
    {
        title: "Beginning Programming with Python For Dummies",
        author: "John Paul Mueller",
        image: "https://m.media-amazon.com/images/I/81Go-W5ZZzL._SL1500_.jpg",
        alreadyRead: true
    }
];

/* 4.1. */
let bookSection = document.querySelector('.listBooks');
allBooks.forEach(book => {
    
    let bookDiv = document.createElement('div');
    bookDiv.style.border = '1px solid #ccc';
    bookDiv.style.padding = '10px';
    bookDiv.style.margin = '10px 0';

    let detailsP = document.createElement('p');
    detailsP.textContent = `${book.title} written by ${book.author}`;
    
    let bookImg = document.createElement('img');
    bookImg.src = book.image;
    bookImg.style.width = '100px'; 
    bookImg.alt = book.title;

    if (book.alreadyRead) {
        detailsP.style.color = 'red';
        detailsP.textContent += ' (READ)'; // Optional: add a visual marker
    }

    bookDiv.appendChild(detailsP);
    bookDiv.appendChild(bookImg);
    
    bookSection.appendChild(bookDiv);
});

