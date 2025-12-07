import logo from './logo.svg';
import UserFavoriteAnimals from './UserFavoriteAnimals.js';
import './App.css';
import Exercise from './Exercise3.js'

// Exercise 2 Data
const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey']
};

function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Exercise 1</h2>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
        <hr />

        <h2>Exercise 2</h2>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        {/* Passing the array as a prop named "favAnimals" */}
        <UserFavoriteAnimals favAnimals={user.favAnimals} />

       <h2>Exercise 3</h2> 
       <Exercise />
    </div>
  );
}

export default App;
