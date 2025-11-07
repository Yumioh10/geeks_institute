document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Elements ---
  const scoreEl = document.getElementById('score');
  const emojiDisplayEl = document.getElementById('emoji-display');
  const optionsContainerEl = document.getElementById('options-container');
  const feedbackEl = document.getElementById('feedback');
  const nextButton = document.getElementById('next-button');
  const leaderboardListEl = document.getElementById('leaderboard-list');
  const leaderboardForm = document.getElementById('leaderboard-form');
  const nameInput = document.getElementById('name-input');

  // --- Tailwind CSS Class Lists ---
  const baseButtonClasses = "bg-gray-700 border border-transparent text-gray-200 p-4 text-base font-semibold rounded-lg cursor-pointer transition duration-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed".split(' ');
  const correctClasses = ['bg-teal-500', 'text-gray-900', 'border-teal-500'];
  const incorrectClasses = ['bg-red-500', 'text-gray-900', 'border-red-500', 'opacity-70'];
  const fadedClasses = ['opacity-40'];
  const feedbackBaseClasses = ['text-lg', 'font-semibold', 'min-h-[1.5em]', 'mt-5'];
  const feedbackCorrectClasses = ['text-teal-400'];
  const feedbackIncorrectClasses = ['text-red-400'];


  // --- Game State ---
  let score = 0;
  let awaitingGuess = true;

  // --- API Functions ---

  /**
   * Fetches a new game question from the server
   */
  async function getNewGame() {
    try {
      awaitingGuess = true;
      feedbackEl.textContent = '';
      feedbackEl.className = ''; // Clear classes
      feedbackEl.classList.add(...feedbackBaseClasses);
      nextButton.style.display = 'none';
      emojiDisplayEl.style.transform = 'scale(0.8)';

      const response = await fetch('/game');
      if (!response.ok) throw new Error('Could not fetch game');
      
      const game = await response.json();
      
      // Update UI
      emojiDisplayEl.textContent = game.emoji;
      emojiDisplayEl.style.transform = 'scale(1)';
      optionsContainerEl.innerHTML = ''; // Clear old options
      
      game.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = ''; // Clear classes
        button.classList.add(...baseButtonClasses);
        button.addEventListener('click', handleGuess);
        optionsContainerEl.appendChild(button);
      });

    } catch (error) {
      console.error(error);
      feedbackEl.textContent = 'Error loading game. Please refresh.';
      feedbackEl.className = 'feedback incorrect';
    }
  }

  /**
   * Handles the player clicking on an option button
   * @param {Event} e The click event
   */
  async function handleGuess(e) {
    if (!awaitingGuess) return; // Prevent multiple guesses
    awaitingGuess = false;

    const guess = e.target.textContent;
    const clickedButton = e.target;

    try {
      const response = await fetch('/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: guess }),
      });

      if (!response.ok) throw new Error('Could not submit guess');

      const result = await response.json();

      // Provide visual feedback
      if (result.correct) {
        score++;
        scoreEl.textContent = score;
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = '';
        feedbackEl.classList.add(...feedbackBaseClasses, ...feedbackCorrectClasses);
        clickedButton.classList.add(...correctClasses);
      } else {
        feedbackEl.textContent = `Wrong! The correct answer was "${result.correctAnswer}".`;
        feedbackEl.className = '';
        feedbackEl.classList.add(...feedbackBaseClasses, ...feedbackIncorrectClasses);
        clickedButton.classList.add(...incorrectClasses);
      }

      // Disable all buttons and show the correct one
      const allButtons = optionsContainerEl.querySelectorAll('button'); // More specific selector
      allButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === result.correctAnswer) {
            if (!result.correct) button.classList.add(...correctClasses);
        } else if (button !== clickedButton) {
            button.classList.add(...fadedClasses);
        }
      });
      
      // Show the 'Next' button
      nextButton.style.display = 'block';

    } catch (error) {
      console.error(error);
      feedbackEl.textContent = 'Error checking guess.';
      feedbackEl.className = 'feedback incorrect';
      awaitingGuess = true; // Allow retry if server failed
    }
  }

  /**
   * Fetches and displays the leaderboard
   */
  async function getLeaderboard() {
    try {
      const response = await fetch('/leaderboard');
      if (!response.ok) throw new Error('Could not fetch leaderboard');
      
      const leaderboard = await response.json();
      
      leaderboardListEl.innerHTML = ''; // Clear old list
      if (leaderboard.length === 0) {
          leaderboardListEl.innerHTML = '<li class="p-2 text-gray-400">No scores yet!</li>';
          return;
      }

      leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        const scoreSpan = document.createElement('span');
        
        // Add Tailwind classes for list items
        li.className = "flex justify-between text-lg p-3 rounded-md";
        if (index % 2 === 0) {
            li.classList.add("bg-gray-700"); // Zebra striping
        }
        
        nameSpan.textContent = entry.name;
        nameSpan.className = "font-semibold";
        scoreSpan.textContent = entry.score;
        
        li.appendChild(nameSpan);
        li.appendChild(scoreSpan);
        leaderboardListEl.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      leaderboardListEl.innerHTML = '<li class="p-2 text-red-400">Error loading scores.</li>';
    }
  }

  /**
   * Handles submitting a new score to the leaderboard
   * @param {Event} e The form submit event
   */
  async function handleLeaderboardSubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    
    if (!name || name.trim().length === 0) {
      alert('Please enter a name!');
      return;
    }

    try {
      const response = await fetch('/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, score: score }),
      });

      if (!response.ok) throw new Error('Could not save score');

      // Refresh leaderboard and reset score
      await getLeaderboard();
      score = 0;
      scoreEl.textContent = 0;
      nameInput.value = '';
      leaderboardForm.style.display = 'none'; // Hide form after submit
      alert('Score saved! Starting new game.');
      await getNewGame();
      leaderboardForm.style.display = 'flex'; // Show form again for next round

    } catch (error) {
      console.error(error);
      alert('Error saving score. Please try again.');
    }
  }

  // --- Event Listeners ---
  nextButton.addEventListener('click', getNewGame);
  leaderboardForm.addEventListener('submit', handleLeaderboardSubmit);

  // --- Initial Page Load ---
  getNewGame();
  getLeaderboard();
});