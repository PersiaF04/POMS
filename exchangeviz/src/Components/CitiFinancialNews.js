// src/Components/FinancialNews.js

import React, { useState, useEffect } from 'react';
import CitiTable from './CitiTable';

const API_KEY = '6aea17b26722443887fa50b0d4cfe762';
const URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=${API_KEY}`;

function FinancialNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  const titleLinks = articles.map(article => ({
    Headline: (
      <a href={article.url} target="_blank" rel="noreferrer">
        {article.title}
      </a>
    ),
    Source: article.source?.name || 'Unknown',
  }));

  const newsColumns = ['Headline', 'Source'];

  return (
    <div className="news-table-wrapper side-wrapper">
      <h2 className="side-title">News</h2>
      {loading ? <p>Loading news...</p> : <CitiTable data={titleLinks} columns={newsColumns} />}
    </div>
  );
}

export default FinancialNews;
