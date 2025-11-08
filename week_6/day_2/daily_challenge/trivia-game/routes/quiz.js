const express = require('express');
const router = express.Router();

// Sample hard-coded trivia questions
const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

const TOTAL_QUESTIONS = triviaQuestions.length;

// ------------------------------------
// --- Define Quiz Routes ---
// ------------------------------------

/**
 * GET /quiz
 * Start (or restart) the quiz.
 * Initializes score and question index in the session.
 */
router.get('/', (req, res) => {
  // Initialize session state
  req.session.score = 0;
  req.session.currentQuestionIndex = 0;

  // Send the first question (without the answer)
  res.json({
    message: "Quiz started!",
    question: triviaQuestions[0].question
  });
});

/**
 * POST /quiz
 * Submit an answer to the current question.
 */
router.post('/', (req, res) => {
  const { answer } = req.body;
  const { currentQuestionIndex, score } = req.session;

  // Check if quiz has been started
  if (currentQuestionIndex === undefined) {
    return res.status(400).json({ error: "Quiz not started. Please GET /quiz to begin." });
  }

  // Check if quiz is already over
  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    return res.status(400).json({ error: "Quiz is already finished. GET /quiz/score to see results." });
  }

  // --- Process the answer ---
  const currentQuestion = triviaQuestions[currentQuestionIndex];
  let feedback;

  if (answer && answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    // Correct answer
    req.session.score = (score || 0) + 1;
    feedback = "Correct!";
  } else {
    // Incorrect answer
    feedback = `Incorrect. The correct answer was: ${currentQuestion.answer}`;
  }

  // Move to the next question
  req.session.currentQuestionIndex = currentQuestionIndex + 1;

  // --- Check if the quiz is over ---
  if (req.session.currentQuestionIndex >= TOTAL_QUESTIONS) {
    // End of quiz
    res.json({
      feedback,
      message: "Quiz complete! GET /quiz/score to see your final score."
    });
  } else {
    // Send the next question
    res.json({
      feedback,
      nextQuestion: triviaQuestions[req.session.currentQuestionIndex].question
    });
  }
});

/**
 * GET /quiz/score
 * Display the user's final score.
 */
router.get('/score', (req, res) => {
  const { currentQuestionIndex, score } = req.session;

  // Check if quiz has been started
  if (currentQuestionIndex === undefined) {
    return res.status(400).json({ error: "Quiz not started. Please GET /quiz to begin." });
  }
  
  // Check if quiz is finished
  if (currentQuestionIndex < TOTAL_QUESTIONS) {
    return res.status(400).json({
      error: "Quiz is still in progress.",
      currentQuestion: currentQuestionIndex + 1,
      totalQuestions: TOTAL_QUESTIONS
    });
  }

  // Send final score
  res.json({
    message: "Quiz Finished!",
    finalScore: score,
    totalQuestions: TOTAL_QUESTIONS
  });

  // Optional: Clear the session after viewing the score
  // req.session.destroy(); 
});

module.exports = router;