/* Exercise 3: Phone and Components */
import React, { useState } from 'react';

function Phone() {
  // Part I: State Object
  const [phoneInfo, setPhoneInfo] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020
  });

  // Part II: Change Color Function
  const changeColor = () => {
    // We use the spread operator (...prev) to keep existing properties
    // and only overwrite the color.
    setPhoneInfo(prev => ({ ...prev, color: "blue" }));
  };

  return (
    <div>
      <h2>Exercise 3: Phone</h2>
      <p>
        My phone is a {phoneInfo.brand}.<br />
        It is a {phoneInfo.color} {phoneInfo.model} from {phoneInfo.year}.
      </p>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Phone;