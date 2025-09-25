-- * create table
CREATE TABLE actors(
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    birth_date DATE NOT NULL,
    number_oscars SMALLINT NOT NULL
);

-- * drop table
DROP TABLE actors;

-- * insert single row
INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES('Matt', 'Damon', '08/10/1970', 5) RETURNING *;

INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES('George', 'Clooney', '06/05/1961', 2);

-- * insert multi rows
INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES ('Angelina', 'Jolie', '1975-06-04', 1),
    ('Jennifer', 'Aniston', '1969-02-11', 0);

-- * select all rows ORDER BY
SELECT *
FROM actors
ORDER BY actor_id DESC;

-- * select count of rows
SELECT COUNT(*)
FROM actors

-- * select all rows GROUP BY
SELECT first_name, COUNT(*)
FROM actors
GROUP BY first_name;

-- * select all rows GROUP BY with HAVING
SELECT first_name, COUNT(*)
FROM actors
GROUP BY first_name
HAVING COUNT(*) > 1;

-- * where clause (equality)
SELECT *
FROM actors
WHERE first_name = 'George';

-- * where clause (AND)
SELECT *
FROM actors
WHERE first_name = 'George' AND last_name = 'Clooney';

-- * where clause (OR)
SELECT *
FROM actors
WHERE first_name = 'George'
    OR first_name = 'Angelina';

-- * where clause (NOT)
SELECT *
FROM actors
WHERE NOT first_name = 'George';

-- * where clause LIKE (starts with)
SELECT *
FROM actors
WHERE first_name LIKE 'J%';

-- * where clause LIKE (ends with)
SELECT *
FROM actors
WHERE first_name LIKE '%a';

-- * where clause with LIKE (wildcard)
SELECT *
FROM actors
WHERE first_name LIKE '%a%';

-- * where clause with IN (list of values)
SELECT *
FROM actors
WHERE first_name IN ('George', 'Angelina');

-- * where clause with BETWEEN (date range)
SELECT *
FROM actors
WHERE birth_date BETWEEN '1970-01-01' AND '1979-12-31';

-- * update clause
UPDATE actors
SET number_oscars = 6
WHERE actor_id = 1
RETURNING *;

-- * delete clause
DELETE FROM actors
WHERE actor_id = 4
RETURNING *;

-- * truncate table
TRUNCATE TABLE actors RESTART IDENTITY;

-- * alter table (add column, drop column, rename column, rename table, change data type)
ALTER TABLE actors
ADD COLUMN email_address VARCHAR(100);

-- * alter table (drop column)
ALTER TABLE actors
DROP COLUMN email_address;

-- * alter table (rename column)
ALTER TABLE actors
RENAME COLUMN email_address TO is_verified;

-- * alter table (change data type)
ALTER TABLE actors
ALTER COLUMN is_verified TYPE BOOLEAN USING is_verified::boolean;

-- * alter table (rename table)
ALTER TABLE actors DROP COLUMN is_verified;

-- * alter table (rename table)
ALTER TABLE actors RENAME TO movie_actors;

-- * list columns
SELECT column_name, data_type, IS_NULLABLE
FROM information_schema.columns
WHERE table_name = 'actors';

-- * pagination (limit and offset)
SELECT *
FROM actors
ORDER BY actor_id
LIMIT 2 OFFSET 2;