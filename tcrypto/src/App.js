import React, { useState, useEffect } from 'react';
import bitcoin from './bitcoin.png';
import './App.css';

function App() {

  // Balance states
  const [USD, setUSD] = useState(1000000); // USD balance (United States Dollar, initial balance: $1,000,000) 
  const [BTC, setBTC] = useState(0); // BTC balance (Bitcoin)
  const [ETH, setETH] = useState(0); // ETH balance (Ethereum)
  const [BNB, setBNB] = useState(0); // BNB balance (Binance Coin)
  const [LTC, setLTC] = useState(0); // LTC balance (Litecoin)
  const [SOL, setSOL] = useState(0); // SOL balance (Solana)
  const [USDT, setUSDT] = useState(0); // USDT balance (Tether)
  const [DOGE, setDOGE] = useState(0); // DOGE balance (Dogecoin)
  const [cryptos, setCryptos] = useState([
    { name: 'BitCoin', price: 100000, quantity: 0 },
    { name: 'Ethereum', price: 10000, quantity: 0 },
    { name: 'BinanceCoin', price: 1000, quantity: 0 },
    { name: 'LiteCoin', price: 100, quantity: 0 },
    { name: 'Solana', price: 10, quantity: 0 },
    { name: 'Tether', price: 1, quantity: 0 },
    { name: 'DogeCoin', price: 0.1, quantity: 0 },
  ]); // List of cryptos with prices and quantities

  // Mining & shop states  
  const [bps, setBps] = useState(0); // BTC production per second
  const [clickValue, setClickValue] = useState(1); // BTC per click
  const [items, setItems] = useState([
    { name: 'ASIC Miner', cost: 10, count: 0, bps: 0.001 },
    { name: 'GPU Miner', cost: 100, count: 0, bps: 0.004 },
    { name: 'Mining Slave', cost: 1000, count: 0, bps: 0.01 },
    { name: 'Mining Farm', cost: 10000, count: 0, bps: 0.03 },
  ]); // List of items with costs and counts

  // Options states
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State for options modal
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [clickAnimation, setClickAnimation] = useState(false); // State for "+X" animation
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 }); // Position for animation
  
  // Load the BTC and items from localStorage when the component mounts
  useEffect(() => {
    const savedBTC = localStorage.getItem('BTC');
    if (savedBTC) {
      setBTC(parseInt(savedBTC));
    }
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save the BTC and items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('BTC', BTC);
    localStorage.setItem('items', JSON.stringify(items));
  }, [BTC, items]);

  // Increment BTC based on the number of items every second
  useEffect(() => {
    const interval = setInterval(() => {
      const totalBps = items.reduce((sum, item) => sum + item.count * item.bps, 0);
      setBTC(prevBTC => prevBTC + totalBps);
      setBps(totalBps);
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [items]);

  // Simulate price changes for cryptos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos(prevCryptos =>
        prevCryptos.map(crypto => ({
          ...crypto,
          price: parseFloat((crypto.price * (0.95 + Math.random() * 0.1)).toFixed(2)), // Random fluctuation
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle click event on the Bitcoin logo
  const handleClick = () => {
    setBTC(prevBTC => prevBTC + clickValue);

    // Generate random position around the logo
    const randomTop = Math.random() * 40 - 20; // Random value between -20 and 20
    const randomLeft = Math.random() * 40 - 20; // Random value between -20 and 20
    setAnimationPosition({ top: randomTop, left: randomLeft });

    setClickAnimation(true); // Trigger animation
    setTimeout(() => setClickAnimation(false), 300); // Remove animation after 300ms
  };

  // Handle buying an item with USD balance
  const handleBuyItem = (index) => {
    const item = items[index];
    if (USD >= item.cost) {
      const newUSD = USD - item.cost;
      const newItems = [...items];
      newItems[index] = {
        ...item,
        count: item.count + 1,
        cost: item.cost * 2, // Increase cost for next purchase
      };
      setUSD(newUSD);
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

  // Handle mining BTC
  const handleMineBtc = () => {
    setBTC(prevBTC => prevBTC + clickValue); // Correction : setBTC au lieu de setBtc
  };

  // Handle selling BTC for USD
  const handleSellBtc = () => {
    const btcPrice = 30000; // Example BTC to USD conversion rate
    if (BTC > 0) { // Correction : BTC au lieu de btc
      setUSD(prevUSD => prevUSD + BTC * btcPrice); // Correction : setUSD au lieu de setUsd, BTC au lieu de btc
      setBTC(0); // Correction : setBTC au lieu de setBtc
    }
  };

  // Handle buying a cryptocurrency
  const handleBuyCrypto = (index) => {
    const crypto = cryptos[index];
    if (USD >= crypto.price) {
      const newUSD = USD - crypto.price;
      const newCryptos = [...cryptos];
      newCryptos[index] = {
        ...crypto,
        quantity: crypto.quantity + 1,
      };
      setUSD(newUSD);
      setCryptos(newCryptos);

      // Update specific crypto balance
      switch (crypto.name) {
        case 'BiteCoin':
          setBTC(prevBTC => prevBTC + 1);
          break;
        case 'Ethereum':
          setETH(prevETH => prevETH + 1);
          break;
        case 'BinanceCoin':
          setBNB(prevBNB => prevBNB + 1);
          break;
        case 'LiteCoin':
          setLTC(prevLTC => prevLTC + 1);
          break;
        case 'Solana':
          setSOL(prevSOL => prevSOL + 1);
          break;
        case 'Tether':
          setUSDT(prevUSDT => prevUSDT + 1);
          break;
        case 'DogeCoin':
          setDOGE(prevDOGE => prevDOGE + 1);
          break;
        default:
          break;
      }
    }
  };

  // Handle selling a cryptocurrency
  const handleSellCrypto = (index) => {
    const crypto = cryptos[index];
    if (crypto.quantity > 0) {
      const newUSD = USD + crypto.price;
      const newCryptos = [...cryptos];
      newCryptos[index] = {
        ...crypto,
        quantity: crypto.quantity - 1,
      };
      setUSD(newUSD);
      setCryptos(newCryptos);

      // Update specific crypto balance
      switch (crypto.name) {
        case 'BiteCoin':
          setBTC(prevBTC => prevBTC - 1);
          break;
        case 'Ethereum':
          setETH(prevETH => prevETH - 1);
          break;
        case 'BinanceCoin':
          setBNB(prevBNB => prevBNB - 1);
          break;
        case 'LiteCoin':
          setLTC(prevLTC => prevLTC - 1);
          break;
        case 'Solana':
          setSOL(prevSOL => prevSOL - 1);
          break;
        case 'Tether':
          setUSDT(prevUSDT => prevUSDT - 1);
          break;
        case 'DogeCoin':
          setDOGE(prevDOGE => prevDOGE - 1);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="App">
    
      <header className="App-header">
        <div className="App-main">
          <button className="DarkMode-button" onClick={toggleDarkMode}>
            {isDarkMode ? 'Day Mode' : 'Night Mode'}
          </button>
          <h1>Crypto Market Simulator</h1>
          <p>USD Balance: ${USD.toFixed(2)}</p>
          <p>BTC Balance: {BTC.toFixed(6)} BTC</p>
          <p>Bitcoins per second: {bps}</p>
          <button className = "Sell-BTC-Button" onClick={handleSellBtc}>Sell BTC for USD</button>
          <div className="Bitcoin-container">
            <button className="Bitcoin-button" onClick={handleMineBtc}>
              Mine Bitcoin
            </button>
          </div>
        </div>
        <div className="App-shop">
          <h2>Shop</h2>
          {items.map((item, index) => (
            <div key={index} className="shop-item">
              <p>{item.name}</p>
              <p>Cost: ${item.cost.toFixed(2)} USD</p> {/* Display cost in USD */}
              <p>Count: {item.count}</p>
              <p>BPS: {item.bps}</p> {/* Add BPS information */}
              <button onClick={() => handleBuyItem(index)}>Buy</button>
            </div>
          ))}
        </div>

        <div class="vertical-line">
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>  
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>  
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>
        <p>+</p>

        </div>    

        <div className="App-leaderboard">
          <h2>Cryptocurrencies</h2>
          {cryptos.map((crypto, index) => (
            <div key={index} className="crypto-item">
              <p>{crypto.name}</p>
              <p>Price: ${crypto.price.toFixed(2)}</p>
              <p>Quantity: {crypto.quantity}</p>
              <button className = "crypto-item-button" onClick={() => handleBuyCrypto(index)}>Buy</button>
              <button className = "crypto-item-button" onClick={() => handleSellCrypto(index)}>Sell</button>
            </div>
          ))}
        </div>
      </header>

    </div>
  );
}



export default App;
