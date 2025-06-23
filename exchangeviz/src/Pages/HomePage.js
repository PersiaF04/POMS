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
    { Side: 'Bid', Price: '135.67', Volume: 100, Time: '14:30:15', Matched: false },
    { Side: 'Bid', Price: '135.65', Volume: 50, Time: '14:30:16', Matched: false },
    { Side: 'Ask', Price: '135.70', Volume: 80, Time: '14:30:17', Matched: false },
    { Side: 'Ask', Price: '135.72', Volume: 30, Time: '14:30:18', Matched: false },
  ]);

  const bidAskDisplayColumns = ['Price', 'Volume', 'Time'];

  const bidData = bidAskData.filter(row => row.Side === 'Bid');
  const askData = bidAskData.filter(row => row.Side === 'Ask');

  const addOrder = (side) => {
    if (volume && price && time) {
      const newOrder = { Side: side, Price: price, Volume: parseInt(volume, 10), Time: time, Matched: false };
      setBidAskData([...bidAskData, newOrder]);
      setVolume('');
      setPrice('');
      setTime('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const runMatching = () => {
    const updatedData = [...bidAskData];
    for (let i = 0; i < updatedData.length; i++) {
      const bid = updatedData[i];
      if (bid.Side === 'Bid' && !bid.Matched) {
        for (let j = 0; j < updatedData.length; j++) {
          const ask = updatedData[j];
          if (ask.Side === 'Ask' && !ask.Matched && parseFloat(bid.Price) >= parseFloat(ask.Price)) {
            const matchVolume = Math.min(bid.Volume, ask.Volume);
            bid.Volume -= matchVolume;
            ask.Volume -= matchVolume;
            bid.Matched = true;
            ask.Matched = true;
            break;
          }
        }
      }
    }

    // Update the table immediately
    setBidAskData(updatedData);

    // Remove rows with Volume = 0 after 2 seconds
    setTimeout(() => {
      const filteredData = updatedData.filter(row => row.Volume > 0);
      setBidAskData(filteredData);
    }, 2000);
  };

  const matchedRowStyle = {
    backgroundColor: 'green',
    color: 'white',
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

          <div className="bid-ask-tables-container">
            <div className="bid-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Bid Orders</h2>
              <CitiTable
                data={bidData.map(row => ({
                  ...row,
                  style: row.Matched ? matchedRowStyle : {},
                }))}
                columns={bidAskDisplayColumns}
              />
            </div>
            <div className="ask-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Ask Orders</h2>
              <CitiTable
                data={askData.map(row => ({
                  ...row,
                  style: row.Matched ? matchedRowStyle : {},
                }))}
                columns={bidAskDisplayColumns}
              />
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
          <CitiButton onClick={runMatching}>Run</CitiButton>
          
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