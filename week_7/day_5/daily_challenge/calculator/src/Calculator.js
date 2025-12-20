import { useState } from 'react';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);
  const [operation, setOperation] = useState('add');

  const calculate = () => {
    const n1 = parseFloat(num1) || 0;
    const n2 = parseFloat(num2) || 0;
    
    let calcResult;
    switch(operation) {
      case 'add':
        calcResult = n1 + n2;
        break;
      case 'subtract':
        calcResult = n1 - n2;
        break;
      case 'multiply':
        calcResult = n1 * n2;
        break;
      case 'divide':
        calcResult = n2 !== 0 ? n1 / n2 : 'Error';
        break;
      default:
        calcResult = 0;
    }
    
    setResult(calcResult);
  };

  const getOperationSymbol = () => {
    switch(operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-12">
          {operation === 'add' && 'Adding Two Numbers'}
          {operation === 'subtract' && 'Subtracting Two Numbers'}
          {operation === 'multiply' && 'Multiplying Two Numbers'}
          {operation === 'divide' && 'Dividing Two Numbers'}
        </h1>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 items-center">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-64 px-6 py-8 text-5xl font-bold text-purple-900 bg-purple-200 rounded-2xl text-center focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="0"
            />
            
            <span className="text-3xl text-purple-300 font-bold">
              {getOperationSymbol()}
            </span>
            
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-64 px-6 py-8 text-5xl font-bold text-purple-900 bg-purple-200 rounded-2xl text-center focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="0"
            />
          </div>
          
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="px-6 py-3 text-lg font-semibold text-purple-900 bg-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 cursor-pointer"
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
          </select>
          
          <button
            onClick={calculate}
            className="px-12 py-4 text-2xl font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Calculate!
          </button>
          
          <div className="mt-8">
            <div className="text-8xl font-bold text-white drop-shadow-lg">
              {typeof result === 'number' ? result.toFixed(2).replace(/\.?0+$/, '') : result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}