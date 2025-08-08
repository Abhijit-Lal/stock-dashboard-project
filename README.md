# Stock-Dashboard-Project

# 📊 Stock Dashboard Web Application

A **full-stack stock market dashboard** that displays real-time and historical stock data for 15 major Indian companies.  
It includes **interactive charts**, **company-specific details** like Market Cap, PE Ratio, EPS, Beta, Sector, and more, with support for **Light/Dark mode**.

---

## 🚀 Features
- 📈 **Interactive Price Charts** (1-Year historical data with gradient styling)
- 💹 **Key Financial Metrics** (Market Cap, PE Ratio, Dividend Yield, ROE, EPS, etc.)
- 🌗 **Light/Dark Mode Toggle**
- 📋 **List of 30 Indian Companies** (Easy sidebar navigation)
- 🎨 **Modern, responsive, and elegant UI**
- ⚡ **Fast backend API** using Flask and `yfinance`

---

## 🖼 Screenshots

### **Light Mode**
![Light Mode Screenshot](a2a79774-98de-4f8b-9644-f2c96a12c4f3.png)

### **Dark Mode**
![Dark Mode Screenshot](8163f3d0-d3b7-4105-87a2-b4e8f1c6d510.png)

---

## 🛠 Technologies Used

### **Frontend**
- React.js
- Recharts (for chart visualization)
- Axios (for API calls)
- CSS (Custom styling)

### **Backend**
- Python (Flask)
- `yfinance` (Stock market data)
- Pandas & NumPy (Data handling)

---

## 📂 Project Structure
stock-dashboard-project/
│── backend/
│ ├── server.py
│ ├── fetch_stock.py
│ └── requirements.txt
│
│── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── index.js
│ └── package.json
│
│── README.md

## 📊 Sample Dataset
The backend fetches live market data from **Yahoo Finance** using the `yfinance` API, so no static dataset is required.  
However, a small JSON response example is:
```json
{
  "dates": ["2024-08-10", "2024-08-11", "..."],
  "prices": [1450.25, 1462.10, "..."],
  "details": {
    "Market Cap": "18509755056128",
    "PE Ratio": "22.73",
    "Dividend Yield": "0.4",
    "EPS": "60.16",
    "Beta": "0.218",
    "Sector": "Energy",
    "Industry": "Oil & Gas Refining & Marketing"
  }
}

🛠 Installation & Setup
Backend

cd backend
pip install -r requirements.txt
python server.py

Frontend

cd frontend
npm install
npm start

The app will run at:

Frontend: http://localhost:3000
Backend:  http://localhost:5000

📜 Development Approach

The Stock Dashboard was built using a modular full-stack architecture.
The backend (Flask) handles data fetching from Yahoo Finance using the yfinance API, processes it with Pandas, and serves it through REST APIs.
The frontend (React) consumes these APIs using Axios, displaying interactive charts with Recharts and detailed company statistics in an elegant UI.
Light/Dark mode was added for accessibility and personalization.

⚠ Challenges Faced
Yahoo Finance API limitations sometimes caused delays in fetching data.
Handling missing or unavailable fields for certain companies.
Achieving a smooth and visually appealing chart design that works well in both light and dark modes.
Managing state efficiently in React to ensure fast updates without reloading the page.

📎 Deliverables
✅ Complete source code (Frontend + Backend)
✅ Live API data fetching
✅ Screenshots (Light & Dark Mode)
✅ Short project note with technologies, challenges, and setup instructions

📌 Future Enhancements
Add search functionality for any NSE-listed company.
Include Candlestick chart view.
Display news and sentiment analysis for selected companies.
