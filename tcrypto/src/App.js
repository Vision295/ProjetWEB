import React, { useState, useEffect } from 'react';
import bitcoin from './tcrypto.png';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0); // State for the number of bitcoins
  const [bps, setBps] = useState(0); // State for bitcoins per second
  const [items, setItems] = useState([
    { name: 'ASIC Miner', cost: 10, count: 0, bps: 1 },
    { name: 'GPU Miner', cost: 100, count: 0, bps: 10 },
    { name: 'Mining Farm', cost: 1000, count: 0, bps: 100 },
  ]); // State for shop items

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
  }, [counter, items]); //runs this use effect whenever there is a change in one of these variables

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
    setCounter(prevCounter => prevCounter + 1);
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
          <h1>TClicker</h1>
          <p>Bitcoins: {counter}</p>
          <p>Bitcoins per second: {bps}</p>
          <img src={bitcoin} className="Bitcoin-logo" alt="bitcoin" onClick={handleClick} />
        </div>
        <div className="App-leaderboard">
          <h2>Leaderboard</h2>
          {/* Leaderboard items will go here */}
        </div>
      </header>
    </div>
  );
}

export default App;
