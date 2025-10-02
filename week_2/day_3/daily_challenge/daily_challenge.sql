-- Active: 1759060128087@@localhost@5432@tables_Relationships
-- Part I:
-- 1. Create Tables: Customer and Customer profile
CREATE TABLE customer (
   customer_id SERIAL PRIMARY KEY,
   first_name VARCHAR (50) NOT NULL,
   last_name VARCHAR (50) NOT NULL
);

CREATE TABLE customer_profile (
   profile_id SERIAL PRIMARY KEY,
   isLoggedIn BOOLEAN DEFAULT false,
   customer_id INTEGER UNIQUE REFERENCES customer (customer_id)
);

-- 2. Insert those customers
INSERT INTO customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- 3. Insert those customer profiles
INSERT INTO customer_profile (isLoggedIn, customer_id) VALUES
(true, (SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe')),
(false, (SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

-- 4. Display Data (Using Joins)
-- Display the first name of customers who are logged in
SELECT
    customer.first_name 
FROM
    customer
INNER JOIN
    customer_profile ON customer.customer_id = customer_profile.customer_id
WHERE
    customer_profile.isLoggedIn = TRUE;

-- Display all customers' first_name and isLoggedIn columns - even those who don’t have a profile
SELECT
    customer.first_name,
    customer_profile.isLoggedIn
FROM
    customer
LEFT JOIN
    customer_profile ON customer.customer_id = customer_profile.customer_id;

-- Display The number of customers that are not LoggedIn
SELECT
    COUNT(customer.customer_id) AS NotLoggedIn_Customer_Count
FROM
    customer
LEFT JOIN
    customer_profile ON customer.customer_id = customer_profile.customer_id
WHERE
    customer_profile.isLoggedIn = FALSE OR customer_profile.customer_id IS NULL;

-- Part II: 
-- 1. Create a table named Book, with the columns : book_id SERIAL PRIMARY KEY, title NOT NULL, author NOT NULL
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- 2. Insert those books
INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- 3. Create a table named Student, with the columns : student_id SERIAL PRIMARY KEY, name NOT NULL UNIQUE, age. Make sure that the age is never bigger than 15 (Find an SQL method);
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

-- 4. Insert those students
INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- 5. Create a table named Library, with the columns 
CREATE TABLE Library (
    book_fk_id INTEGER REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id) -- The pair of Foreign Keys is the Primary Key
); 

-- 6. Add 4 records in the junction table, use subqueries
INSERT INTO Library (student_fk_id, book_fk_id, borrowed_date)
SELECT Student.student_id, Book.book_id, '2022-02-15'::DATE FROM Student, Book WHERE Student.name = 'John' AND Book.title = 'Alice In Wonderland'
UNION ALL
SELECT Student.student_id, Book.book_id, '2021-03-03'::DATE FROM Student, Book WHERE Student.name = 'Bob' AND Book.title = 'To kill a mockingbird'
UNION ALL
SELECT Student.student_id, Book.book_id, '2021-05-23'::DATE FROM Student, Book WHERE Student.name = 'Lera' AND Book.title = 'Alice In Wonderland'
UNION ALL
SELECT Student.student_id, Book.book_id, '2021-08-12'::DATE FROM Student, Book WHERE Student.name = 'Bob' AND Book.title = 'Harry Potter';

-- 7. Display the data 
SELECT
    *
FROM
    Library;

--Select the name of the student and the title of the borrowed books
SELECT
    Student.name AS student_name,
    Book.title AS book_title,
    Library.borrowed_date
FROM
    Library
INNER JOIN
    Student ON Library.student_fk_id = Student.student_id
INNER JOIN
    Book ON Library.book_fk_id = Book.book_id
ORDER BY
    student_name, book_title;

-- Select the average age of the children, that borrowed the book Alice in Wonderland
SELECT
    AVG(Student.age) AS average_age_borrowing_AIW
FROM
    Student
INNER JOIN
    Library ON Student.student_id = Library.student_fk_id
INNER JOIN
    Book ON Library.book_fk_id = Book.book_id
WHERE
    Book.title = 'Alice In Wonderland';

-- Delete a student from the Student table, what happened in the junction table?
DELETE FROM Student WHERE name = 'John';

-- 
SELECT * FROM Library; -- Check the remaining records