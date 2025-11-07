const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));
// Middleware to parse JSON bodies (for our POST request)
app.use(express.json());

// --- Game Data ---

// A simple in-memory leaderboard. In a real app, you'd use a database.
let leaderboard = [
  { name: 'Sarah', score: 10 },
  { name: 'Meriama', score: 8 },
  { name: 'Soufiane', score: 5 },
];

const emojis = [
  { emoji: '😀', name: 'Grinning' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🌍', name: 'Earth' },
  { emoji: '🎉', name: 'Party Popper' },
  { emoji: '❤️', name: 'Heart' },
  { emoji: '🥑', name: 'Avocado' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🤖', name: 'Robot' },
  { emoji: '👾', name: 'Alien Monster' },
  { emoji: '👻', name: 'Ghost' },
  { emoji: '👑', name: 'Crown' },
  { emoji: '🎩', name: 'Top Hat' },
  { emoji: '🧠', name: 'Brain' },
  { emoji: '🦄', name: 'Unicorn' },
  { emoji: '🐳', name: 'Whale' },
  { emoji: '🌻', name: 'Sunflower' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '💡', name: 'Light Bulb' }
];

// This will store the correct answer for the *current* question
// This is a simple server-side "session" for this demo.
let currentCorrectAnswer = '';

// --- Helper Functions ---

/**
 * Shuffles an array in place.
 * @param {Array} array The array to shuffle.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// --- API Endpoints ---

/**
 * GET /game
 * Provides a new game question.
 */
app.get('/game', (req, res) => {
  // Shuffle the entire emoji list to pick random ones
  const shuffledEmojis = [...emojis];
  shuffle(shuffledEmojis);

  // Pick 4 emojis from the shuffled list
  const gameOptions = shuffledEmojis.slice(0, 4);
  
  // Designate the first one as the correct answer
  const correctEmoji = gameOptions[0];
  currentCorrectAnswer = correctEmoji.name;

  // Get just the names for the options
  const options = gameOptions.map(item => item.name);
  
  // Shuffle the options so the correct answer isn't always first
  shuffle(options);

  // Send the question to the client
  res.json({
    emoji: correctEmoji.emoji,
    options: options
  });
});

/**
 * POST /guess
 * Checks the player's guess against the correct answer.
 */
app.post('/guess', (req, res) => {
  const { guess } = req.body;

  if (!guess) {
    return res.status(400).json({ error: 'Guess is required' });
  }

  const isCorrect = (guess === currentCorrectAnswer);
  
  res.json({
    correct: isCorrect,
    correctAnswer: currentCorrectAnswer
  });
});

/**
 * GET /leaderboard
 * Returns the current leaderboard.
 */
app.get('/leaderboard', (req, res) => {
  // Sort the leaderboard by score, descending
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
  res.json(sortedLeaderboard.slice(0, 10)); // Send top 10
});

/**
 * POST /leaderboard
 * Adds a new score to the leaderboard.
 */
app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Name and score are required' });
  }

  leaderboard.push({ name: name.trim(), score: score });
  res.json({ success: true, message: 'Score added!' });
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Emoji Guessing Game server listening at http://localhost:${port}`);
});