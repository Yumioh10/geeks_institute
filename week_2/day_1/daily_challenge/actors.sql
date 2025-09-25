CREATE TABLE actors(
	actor_id SERIAL PRIMARY KEY,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (100) NOT NULL,
	birth_date DATE NOT NULL,
	number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES('Matt', 'Damon', '08/10/1970', 5),
	('George', 'Clooney', '06/05/1961', 2),
	('Angelina', 'Jolie', '04/06/1975', 1),
	('Jennifer', 'Aniston', '11/02/1969', 0);
	
-- 1.Count the actors
SELECT 
    COUNT(*) AS total_actors
FROM 
    actors;

-- 2. Adding a New Actor with Blank Fields
INSERT INTO actors (last_name, birth_date, number_oscars)
VALUES('Leonardo', '11/11/1974', 1);

-- The outcome would be a Database Error / NOT NULL violation as we specify that NOT NULL value while creating the actors table.