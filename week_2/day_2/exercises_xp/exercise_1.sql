-- 1.1 All items ordred by price (lowest to highest)
SELECT
   * FROM
   items
ORDER BY
   price ASC

-- 1.2 Items with a price above 80 (80 included), ordered by price (highest to lowest).
SELECT
   * FROM
   items
WHERE
   price >= 80
ORDER BY
   price DESC

-- 1.3 The first 3 customers in alphabetical order of the first name (A-Z) – exclude the primary key column from the results. 
SELECT
   first_name,
   last_name
FROM
   customers
ORDER BY
   first_name ASC
LIMIT 3;

-- 1.4 All last names (no other columns!), in reverse alphabetical order (Z-A)
SELECT
   last_name
FROM
   customers
ORDER BY 
   last_name DESC;