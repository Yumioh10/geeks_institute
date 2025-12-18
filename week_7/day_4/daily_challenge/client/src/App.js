import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      inputValue: '',
      responseMessage: ''
    };
  }

  // Part I - Fetch message from Express server
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/hello');
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Handle input change
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  // Part II - POST request to Express server
  handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.state.inputValue })
      });
      
      const data = await response.json();
      this.setState({ 
        responseMessage: data.message,
        inputValue: '' 
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>{this.state.message}</h1>
        </header>
        
        <div className="form-container">
          <h2>Post to Server:</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              placeholder="Type something..."
            />
            <button type="submit">Submit</button>
          </form>
          
          {this.state.responseMessage && (
            <div className="response-message">
              <p>{this.state.responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;