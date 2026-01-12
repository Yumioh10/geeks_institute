import { useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import Counter from './Counter';
import UserCard from './UserCard';
import UserList from './UserList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React + TypeScript</h1>

      {/* Using the Greeting component with properly typed props */}
      <Greeting name="Alice" messageCount={5} />
      <Greeting name="Bob" messageCount={1} />
      <Greeting name="Charlie" messageCount={0} />

      {/* Greeting components from Exercise 2 */}
      <Greeting name="Alice" messageCount={5} />

      {/* Counter component from Exercise 3 */}
      <Counter />
      <div>
        <h3>Scenario Testing</h3>

       {/* Partial info */}
      <UserCard name="Test User" />
  
      {/* Almost complete */}
      <UserCard name="John Doe" age={30} role="Developer" />
  
      {/* Complete profile */}
      <UserCard 
        name="Jane Smith" 
        age={28} 
        role="Senior Engineer" 
        email="jane@example.com"
        bio="Passionate about React and TypeScript"
      />
      </div>
      <div className="card">
        {/* UserList component from Exercise 5 */}
      <UserList />

      <h2>User Cards - Optional Props Demo</h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center'
      }}>
        <UserCard 
          name="Alice Johnson"
          age={28}
          role="Software Engineer"
          email="alice@example.com"
        />
        <UserCard 
          name="Bob Smith"
          role="Designer"
        />
        <UserCard />
      </div>

      <Greeting name="Alice" messageCount={5} />
      <Counter />
      
      <div className="card"></div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
