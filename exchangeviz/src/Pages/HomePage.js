import React from 'react';
import '../styles/citi-theme.css';
import CitiButton from '../Components/CitiButton';
import CitiTable from '../Components/CitiTable';
import CitiTextBox from '../Components/CitiTextBox';

function HomePage() {
  const sampleData = [
    { Bid: 1, Ask: 'Item One' },
    { Bid: 2, Ask: 'Item Two' },
    { Bid: 3, Ask: 'Item Three' },
  ];
  const columns = ['Side', 'Price', 'Volume', 'Time'];

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

  const newsData = [
    { Headline: 'Market hits record high', Source: 'Reuters' },
    { Headline: 'Tech stocks rally', Source: 'Bloomberg' },
    { Headline: 'Economic outlook improves', Source: 'CNBC' },
  ];
  const newsColumns = ['Headline', 'Source'];

  // Example financial bid/ask data typical for a trading interface:
  const bidAskData = [
    { Side: 'Bid', Price: '135.67', Volume: 100, Time: '14:30:15' },
    { Side: 'Bid', Price: '135.65', Volume: 50,  Time: '14:30:16' },
    { Side: 'Ask', Price: '135.70', Volume: 80,  Time: '14:30:17' },
    { Side: 'Ask', Price: '135.72', Volume: 30,  Time: '14:30:18' },
  ];
  // Columns corresponding to the keys in bidAskData
  const bidAskColumns = ['Side', 'Price', 'Volume', 'Time'];

  // Filter the data into bids and asks
  const bidData = bidAskData.filter(row => row.Side === 'Bid');
  const askData = bidAskData.filter(row => row.Side === 'Ask');

  return (
    <div className="main-layout">
      <div className="side-column">
        <div className="commodities-table-wrapper side-wrapper">
          <h2 className="side-title">Commodities</h2>
          <CitiTable data={commoditiesData} columns={commoditiesColumns} />
        </div>
      </div>
      <div className="center-column">
        <div className="citi-container">
          <h1 className="citi-header">Exchange Viz</h1>
          <CitiButton onClick={() => alert('Button clicked!')}>FIFO</CitiButton>
          <CitiButton onClick={() => alert('Button clicked!')}>Pro-rata</CitiButton>

          {/* Side by side bid and ask tables */}
          <div className="bid-ask-tables-container">
            <div className="bid-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Bid Orders</h2>
              <CitiTable data={bidData} columns={bidAskColumns} />
            </div>
            <div className="ask-table-wrapper">
              <h2 style={{ color: "var(--citi-dark-blue)" }}>Ask Orders</h2>
              <CitiTable data={askData} columns={bidAskColumns} />
            </div>
          </div>

          <CitiTextBox />
          <CitiButton onClick={() => alert('Button clicked!')}>Add Bid</CitiButton>
          <CitiButton onClick={() => alert('Button clicked!')}>Add Ask</CitiButton>
        </div>
      </div>
      <div className="side-column">
        <div className="stocks-table-wrapper side-wrapper">
          <h2 className="side-title">Stocks</h2>
          <CitiTable data={stocksData} columns={stocksColumns} />
        </div>
        <div className="news-table-wrapper side-wrapper">
          <h2 className="side-title">News</h2>
          <CitiTable data={newsData} columns={newsColumns} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;