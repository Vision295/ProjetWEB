import React, { useState, useEffect } from 'react';
import bitcoin from './bitcoin.png';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0); // State for the number of bitcoins
  const [bps, setBps] = useState(0); // State for bitcoins per second
  const [items, setItems] = useState([
    { name: 'ASIC Miner', cost: 10, count: 0, bps: 1 },
    { name: 'GPU Miner', cost: 100, count: 0, bps: 10 },
    { name: 'Mining Farm', cost: 1000, count: 0, bps: 100 },
  ]); // State for shop items
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State for options modal
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [clickValue, setClickValue] = useState(1); // BTC per click
  const [clickAnimation, setClickAnimation] = useState(false); // State for "+X" animation
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 }); // Position for animation

  // Load the counter and items from localStorage when the component mounts
  useEffect(() => {
    const savedCounter = localStorage.getItem('counter');
    if (savedCounter) {
      setCounter(parseInt(savedCounter));
    }
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save the counter and items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('counter', counter);
    localStorage.setItem('items', JSON.stringify(items));
  }, [counter, items]);

  // Increment counter based on the number of items every second
  useEffect(() => {
    const interval = setInterval(() => {
      const totalBps = items.reduce((sum, item) => sum + item.count * item.bps, 0);
      setCounter(prevCounter => prevCounter + totalBps);
      setBps(totalBps);
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [items]);

  // Handle click event on the Bitcoin logo
  const handleClick = () => {
    setCounter(prevCounter => prevCounter + clickValue);

    // Generate random position around the logo
    const randomTop = Math.random() * 40 - 20; // Random value between -20 and 20
    const randomLeft = Math.random() * 40 - 20; // Random value between -20 and 20
    setAnimationPosition({ top: randomTop, left: randomLeft });

    setClickAnimation(true); // Trigger animation
    setTimeout(() => setClickAnimation(false), 300); // Remove animation after 300ms
  };

  // Handle buying an item
  const handleBuyItem = (index) => {
    const item = items[index];
    if (counter >= item.cost) {
      const newCounter = counter - item.cost;
      const newItems = [...items];
      newItems[index] = {
        ...item,
        count: item.count + 1,
        cost: item.cost * 2, // Increase cost for next purchase
      };
      setCounter(newCounter);
      setItems(newItems);
    }
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode); // Toggle dark mode class on body
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-shop">
          <h2>Shop</h2>
          {items.map((item, index) => (
            <div key={index} className="shop-item">
              <p>{item.name}</p>
              <p>Cost: {item.cost} BTC</p>
              <p>Count: {item.count}</p>
              <p>BPS: {item.bps}</p> {/* Add BPS information */}
              <button onClick={() => handleBuyItem(index)}>Buy</button>
            </div>
          ))}
        </div>
        <div className="App-main">
          <button className="DarkMode-button" onClick={toggleDarkMode}>
            {isDarkMode ? 'Day Mode' : 'Night Mode'}
          </button>
          <h1>TClicker</h1>
          <p>Bitcoins: {counter}</p>
          <p>Bitcoins per second: {bps}</p>
          <div className="Bitcoin-container">
            <img
              src={bitcoin}
              className="Bitcoin-logo"
              alt="bitcoin"
              onClick={handleClick}
            />
            {clickAnimation && (
              <span
                className="Click-animation"
                style={{
                  top: `${animationPosition.top}px`,
                  left: `${animationPosition.left}px`,
                }}
              >
                +{clickValue}
              </span>
            )}
          </div>
        </div>
        <div className="App-leaderboard">
          <h2>Leaderboard</h2>
          {/* Leaderboard items will go here */}
        </div>
      </header>
      {isOptionsOpen && (
        <div className="Options-modal">
          <div className="Options-content">
            <h2>Settings</h2>
            <p>Adjust your preferences here:</p>
            <label>
              <input type="checkbox" /> Enable sound
            </label>
            <label>
              <input type="checkbox" /> Dark mode
            </label>
            <button onClick={toggleOptions}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;