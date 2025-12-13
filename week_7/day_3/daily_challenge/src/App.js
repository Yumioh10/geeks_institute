import React, { useState } from "react";
import FormComponent from "./FormComponent";
import "./styles.css";

function App() {
  // 1. Create the stateful object to hold all form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    isNutsFree: false,
    isLactoseFree: false,
    isVegan: false
  });

  // 2. The handleChange function
  function handleChange(event) {
    // Retrieve target properties
    const { name, value, type, checked } = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        // 3. Ternary operator to check if it's a checkbox or standard input
        [name]: type === "checkbox" ? checked : value
      };
    });
  }

  return (
    // 4. Render the FormComponent and pass state + handler as props
    <FormComponent 
      handleChange={handleChange} 
      data={formData} 
    />
  );
}

export default App;