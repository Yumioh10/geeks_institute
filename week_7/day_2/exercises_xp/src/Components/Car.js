/* Exercise 1: Car and Components */
import React, { useState } from 'react';
import Garage from './Garage';

function Car(props) {
  // Part II: useState Hook
  const [color, setColor] = useState("red"); 

  // We access the carInfo object via props.carInfo
  return (
    <div>
      <h2>Exercise 1: Car</h2>
      <header>
        This car is a {color} {props.carInfo.model}
      </header>
      
      {/* Part III: Garage inside Car */}
      <Garage size="small" />
    </div>
  );
}

export default Car;