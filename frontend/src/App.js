import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, defs, linearGradient, stop
} from 'recharts';
import './App.css';

const companies = [
  'RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS',
  'SBIN.NS', 'WIPRO.NS', 'BHARTIARTL.NS', 'HCLTECH.NS', 'ITC.NS',
  'AXISBANK.NS', 'KOTAKBANK.NS', 'LT.NS', 'MARUTI.NS', 'ASIANPAINT.NS'
];

function App() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [stockData, setStockData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  useEffect(() => {
    setStockData(null);
    axios.get(`http://localhost:5000/api/stocks/${selectedCompany}`)
      .then(res => {
        if (!res.data || res.data.error) {
          setStockData({ error: true });
        } else {
          const { dates, prices, volume, ...details } = res.data;
          const chartData = dates.map((date, i) => ({ date, price: prices[i], volume: volume[i] }));
          setStockData({ chartData, ...details });
        }
      })
      .catch(() => setStockData({ error: true }));
  }, [selectedCompany]);

  return (
    <div className="container">
      <div className="sidebar">
        <h2>📊 Indian Stocks</h2>
        {companies.map(company => (
          <button
            key={company}
            onClick={() => setSelectedCompany(company)}
            className={selectedCompany === company ? 'active' : ''}
          >
            {company.replace('.NS', '')}
          </button>
        ))}
      </div>

      <div className="content">
        <div className="header">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {stockData === null ? (
          <div className="loading">Loading...</div>
        ) : stockData.error ? (
          <div className="loading">Data not available</div>
        ) : (
          <>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stockData.chartData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0077cc" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0077cc" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" hide={false} />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#0077cc" fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="details-grid">
              {Object.entries(stockData).map(([key, value]) => (
                key !== 'chartData' && (
                  <div key={key} className="detail-box">
                    <strong>{key.replace(/_/g, ' ').toUpperCase()}</strong>
                    <span>{value ?? 'N/A'}</span>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
