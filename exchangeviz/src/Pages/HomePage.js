import React, { useState, useEffect } from 'react';
import '../styles/citi-theme.css';
import CitiButton from '../Components/CitiButton';
import CitiTable from '../Components/CitiTable';
import CitiTextBox from '../Components/CitiTextBox';
import NewsTicker from '../Components/NewsTicker';

function HomePage() {
  // Live stocks data will be fetched via Finnhub API
  const [stocksData, setStocksData] = useState([]);
  const stocksColumns = ['Symbol', 'Price'];

  // Other data remains static
  const commoditiesData = [
    { Commodity: 'Gold', Price: '$1800' },
    { Commodity: 'Silver', Price: '$25' },
    { Commodity: 'Oil', Price: '$70' },
  ];
  const commoditiesColumns = ['Commodity', 'Price'];

  const bidAskData = [
    { Side: 'Bid', Price: '135.67', Volume: 100, Time: '14:30:15' },
    { Side: 'Bid', Price: '135.65', Volume: 50,  Time: '14:30:16' },
    { Side: 'Ask', Price: '135.70', Volume: 80,  Time: '14:30:17' },
    { Side: 'Ask', Price: '135.72', Volume: 30,  Time: '14:30:18' },
  ];
  const bidAskColumns = ['Side', 'Price', 'Volume', 'Time'];
  // For display in the bid and ask tables, remove the "Side" column:
  const bidAskDisplayColumns = ['Price', 'Volume', 'Time'];

  // Filter the bid/ask data
  const bidData = bidAskData.filter(row => row.Side === 'Bid');
  const askData = bidAskData.filter(row => row.Side === 'Ask');

  // Fetch live stocks data using Finnhub and the API key from the .env file
  useEffect(() => {
    async function fetchStocks() {
      // Expanded list of stock symbols
      const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'META', 'NFLX', 'NVDA'];

      // Log to verify the Finnhub API key is loaded
      console.log("Finnhub API Key:", process.env.REACT_APP_FINNHUB_API_KEY);

      try {
        const responses = await Promise.all(
          symbols.map(symbol =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d1cjrnhr01qvlf60fb2gd1cjrnhr01qvlf60fb30`)
          )
        );
        const dataArr = await Promise.all(responses.map(response => response.json()));
        console.log("Finnhub responses:", dataArr);

        const liveStocks = dataArr.map((item, index) => {
          if (typeof item.c === 'undefined' || item.c === null) {
            console.error("Missing current price in response for", symbols[index], "Response:", item);
            return { Symbol: symbols[index], Price: 'N/A' };
          }
          return {
            Symbol: symbols[index],
            Price: `$${parseFloat(item.c).toFixed(2)}`
          };
        });
        setStocksData(liveStocks);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    }

    fetchStocks();
    const intervalId = setInterval(fetchStocks, 10000); // update every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <><NewsTicker />
    <div className="main-layout">
      {/* Left column: Commodities */}
      <div className="side-column">
        <div className="commodities-table-wrapper side-wrapper">
          <h2 className="side-title">Commodities</h2>
          <CitiTable data={commoditiesData} columns={commoditiesColumns} />
        </div>
      </div>

      {/* Center column: Bid/Ask tables & other interface elements */}
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

          <CitiTextBox />
          <CitiButton onClick={() => alert('Button clicked!')}>Add Bid</CitiButton>
          <CitiButton onClick={() => alert('Button clicked!')}>Add Ask</CitiButton>
        </div>
      </div>

      {/* Right column: Stocks and News */}
      <div className="side-column">
        <div className="stocks-table-wrapper side-wrapper">
          <h2 className="side-title">Stocks</h2>
          <CitiTable data={stocksData} columns={stocksColumns} />
        </div>
      </div>
    </div></>
  );
}

export default HomePage;