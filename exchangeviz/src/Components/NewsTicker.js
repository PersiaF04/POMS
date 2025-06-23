import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';     // <-- the helper

const API_KEY  = '6aea17b26722443887fa50b0d4cfe762';
const URL      = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=25&apiKey=${API_KEY}`;
const REFRESH  = 60_000;   // 1-minute auto-refresh (tweak as you like)

export default function NewsTicker() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // fetch once immediately
    fetch(URL).then(r => r.json()).then(d => setArticles(d.articles || []));

    // then poll every REFRESH ms
    const id = setInterval(() => {
      fetch(URL).then(r => r.json()).then(d => setArticles(d.articles || []));
    }, REFRESH);

    return () => clearInterval(id);          // cleanup on unmount
  }, []);

  // Render nothing until we have headlines
  if (!articles.length) return null;

  return (
    <div style={{ background: '#0033a0', color: 'white', fontWeight: 600 , fontSize: '1.25rem',      // 👈 bigger text
      padding: '1rem 0'}}>
      <Marquee
        gradient={false}
        speed={40}          // px / second
        pauseOnHover
      >
        {articles.map((a, i) => (
          <span key={i} style={{ marginRight: 60 }}>
            <a
              href={a.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {a.title}
            </a>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
