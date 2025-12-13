import React from 'react';

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: 'red'
    };
  }

  shouldComponentUpdate() {
    // Part I: If return false, component won't update (blue button won't work)
    return true; 
  }

  componentDidMount() {
    // Part II: Change color to yellow after mount
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Part III
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    // Part II
    console.log("after update");
  }

  changeToBlue = () => {
    this.setState({ favoriteColor: 'blue' });
  }

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeToBlue}>Change to Blue</button>
      </div>
    );
  }
}

export default Color;