import { useState } from 'react';

type ActionType = 'increment' | 'decrement' | 'reset' | null;

interface CounterState {
  value: number;
  lastAction: ActionType;
  stepSize: number;
}

const Counter = () => {
  // Using an object for related state (alternative approach)
  const [counterState, setCounterState] = useState<CounterState>({
    value: 0,
    lastAction: null,
    stepSize: 1
  });

  const handleIncrement = (): void => {
    setCounterState(prev => ({
      ...prev,
      value: prev.value + prev.stepSize,
      lastAction: 'increment'
    }));
  };

  const handleDecrement = (): void => {
    setCounterState(prev => ({
      ...prev,
      value: prev.value - prev.stepSize,
      lastAction: 'decrement'
    }));
  };

  const handleReset = (): void => {
    setCounterState(prev => ({
      ...prev,
      value: 0,
      lastAction: 'reset'
    }));
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newStep = parseInt(event.target.value) || 1;
    setCounterState(prev => ({
      ...prev,
      stepSize: newStep
    }));
  };

  const getLastActionMessage = (): string => {
    switch (counterState.lastAction) {
      case 'increment':
        return `⬆️ Incremented by ${counterState.stepSize}`;
      case 'decrement':
        return `⬇️ Decremented by ${counterState.stepSize}`;
      case 'reset':
        return '🔄 Reset to 0';
      default:
        return '➡️ No action yet';
    }
  };

  return (
    <div style={{
      padding: '30px',
      border: '3px solid #646cff',
      borderRadius: '12px',
      margin: '20px',
      textAlign: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      <h2>Enhanced Counter Component</h2>
      
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#646cff'
      }}>
        {counterState.value}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="stepSize" style={{ marginRight: '10px' }}>
          Step Size:
        </label>
        <input
          id="stepSize"
          type="number"
          value={counterState.stepSize}
          onChange={handleStepChange}
          min="1"
          style={{
            padding: '5px 10px',
            fontSize: '16px',
            width: '80px'
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <button onClick={handleDecrement}>
          - Decrement
        </button>
        
        <button onClick={handleReset}>
          🔄 Reset
        </button>
        
        <button onClick={handleIncrement}>
          + Increment
        </button>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#242424',
        borderRadius: '8px',
        fontSize: '16px'
      }}>
        <strong>Last Action:</strong> {getLastActionMessage()}
      </div>
    </div>
  );
};

export default Counter;