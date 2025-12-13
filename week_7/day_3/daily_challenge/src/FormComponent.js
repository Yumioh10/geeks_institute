import React from "react";

function FormComponent(props) {
  return (
    <main>
      {/* Top Section: The Form */}
      <div className="form-container">
        <h1>Sample form</h1>
        <form>
          <input
            name="firstName"
            value={props.data.firstName}
            onChange={props.handleChange}
            placeholder="First Name"
          />
          <br />
          
          <input
            name="lastName"
            value={props.data.lastName}
            onChange={props.handleChange}
            placeholder="Last Name"
          />
          <br />
          
          <input
            name="age"
            value={props.data.age}
            onChange={props.handleChange}
            placeholder="Age"
          />
          <br />
          <br />

          {/* Radio Buttons */}
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={props.data.gender === "male"}
              onChange={props.handleChange}
            /> Male
          </label>
          <br />
          
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={props.data.gender === "female"}
              onChange={props.handleChange}
            /> Female
          </label>
          <br />

          {/* Select Dropdown */}
          <label className="destination-header">Select your destination</label>
          <br />
          <select
            name="destination"
            value={props.data.destination}
            onChange={props.handleChange}
          >
            <option value="">-- Please Choose a destination --</option>
            <option value="Japan">Japan</option>
            <option value="Germany">Germany</option>
            <option value="Norway">Norway</option>
          </select>
          <br />
          <br />

          {/* Checkboxes */}
          <label className="dietary-header">Dietary restrictions:</label>
          <br />
          
          <input
            type="checkbox"
            name="isNutsFree"
            checked={props.data.isNutsFree}
            onChange={props.handleChange}
          /> Nuts free
          <br />
          
          <input
            type="checkbox"
            name="isLactoseFree"
            checked={props.data.isLactoseFree}
            onChange={props.handleChange}
          /> Lactose free
          <br />
          
          <input
            type="checkbox"
            name="isVegan"
            checked={props.data.isVegan}
            onChange={props.handleChange}
          /> Vegan
          <br />
          <br />

          <button>Submit</button>
        </form>
      </div>

      <hr />

      {/* Bottom Section: The Output */}
      <div className="entered-info">
        <h2>Entered information:</h2>
        <p>Your name: {props.data.firstName} {props.data.lastName}</p>
        <p>Your age: {props.data.age}</p>
        <p>Your gender: {props.data.gender}</p>
        <p>Your destination: {props.data.destination}</p>
        <p>Your dietary restrictions:</p>
        
        <p>**Nuts free : {props.data.isNutsFree ? "Yes" : "No"}</p>
        <p>**Lactose free : {props.data.isLactoseFree ? "Yes" : "No"}</p>
        <p>**Vegan meal : {props.data.isVegan ? "Yes" : "No"}</p>
      </div>
    </main>
  );
}

export default FormComponent;