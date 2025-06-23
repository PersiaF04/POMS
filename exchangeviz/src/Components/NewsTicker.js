import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';     // <-- the helper

const API_KEY = '6aea17b26722443887fa50b0d4cfe762';
const URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=25&apiKey=${API_KEY}`;
const REFRESH = 60_000;   // 1-minute auto-refresh (tweak as you like)

async function fetchSentimentAnalysis() {
    const url = 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '7e3f8421cemsh51e57d02eac2cbap1dbfe2jsn932a19d9ca33',
            'x-rapidapi-host': 'twinword-sentiment-analysis.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            text: 'great value in its price range!'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export default function NewsTicker() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(URL);
                const data = await response.json();

                // Perform sentiment analysis on each article
                const analyzedArticles = await Promise.all(
                    data.articles.map(async article => {
                        const sentiment = await fetchSentimentAnalysis(article.title);
                        return {
                            ...article,
                            sentiment,
                        };
                    })
                );

                setArticles(analyzedArticles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        fetchArticles();
    }, []);

    // Render nothing until we have headlines
    if (!articles.length) return null;

    return (
        <div style={{
            background: '#0033a0', color: 'white', fontWeight: 600, fontSize: '1.25rem',      // 👈 bigger text
            padding: '1rem 0'
        }}>
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
                            style={{
                                color:
                                    a.sentiment === 'positive'
                                        ? 'green'
                                        : a.sentiment === 'negative'
                                            ? 'grey'
                                            : 'red',
                                textDecoration: 'none'
                            }}
                        >
                            {a.title}
                        </a>
                    </span>
                ))}
            </Marquee>
        </div >
    );
}
