-- Active: 1759060128087@@localhost@5432
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content) VALUES
('My First Post', 'This is the content of the first post.'),
('A Second Post', 'Here is another article for the blog.'),
('Express is Fun', 'Building APIs with Express and Postgres is great.');

