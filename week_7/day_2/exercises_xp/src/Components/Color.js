import React, { useState, useEffect } from 'react';

function Color() {
  // 1. State variable
  const [favoriteColor, setFavoriteColor] = useState("red");

  // 3. useEffect hook
  // This runs after every render. 
  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]); // Added dependency array so it alerts when color changes

  // 4. Change color function
  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h2>Exercise 4: useEffect</h2>
      <header>My Favorite Color is {favoriteColor}</header>
      <button onClick={changeColor}>Change to Blue</button>
    </div>
  );
}

export default Color;