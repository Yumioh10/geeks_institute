
SELECT film.title, film.release_year, film.rating, language.language_id, language.name from film
INNER JOIN language
ON film.language_id = language.language_id;

-- UPDATE to change the language of some films
UPDATE film
SET language_id = (SELECT language_id FROM language WHERE name = 'Japanese')
WHERE language_id = (SELECT language_id FROM language WHERE name = 'English') AND rating = 'G';

-- 2. Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?
SELECT
    kcu.column_name AS foreign_key,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints AS tc
JOIN
    information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
JOIN
    information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
WHERE
    tc.table_name = 'customer' AND tc.constraint_type = 'FOREIGN KEY';
-- Effect on INSERT:
-- The foreign keys dictate that when inserting a new record into the customer table, the values provided for the store_id and address_id columns must already exist as valid primary key values in the store and address tables, respectively.
-- Requirement: You cannot create a customer without assigning them a valid, existing store (from the store table) and a valid, existing address (from the address table).
-- Error: If you attempt to INSERT a store_id or address_id that does not exist in the referenced tables, the operation will fail with a Foreign Key Violation error, preserving data integrity.

-- 3. Drop the table customer_review
-- DROP TABLE customer_review;
-- Dropping a table is not always an easy step and requires extra checking, particularly for a live application database.
-- Dependencies Check (The Primary Concern): The main check needed is to see if any other tables have Foreign Key constraints that reference the customer_review table. If they do, a simple DROP TABLE customer_review; command will likely fail because those dependent tables would be left referencing a non-existent table (a classic data integrity issue).
-- Solution: You would need to use DROP TABLE customer_review **CASCADE**; to automatically drop all dependent objects (like foreign keys in other tables) along with the table itself. This is often dangerous in production.
-- Data Loss: Dropping a table permanently deletes all its data. A backup, or at least a verification that the data is not needed, is mandatory.
-- Application Impact: Any application code, reports, or stored procedures that read from or write to customer_review will immediately break.

-- 4. Find out how many rentals are still outstanding
SELECT
    COUNT(rental_id) AS outstanding_rentals_count
FROM
    rental
WHERE
    return_date IS NULL;

-- 5. Find the 30 most expensive movies which are outstanding.
SELECT
    f.title,
    f.replacement_cost
FROM
    film AS f
JOIN
    inventory AS i ON f.film_id = i.film_id
JOIN
    rental AS r ON i.inventory_id = r.inventory_id
WHERE
    r.return_date IS NULL -- Outstanding rentals
ORDER BY
    f.replacement_cost DESC, -- Most expensive first
    f.title ASC             -- Tie-breaker
LIMIT 30;

-- 6.Find the 4 movies that he wants to rent.
-- 1. The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope Monroe.
SELECT
    f.title
FROM
    film AS f
JOIN
    film_actor AS fa ON f.film_id = fa.film_id
JOIN
    actor AS a ON fa.actor_id = a.actor_id
WHERE
    f.description ILIKE '%sumo wrestler%' -- Case-insensitive search
    AND a.first_name = 'Penelope'
    AND a.last_name = 'Monroe'
LIMIT 1;

-- 2. The 2nd film : A short documentary (less than 1 hour long), rated “R”.
SELECT
    f.title
FROM
    film AS f
JOIN
    film_category AS fc ON f.film_id = fc.film_id
JOIN
    category AS c ON fc.category_id = c.category_id
WHERE
    c.name = 'Documentary'
    AND f.length < 60
    AND f.rating = 'R'
LIMIT 1;

-- 3. The 3rd film : A film that his friend Matthew Mahan rented. He paid over $4.00 for the rental, and he returned it between the 28th of July and the 1st of August, 2005.
SELECT DISTINCT
    f.title
FROM
    film AS f
JOIN
    inventory AS i ON f.film_id = i.film_id
JOIN
    rental AS r ON i.inventory_id = r.inventory_id
JOIN
    customer AS c ON r.customer_id = c.customer_id
JOIN
    payment AS p ON r.rental_id = p.rental_id
WHERE
    c.first_name = 'Matthew'
    AND c.last_name = 'Mahan'
    AND p.amount > 4.00
    AND r.return_date >= '2005-07-28'::date
    AND r.return_date < '2005-08-02'::date -- Up to but not including Aug 2nd
LIMIT 1;

-- 4. The 4th film : His friend Matthew Mahan watched this film, as well. It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.
SELECT DISTINCT
    f.title, replacement_cost
FROM
    film AS f
JOIN
    inventory AS i ON f.film_id = i.film_id
JOIN
    rental AS r ON i.inventory_id = r.inventory_id
JOIN
    customer AS c ON r.customer_id = c.customer_id
WHERE
    c.first_name = 'Matthew'
    AND c.last_name = 'Mahan'
    AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY
    f.replacement_cost DESC
LIMIT 1;