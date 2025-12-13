/* Exercise 2: Events */  
import React, { useState } from 'react';

function Events() {
  // Part III: State for Toggle
  const [isToggleOn, setIsToggleOn] = useState(true);

  // Part I: Click Handler
  const clickMe = () => {
    alert('I was clicked');
  };

  // Part II: KeyDown Handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    }
  };

  // Part III: Toggle Handler
  const toggleState = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <h2>Exercise 2: Events</h2>
      
      {/* Part I */}
      <button onClick={clickMe}>Click Me  </button>
      <br /><br />

      {/* Part II */}
      <input 
        type="text" 
        onKeyDown={handleKeyDown} 
        placeholder="Press the ENTER key!" 
      />
      <br /><br />

      {/* Part III */}
      <button onClick={toggleState}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
      <p>Exercise 9: {isToggleOn ? 'ON' : 'OFF'}</p>
    </div>
  );
}

export default Events;