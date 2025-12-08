import React, { Component } from 'react';
import './index.css'; // Importing the CSS file (Part III)

class Exercise extends Component {
  render() {
    // Part II: Style Object
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* Part I & II: H1 with style object */}
        <h1 style={style_header}>This is a Header</h1>

        {/* Part III: Paragraph with CSS class */}
        <p className="para">This is a paragraph with background styling.</p>

        {/* Part I: Remaining HTML tags */}
        <a href="https://reactjs.org">This is a link</a>
        
        <form>
            <label>Input:</label>
            <input type="text" />
        </form>

        <img src="https://via.placeholder.com/150" alt="Placeholder" />
        
        <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;