import yfinance as yf
import json
import sys

if len(sys.argv) != 2:
    print(json.dumps({"error": "Symbol not provided"}))
    sys.exit()

symbol = sys.argv[1]

try:
    # Download 1 year of daily stock data
    data = yf.download(symbol, period="1y", interval="1d")

    if data.empty:
        raise ValueError("No data returned")

    # Convert index to date strings
    dates = [str(date.date()) for date in data.index]

    # FIXED: Ensure we access columns as Series before tolist()
    prices = data['Close'].round(2)
    volume = data['Volume'].fillna(0).astype(int)

    prices_list = prices.squeeze().tolist()
    volume_list = volume.squeeze().tolist()

    # Company info
    stock = yf.Ticker(symbol)
    info = stock.info

    result = {
        "dates": dates,
        "prices": prices_list,
        "volume": volume_list,
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "eps": info.get("trailingEps"),
        "dividend_yield": info.get("dividendYield"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "beta": info.get("beta"),
        "roe": info.get("returnOnEquity")
    }

    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))
