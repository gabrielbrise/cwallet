# cwallet

CWALLET is a cryptocurrency wallet manager. It uses CoinMarketCap API to get the current prices for each coin.

The app structure is divided into 3 parts:
- Bitcoin: holds data about the bitcoin price accordingly to an specific fiat currency
- Market: watches the market value in btc of the coins that are present in the wallets
- Wallets: create a single or multiple wallets to track your cryptocurrency in an organized way

All data is currently stored in localStorage. The decision to not use a database to store this information is to have it locally in your device, without sharing this information with anyone else.

Frontend written in ReactJS and backend in Node.js.

Running the application

- Get a free API key from coinmarketcap at https://coinmarketcap.com/api/
- Create a .env file in the project root with `CMC_API_KEY=your_api_key`
- Run `npm install`
- To run both backend and frontend at the same time to check the application working locally, run `npm run dev`
- By default the backend will run at http://localhost:5000 and the frontend at http://localhost:3000
