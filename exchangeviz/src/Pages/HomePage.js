import React, { useState, useEffect } from 'react';
import '../styles/citi-theme.css';
import CitiButton from '../Components/CitiButton';
import CitiTable from '../Components/CitiTable';
import CitiTextBox from '../Components/CitiTextBox';
import FinancialNews from '../Components/CitiFinancialNews';
import NewsTicker from '../Components/NewsTicker';

function HomePage() {
  const stocksData = [
    { Symbol: 'AAPL', Price: '$150' },
    { Symbol: 'GOOGL', Price: '$2800' },
    { Symbol: 'AMZN', Price: '$3300' },
  ];
  const stocksColumns = ['Symbol', 'Price'];

  const commoditiesData = [
    { Commodity: 'Gold', Price: '$1800' },
    { Commodity: 'Silver', Price: '$25' },
    { Commodity: 'Oil', Price: '$70' },
  ];
  const commoditiesColumns = ['Commodity', 'Price'];

  const [volume, setVolume] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [bidAskData, setBidAskData] = useState([
  ]);

  const bidAskDisplayColumns = ['Price', 'Volume', 'Time'];

  const bidData = bidAskData.filter(row => row.Side === 'Bid');
  const askData = bidAskData.filter(row => row.Side === 'Ask');

  const addOrder = (side) => {
    if (volume && price && time) {
      const newOrder = { Side: side, Price: price, Volume: parseInt(volume, 10), Time: time };
      setBidAskData([...bidAskData, newOrder]);
      setVolume('');
      setPrice('');
      setTime('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <><NewsTicker />
    <div className="main-layout">
      {/* Existing left column (e.g., Commodities) */}
      <div className="side-column">
        <div className="commodities-table-wrapper side-wrapper">
          <h2 className="side-title">Commodities</h2>
          <CitiTable data={commoditiesData} columns={commoditiesColumns} />
        </div>
      </div>

      {/* Central container with bid and ask tables displayed side by side */}
      <div className="center-column">
        <div className="citi-container">
          <h1 className="citi-header">Exchange Viz</h1>
          <CitiButton onClick={() => alert('Button clicked!')}>FIFO</CitiButton>
          <CitiButton onClick={() => alert('Button clicked!')}>Pro-rata</CitiButton>

          <div className="bid-ask-tables-container">
            <div className="bid-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Bid Orders</h2>
              <CitiTable data={bidData} columns={bidAskDisplayColumns} />
            </div>
            <div className="ask-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Ask Orders</h2>
              <CitiTable data={askData} columns={bidAskDisplayColumns} />
            </div>
          </div>

          <div className="citi-textbox-container">
            <div className="citi-input-group">
              <label htmlFor="volume">Volume</label>
              <input
                id="volume"
                type="text"
                className="citi-input"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
            <div className="citi-input-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                className="citi-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="citi-input-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="text"
                className="citi-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <CitiButton onClick={() => addOrder('Bid')}>Add Bid</CitiButton>
          <CitiButton onClick={() => addOrder('Ask')}>Add Ask</CitiButton>
        </div>
      </div>

      {/* Existing right column (e.g., Stocks and News) */}
      <div className="side-column">
        <div className="stocks-table-wrapper side-wrapper ">
          <h2 className="side-title">Stocks</h2>
          <CitiTable data={stocksData} columns={stocksColumns} />
        </div>
        
      </div>
    </div></>
  );
}

export default HomePage;