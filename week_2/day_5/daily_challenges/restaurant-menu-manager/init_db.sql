-- Active: 1759060128087@@localhost@5432@restaurant_db

CREATE TABLE IF NOT EXISTS Menu_Items (
	item_id SERIAL PRIMARY KEY,
	item_name VARCHAR(30) NOT NULL,
	item_price SMALLINT DEFAULT 0
);

INSERT INTO Menu_Items (item_name, item_price) VALUES
('Burger', 35),
('Veggie Burger', 37);
