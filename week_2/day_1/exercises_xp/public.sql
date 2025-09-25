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
