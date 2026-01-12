import React from 'react';

// Step 2: Define an interface for props
interface GreetingProps {
  name: string;
  messageCount: number;
}

// Step 3: Create the component using the defined props
const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div style={{ padding: '20px', border: '2px solid #646cff', borderRadius: '8px', margin: '20px' }}>
      <h2>Hello, {name}! 👋</h2>
      <p>You have {messageCount} {messageCount === 1 ? 'message' : 'messages'}.</p>
    </div>
  );
};

export default Greeting;
