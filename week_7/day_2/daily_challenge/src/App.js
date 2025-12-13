import React, { useState } from 'react';
import './App.css';

function App() {
  // Step 1: Initialize the state with the provided array
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 }, // Fixed spelling from prompt
    { name: "Java", votes: 0 }
  ]);

  // Step 2: Create the function to increase votes
  const vote = (index) => {
    // We must not mutate state directly. We create a copy first.
    const newLanguages = [...languages];
    
    // Increment the votes for the specific language at the clicked index
    newLanguages[index].votes++;
    
    // Update the state with the new array
    setLanguages(newLanguages);
  };

  return (
    <div className="App">
      <h1>Vote Your Language!</h1>
      <div className="languages-container">
        {
          /* Render the list using map */
          languages.map((lang, index) => (
            <div key={index} className="language-card">
              <div className="vote-count">
                {lang.votes}
              </div>
              <div className="language-name">
                {lang.name}
              </div>
              <button onClick={() => vote(index)}>
                Click Here
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;