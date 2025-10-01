-- Active: 1759060128087@@localhost@5432@dvdrental
-- Exercise: 1: DVD rental
-- 1. Get a list of all the languages, from the language table.
SELECT * FROM language;

-- 2. Get a list of all films joined with their languages 
SELECT
    f.title AS film_title,
    f.description,
    l.name AS language_name
FROM
    film f
INNER JOIN
    language l ON f.language_id = l.language_id
LIMIT 10;

-- 3. Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.
SELECT
    f.title AS film_title,
    f.description,
    l.name AS language_name
FROM
    language l
LEFT JOIN
    film f ON l.language_id = f.language_id
LIMIT 20;

-- 4.Create a new table called new_film with the following columns : id, name. Add some new films to the table.
DROP TABLE IF EXISTS new_film CASCADE;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES
    ('The Big Lebowski'),
    ('Pulp Fiction'),
    ('Fargo');

-- 5. Create a new table called customer_review, which will contain film reviews that customers will make.
-- Drop the table first if it exists
DROP TABLE IF EXISTS customer_review;

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INTEGER CHECK (score BETWEEN 1 AND 10) NOT NULL,
    review_text TEXT,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

-- 6. Add 2 movie reviews to the customer_review table.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
SELECT id, 1, 'Dude Abides', 9, 'A truly outstanding and philosophical experience. The acting is superb.'
FROM new_film WHERE name = 'The Big Lebowski';

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
SELECT 2, language_id, 'Best Neo-Noir Ever', 10, 'A masterpiece of non-linear storytelling and unforgettable dialogue. A perfect score!'
FROM language
ORDER BY language_id
LIMIT 1;

SELECT * FROM customer_review;

-- 7. Delete a film that has a review from the new_film table, what happens to the customer_review table?
-- Before deletion, check the current state:
SELECT '--- BEFORE DELETION (new_film) ---' AS status;
SELECT * FROM new_film WHERE id = 1;
SELECT '--- BEFORE DELETION (customer_review) ---' AS status;
SELECT * FROM customer_review WHERE film_id = 1;

-- Execute the deletion of the film 'The Big Lebowski' (ID 1)
DELETE FROM new_film
WHERE id = 1;

-- After deletion, check the state of both tables:
SELECT '--- AFTER DELETION (new_film) ---' AS status;
SELECT * FROM new_film;
SELECT '--- AFTER DELETION (customer_review) ---' AS status;
SELECT * FROM customer_review;


