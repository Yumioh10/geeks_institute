-- Active: 1758778841543@@localhost@5432@dvdrental
-- 1. select all the columns from the “customer” table.
SELECT * FROM customer;

-- 2. Get the names (first_name, last_name) using an alias named “full_name”
SELECT CONCAT (first_name,' ',last_name) 
AS full_name
FROM customer;

-- Get all the create_date from the “customer” table (with no duplication)
SELECT DISTINCT create_date FROM customer;

-- 4. Get all the customer details from the customer table in descending order by their first name.
SELECT * FROM customer
ORDER BY first_name DESC;

-- 5. Get the film ID, title, description, year of release and rental rate in ascending order according to their rental rate.
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC

-- 6. Get the address, and the phone number of all customers living in the Texas district
SELECT address, phone FROM address
WHERE district = 'Texas';

-- 7. Retrieve all movie details where the movie id is either 15 or 150
SELECT * FROM film
WHERE film_id IN (15, 150);

-- 8. Check if a favorite movie exists.
SELECT film_id, title, description, length, rental_rate FROM film
WHERE title = 'Dragon Squad'

-- 9. get the film ID, title, description, length and the rental rate of all the movies starting with the two first letters of your favorite movie
SELECT film_id, title, description, length, rental_rate FROM film
WHERE title LIKE 'Dr%';

-- 10. get 10 cheapest movies
SELECT * FROM film
ORDER BY replacement_cost ASC
LIMIT 10;

-- 11. get the next 10 cheapest movies.
SELECT * FROM film
ORDER BY replacement_cost ASC
LIMIT 10 OFFSET 10;

-- 12. get the first name and last name from the customer table, as well as the amount and the date of every payment made by a customer, ordered by their id 
SELECT 
   customer.customer_id,
   customer.first_name, 
   customer.last_name, 
   payment.amount, 
   payment.payment_date
FROM
   customer
INNER JOIN
   payment AS payment ON customer.customer_id = payment.customer_id
ORDER BY customer.customer_id

-- 13. check your inventory and write a query to get all the movies which are not in inventory
SELECT film.film_id, film.title, inventory.inventory_id
FROM film
LEFT JOIN inventory ON inventory.film_id = film.film_id
WHERE inventory.inventory_id IS NULL;

-- 14- Find which city is in which country
SELECT
   city.city,
   country.country
FROM
   city
JOIN 
   country ON city.country_id = country.country_id;

-- 15. Bonus: Get customer details and payment data ordered by staff member
SELECT
   c.customer_id,
   c.first_name,
   c.last_name,
   p.amount,
   p.payment_date
FROM
   customer AS c
INNER JOIN
   payment AS p ON c.customer_id = p.customer_id
ORDER BY
   p.staff_id, c.customer_id;