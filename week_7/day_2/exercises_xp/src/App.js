// src/App.js
import React from 'react';
import './App.css';

// Import all components
import Car from './Components/Car';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';

function App() {
  // Exercise 1: Part I - Create Object
  const carInfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>React Exercises</h1>
      
      {/* Exercise 1 Render */}
      <Car carInfo={carInfo} />
      <hr />

      {/* Exercise 2 Render */}
      <Events />
      <hr />

      {/* Exercise 3 Render */}
      <Phone />
      <hr />

      {/* Exercise 4 Render */}
      <Color />
    </div>
  );
}

export default App;