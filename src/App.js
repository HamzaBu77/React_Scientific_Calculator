import React, { useState } from 'react';
import './App.css';
import * as math from 'mathjs';

function App() {
  const [expression, setExpression] = useState('');
  const [screenVal, setScreenVal] = useState('');
  const [customVariables, setCustomVariables] = useState({});

  function handleChange(e) {
    setExpression(e.target.value);
  }

  function handleClick(input) {
    setExpression((prevExpression) => prevExpression + input);
  }

  function calculate() {
    try {
      const allVariables = { ...customVariables, pi: 3.1415, e: 2.7182 };
      const result = math.evaluate(expression, allVariables);
      if (typeof result === 'number' && !isNaN(result)) {
        setScreenVal(Number(result).toFixed(4));
      } else {
        setScreenVal('Error: Invalid expression');
      }
    } catch (error) {
      setScreenVal('Error: Invalid expression');
    }
  }

  function clearScreen() {
    setExpression('');
    setScreenVal('');
  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  function addCustomVariable(variableName, variableValue) {
    if (/^[a-zA-Z]$/.test(variableName)) {
      setCustomVariables({ ...customVariables, [variableName]: variableValue });
    }
  }

  return (
    <>
      <div className="App">
        <div className="calc-body">
          <input className="screen" type="text" value={expression} onChange={handleChange} />
          <div className="output">Output: {screenVal}</div>
          <div className="buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '(', ')', 'sqrt(', 'sin(', 'cos(', 'tan(', '^', 'x', 'y', 'z', ...'abcdefghijklmnopqrstuvwxyz'].map(
              (input) => {
                return <button key={input} onClick={() => handleClick(input)}>{input}</button>;
              }
            )}

            <button onClick={() => { backspace() }}>del</button>
            <button onClick={() => { clearScreen() }}>C</button>
            <button onClick={() => calculate()}>=</button>
          </div>
        </div>
        <div className="variables">
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map((variableName, index) => (
            <div key={variableName} className="fields">
              <span>{variableName}:</span>
              <input
                type="number"
                value={customVariables[variableName] || ''}
                onChange={(e) => addCustomVariable(variableName, parseFloat(e.target.value))}
              />
              {index % 5 === 4 && <div style={{ width: '100%' }} />}
            </div>
          ))}
        </div>


      </div>
    </>
  );
}

export default App;
