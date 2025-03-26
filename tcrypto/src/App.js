import React, { useState, useEffect } from 'react';
import bitcoin from './bitcoin.png';
import './App.css';

function App() {
  const [usd, setUsd] = useState(1000); // USD balance
  const [btc, setBtc] = useState(0); // BTC balance
  const [cryptos, setCryptos] = useState([
    { name: 'Ethereum', price: 2000, quantity: 0 },
    { name: 'Litecoin', price: 100, quantity: 0 },
    { name: 'Dogecoin', price: 0.1, quantity: 0 },
  ]); // List of cryptos with prices and quantities
  const [clickValue, setClickValue] = useState(0.001); // BTC per click

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

  // Handle mining BTC
  const handleMineBtc = () => {
    setBtc(prevBtc => prevBtc + clickValue);
  };

  // Handle buying a cryptocurrency
  const handleBuyCrypto = (index) => {
    const crypto = cryptos[index];
    if (usd >= crypto.price) {
      const newUsd = usd - crypto.price;
      const newCryptos = [...cryptos];
      newCryptos[index] = {
        ...crypto,
        quantity: crypto.quantity + 1,
      };
      setUsd(newUsd);
      setCryptos(newCryptos);
    }
  };

  // Handle selling a cryptocurrency
  const handleSellCrypto = (index) => {
    const crypto = cryptos[index];
    if (crypto.quantity > 0) {
      const newUsd = usd + crypto.price;
      const newCryptos = [...cryptos];
      newCryptos[index] = {
        ...crypto,
        quantity: crypto.quantity - 1,
      };
      setUsd(newUsd);
      setCryptos(newCryptos);
    }
  };

  // Handle selling BTC for USD
  const handleSellBtc = () => {
    const btcPrice = 30000; // Example BTC to USD conversion rate
    if (btc > 0) {
      setUsd(prevUsd => prevUsd + btc * btcPrice);
      setBtc(0);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-main">
          <h1>Crypto Market Simulator</h1>
          <p>USD Balance: ${usd.toFixed(2)}</p>
          <p>BTC Balance: {btc.toFixed(6)} BTC</p>
          <button onClick={handleSellBtc}>Sell BTC for USD</button>
          <div className="Bitcoin-container">
            <img
              src={bitcoin}
              className="Bitcoin-logo"
              alt="bitcoin"
              onClick={handleMineBtc}
            />
            <p>Click to mine BTC (+{clickValue} BTC)</p>
          </div>
        </div>
        <div className="App-shop">
          <h2>Cryptocurrencies</h2>
          {cryptos.map((crypto, index) => (
            <div key={index} className="crypto-item">
              <p>{crypto.name}</p>
              <p>Price: ${crypto.price.toFixed(2)}</p>
              <p>Quantity: {crypto.quantity}</p>
              <button onClick={() => handleBuyCrypto(index)}>Buy</button>
              <button onClick={() => handleSellCrypto(index)}>Sell</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
