import React, { useState, useEffect } from 'react';
import bitcoin from './bitcoin.png';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const savedCounter = localStorage.getItem('counter');
    if (savedCounter) {
      setCounter(parseInt(savedCounter));
    }
  }, []);

  const handleClick = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    localStorage.setItem('counter', newCounter);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitcoin Clicker</h1>
        <p>Bitcoins: {counter}</p>
        <img src={bitcoin} className="Bitcoin-logo" alt="bitcoin" onClick={handleClick} />
      </header>
    </div>
  );
}

export default App;
