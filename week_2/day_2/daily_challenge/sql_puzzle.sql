-- Active: 1758778841543@@localhost@5432@SQL Puzzle

CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
)

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar')

SELECT * FROM FirstTab

CREATE TABLE SecondTab (
    id integer 
)

INSERT INTO SecondTab VALUES
(5),
(NULL)

SELECT * FROM SecondTab

/*Q1: Predicted Output: The output will be 0.
     Explanation :
     Inner Subquery: SELECT id FROM SecondTab WHERE id IS NULL. 
     This subquery returns a set containing only the NULL value: (NULL).
     Outer Query: SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (NULL)
     The NOT IN operator compares the ft.id with every value returned by the subquery.
     When any comparison involves a NULL value in the NOT IN list, the comparison result is UNKNOWN.
     A WHERE clause only keeps rows where the condition is TRUE. Since the comparison is always UNKNOWN (because ft.id NOT IN (NULL) evaluates to ft.id != NULL), no rows will satisfy the condition.
     */
    
    SELECT COUNT(*) 
    FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL )

/* Q2: Predicted Output: The output will be 2 (rows for 'Sharlee' and 'Krish').
     Explanation:
     Inner Subquery: SELECT id FROM SecondTab WHERE id = 5
     This subquery returns a set containing only the value 5: (5).
     Outer Query: SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (5)
     The ft.id values will be checked against the list (5).
     ft.id = 5: 5 NOT IN (5) → FALSE (Discarded)
     ft.id = 6: 6 NOT IN (5) → TRUE (Kept)
     ft.id = 7: 7 NOT IN (5) → TRUE (Kept)
     ft.id = NULL: NULL NOT IN (5) → UNKNOWN (Discarded)
     */

    SELECT COUNT(*) 
    FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 )

/*Q3: Predicted Output: The output will be 0. This is the most crucial puzzle: when the NOT IN list contains NULL, the result is always 0 (unless the outer table itself has no data).
     Explanation:
     Inner Subquery: SELECT id FROM SecondTab
     This subquery returns a set containing 5 and NULL: (5, NULL).
     Outer Query: SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (5, NULL)
     The NOT IN operator is extremely sensitive to NULL. If the set of values contains even one NULL, the entire NOT IN logic breaks because every comparison results in UNKNOWN unless the value is found.
     For ft.id = 6, the comparison is: 6 != 5 (TRUE) AND 6 != NULL (UNKNOWN). TRUE AND UNKNOWN results in UNKNOWN.
     Since every comparison results in UNKNOWN (or FALSE, if ft.id is 5), no row will evaluate to TRUE.
     */
    
    SELECT COUNT(*) 
    FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab )

/*Q4: Predicted Output: The output will be 2 (rows for 'Sharlee' and 'Krish').
Explanation (Assumption):
     Inner Subquery: SELECT id FROM SecondTab WHERE id IS NOT NULL
     This subquery returns a set containing only the non-null value 5: (5).
     Outer Query: SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (5)
     This is identical to Question 2.
     ft.id = 5: 5 NOT IN (5) → FALSE (Discarded)
     ft.id = 6: 6 NOT IN (5) → TRUE (Kept)
     ft.id = 7: 7 NOT IN (5) → TRUE (Kept)
     ft.id = NULL: NULL NOT IN (5) → UNKNOWN (Discarded)
     */

    SELECT COUNT(*) 
    FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL )
