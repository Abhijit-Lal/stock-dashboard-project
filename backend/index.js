// backend/index.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/stocks/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  exec(`python3 fetch_stock.py ${symbol}`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(stderr);
      return res.status(500).send('Error fetching data');
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (e) {
      res.status(500).send('Failed to parse stock data');
    }
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
