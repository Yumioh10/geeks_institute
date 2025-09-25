-- SQL for the items table
CREATE TABLE public.items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
-- SQL for the customers table
CREATE TABLE public.customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- Insert data into items
INSERT INTO public.items (item_name, price) VALUES 
('Small Desk', 100.00),
('Large desk', 300.00),
('Fan', 80.00);

-- Insert data into customers
INSERT INTO public.customers (first_name, last_name) VALUES 
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

-- Select the inserted data to verify
SELECT * FROM public.items;
SELECT * FROM public.customers;

-- 1. Select all items
SELECT * FROM public.items;

-- 2. Select all the items with a price above 80 (80 not included).
SELECT * FROM items 
WHERE price > 80;

-- 3. All the items with a price below 300. (300 included)
SELECT * FROM items 
WHERE price <= 300;

-- 4. All customers whose last name is ‘Smith’
SELECT * FROM customers 
WHERE last_name = 'Smith';

-- 5. Select all customers whose last name is ‘Jones’.
SELECT * FROM customers 
WHERE last_name = 'Jones';

-- 6. Select all customers whose firstname is not ‘Scott’.
SELECT * FROM customers 
WHERE first_name <> 'Scott';
