import React from 'react';

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }

  render() {
    return (
      <header>
        <h1>Hello World!</h1>
      </header>
    );
  }
}

export default Child;