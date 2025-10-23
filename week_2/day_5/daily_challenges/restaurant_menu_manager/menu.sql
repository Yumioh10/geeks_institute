-- Active: 1759060128087@@localhost@5432@restaurant_db

DROP TABLE Menu_Items;

CREATE TABLE IF NOT EXISTS Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price NUMERIC(10, 2) NOT NULL
);

INSERT INTO Menu_Items (item_name, item_price) VALUES
    ('Burger', 35.00),
    ('Veggie Burger', 37.00),
    ('Beef Stew', 40.00);

SELECT * FROM Menu_Items

