import React, { useEffect, useState } from 'react';
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
  const columns = ['Bid', 'Ask'];

  const stocksData = [
    { Symbol: 'AAPL', Price: '$150' },
    { Symbol: 'GOOGL', Price: '$2800' },
    { Symbol: 'AMZN', Price: '$3300' },
  ];
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


  const newsData = [
    { Headline: 'Market hits record high', Source: 'Reuters' },
    { Headline: 'Tech stocks rally', Source: 'Bloomberg' },
    { Headline: 'Economic outlook improves', Source: 'CNBC' },
  ];
  const newsColumns = ['Headline', 'Source'];

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
          <CitiTable data={sampleData} columns={columns} />
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