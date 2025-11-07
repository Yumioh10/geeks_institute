// Step 5: Require express and set up the app
const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data (needed for POST and PUT requests)
app.use(express.json());

// Step 6: Simulated database
let posts = [
    { id: 1, title: 'TypeScript Rewrote Itself in Go?!',
      content: 'Two weeks ago, Microsoft casually dropped a grenade into the dev world: We\'re porting the Typescript compiler from Javascript to Go. It\'s now 10x faster. That single sentence was enough to spark chaos. Reddit threads exploded,But before anyone could even benchmark it, the hype machine had already crowned Go the new king of compilers. Let\'s be clear: your React app didn\'t suddently get 10x faster. The compiler did the tool that turn .ts to js. Your runtime performance is still the same; your builds will just finish before you run out of coffee.' },
    { id: 2, title: 'How I Handle JWT Authentication in Express.js (Without the Headaches)',
      content: 'Authentication used to stress me out. Not because it\'s conceptually hard, but because every tutorial I found either oversimplified it to the point of being useless, or made it so complicated I needed a PhD to understand what was happening. After building several projects and breaking authentication in creative ways, I finally figured out a setup that actually works and doesn\'t make me want to throw my laptop out the window.' },
    { id: 3, title: 'The Senior React Mindset: 7 Shifts for Clean, Scalable Code',
      content: 'Learning React is more than just memorizing hooks and components. It\'s about adopting a new way of thinking about UI and application state. For new developers, this mental model shift is the single most important key to success. This guide will walk you through the 7 core mindset shifts you need to make to go from a React beginner to a confident, effective developer.' }
];

// Simple ID generator for new posts. Uses reduce for a robust initial ID calculation.
let nextId = posts.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1;

/**
 * 8. GET /posts: Get all posts
 */
app.get('/', (req, res) => {
    try {
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error while fetching posts.' });
    }
});

/**
 * 9. GET /posts/:id: Get a specific post
 */
app.get('/api/posts/:id', (req, res) => {
    // URL parameters are strings, so we convert to a number
    try {
        const id = parseInt(req.params.id);
        const post = posts.find(p => p.id === id);

        if (!post) {
            return res.status(404).json({ message: `Post with ID ${id} not found.` });
        }
        
        res.status(200).json(post);
    } catch (error) {
        // Catches non-404 errors like invalid ID format or server issues
        console.error('Error fetching specific post:', error);
        res.status(500).json({ message: 'Internal server error while fetching post.' });
    }
});

/**
 * 10. POST /posts: Create a new post
 */
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content } = req.body;

        // 1. Essential Validation
        if (!title || !content) {
            // Send 400 Bad Request immediately for missing data
            return res.status(400).json({ 
                message: 'Title and content fields are required for a new post.' 
            });
        }

        // 2. Synchronous Post Creation: Uses the globally defined 'nextId'
        const newPost = {
            // NOTE: nextId++ ensures unique, incremental IDs *per server run*.
            // If you restart the server, the ID counter resets as it's in-memory.
            id: nextId++, 
            title,
            content
        };
        posts.push(newPost); // Update the in-memory array

        // 3. Success Response
        res.status(201).json(newPost);

    } catch (error) {
        // Handle unexpected server errors (e.g., if JSON parsing failed)
        console.error('Error creating post:', error);

        res.status(500).json({
            message: 'An internal server error occurred while creating the post.',
            details: error.message
        });
    }
});

/**
 * 11. PUT /posts/:id: Update an existing post
 */
app.put('/api/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, content } = req.body;
        const postIndex = posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return res.status(404).json({ message: `Post with ID ${id} not found.` });
        }

        if (!title && !content) {
            return res.status(400).json({ message: 'At least one field (title or content) is required for update.' });
        }
        
        // Synchronous update
        posts[postIndex] = {
            ...posts[postIndex],
            title: title || posts[postIndex].title,
            content: content || posts[postIndex].content
        };

        res.status(200).json(posts[postIndex]);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error while updating post.' });
    }
});

/**
 * 12. DELETE /posts/:id: Delete a post
 */
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const initialLength = posts.length;

        // Synchronous delete
        posts = posts.filter(p => p.id !== id);

        if (posts.length === initialLength) {
             return res.status(404).json({ message: `Post with ID ${id} not found.` });
        }

        // 204 No Content for successful deletion
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error while deleting post.' });
    }
});

// --- Error Handling (Step 13) ---

/**
 * 13a. Error handling for invalid routes (404 Not Found)
 * This must be the last route defined.
 */
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route Not Found: ${req.method} ${req.originalUrl}`
    });
});

/**
 * 13b. Generic server error handler (500 Internal Server Error)
 * Express recognizes this as an error handler due to the four arguments (err, req, res, next).
 */
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).json({
        message: 'Something broke on the server!',
        error: err.message
    });
});

// --- Start Server (Step 14) ---

app.listen(PORT, () => {
    console.log(`🚀 Blog API server running at http://localhost:${PORT}`);
});