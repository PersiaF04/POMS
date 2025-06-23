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

  const [commoditiesData, setCommoditiesData] = useState([]);
  const commoditiesColumns = ['Commodity', 'Price'];
  
  useEffect(() => {

    const fetchCommodityPrice = async (commodity, endpoint) => {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
          },
        });
        const data = await response.json();
        const rates = data.data?.rates ??data.rates; 
        return { Commodity: commodity, Price: `$${Object.values(rates)[2]}` };


      } catch (error) {
        console.error(`Error fetching price for ${commodity}:`, error);
        return { Commodity: commodity, Price: 'N/A' };
      }
    };

    const fetchCommoditiesData = async () => {
      const endpoints = [
        {commodity: 'Ahmedabad Gold', endpoint: 'https://commodities-api.com/api/latest?access_key=nlkt12ilshvu0uz46bnc2jvo8a0t6dn2l9k11ykjs9jxc8576t0d8bed3zg1&base=USD&symbols=XAU-AHME'},
        {commodity: 'Delhi Silver', endpoint: 'https://commodities-api.com/api/latest?access_key=nlkt12ilshvu0uz46bnc2jvo8a0t6dn2l9k11ykjs9jxc8576t0d8bed3zg1&base=USD&symbols=XAG-DELH'},
        {commodity: 'London Gas Oil', endpoint: 'https://commodities-api.com/api/latest?access_key=nlkt12ilshvu0uz46bnc2jvo8a0t6dn2l9k11ykjs9jxc8576t0d8bed3zg1&base=USD&symbols=LGOU22'},
      ];
      
      const results = await Promise.all(
        endpoints.map(({commodity, endpoint}) =>
          fetchCommodityPrice(commodity, endpoint)
      )
      );

      setCommoditiesData(results);

    };

    fetchCommoditiesData();
  }, []);

  const [volume, setVolume] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [bidAskData, setBidAskData] = useState([
    { Side: 'Bid', Price: '135.67', Volume: 100, Time: '14:30:15', Matched: false },
    { Side: 'Bid', Price: '135.65', Volume: 50, Time: '14:30:16', Matched: false },
    { Side: 'Ask', Price: '135.70', Volume: 80, Time: '14:30:17', Matched: false },
    { Side: 'Ask', Price: '135.72', Volume: 30, Time: '14:30:18', Matched: false },
  ]);

  // For display in the bid and ask tables, remove the "Side" column:
  const bidAskDisplayColumns = ['Price', 'Volume', 'Time'];

  // Filter the bid/ask data
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

  setTimeout(() => {
    const filteredData = updatedData
      .filter(row => row.Volume > 0)
      .map(row => ({ ...row, Matched: false }));
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

        <div className="bid-ask-tables-container">
          <div className="bid-table-wrapper">
            <h2 style={{ color: 'var(--citi-dark-blue)' }}>Bid Orders</h2>
            <CitiTable
              data={bidData.map(row => ({
                ...row,
                style: row.Matched ? matchedRowStyle : {}, // Apply green styling if matched
              }))}
              columns={bidAskDisplayColumns}
            />
          </div>
          <div className="ask-table-wrapper">
            <h2 style={{ color: 'var(--citi-dark-blue)' }}>Ask Orders</h2>
            <CitiTable
              data={askData.map(row => ({
                ...row,
                style: row.Matched ? matchedRowStyle : {}, // Apply green styling if matched
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
