import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    // Accessing the array passed via props
    const { favAnimals } = this.props;

    return (
      <ul>
        {favAnimals.map((animal, index) => (
          // Using index as the key as requested
          <li key={index}>{animal}</li>
        ))}
      </ul>
    );
  }
}

export default UserFavoriteAnimals;