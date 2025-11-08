const express = require('express');
const session = require('express-session');
const quizRoutes = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===

// 1. To parse JSON bodies from POST requests
app.use(express.json());

// 2. To manage user sessions
// This is essential for tracking score and question progress
app.use(session({
  secret: 'your_secret_key_here', // Change this to a random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// === Mount the Router ===
// All routes in quiz.js will be prefixed with /quiz
app.use('/quiz', quizRoutes);

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Quiz server running on http://localhost:${PORT}`);
});