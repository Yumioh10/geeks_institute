import React from 'react';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';
import Color from './Color';
import Child from './Child';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true // For Exercise 3
    };
  }

  // Function to delete the Child component (Exercise 3)
  deleteHeader = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        {/* --- EXERCISE 1: Error Boundaries --- */}
        <h1>Exercise 1: Error Boundary Simulations</h1>
        
        <p><b>Simulation 1:</b> Two Counters inside the same Error Boundary.</p>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>

        <hr />

        <p><b>Simulation 2:</b> Two Counters, each inside their own Error Boundary.</p>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>

        <hr />

        <p><b>Simulation 3:</b> Counter without Error Boundary (This will crash the whole app if clicked 5 times).</p>
        <BuggyCounter />

        <hr style={{borderTop: "3px solid black", margin: "30px 0"}}/>

        {/* --- EXERCISE 2 & 3: Lifecycle --- */}
        <h1>Exercise 2 & 3: Lifecycle</h1>

        {/* Exercise 2: Color Component with Updating Lifecycle */}
        <Color />

        {/* Exercise 3: Unmounting Lifecycle */}
        {this.state.show && <Child />}
        
        <button onClick={this.deleteHeader}>
          Delete Header
        </button>
      </div>
    );
  }
}

export default App;