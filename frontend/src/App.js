import React, { Component } from "react"
import "./App.css"
import Section from "components/Common/Section"
import AddCoin from "components/Wallet/AddCoin"
import { createStore } from "redux"
import { Provider } from "react-redux"
import CoinsList from "components/Wallet/CoinsList"
import { walletReducer } from "ducks/Wallet"
import { marketReducer } from "./ducks/Market"
import MarketInfo from "components/Market/MarketInfo"
import { Helmet } from "react-helmet"

function reducer(state = {}, action) {
  return {
    coins: walletReducer(state.coins, action),
    market: marketReducer(state.market, action),
  }
}

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <h1 className="my-4 OpenSans"> Personal Wallet </h1>
            <Helmet>
              <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&family=Raleway:wght@400;700&display=swap"
                rel="stylesheet"
              />
              <link href="/index.css" rel="stylesheet" />
            </Helmet>
            <Section title="Current Market">
              <MarketInfo />
            </Section>
            <Section title="Your Wallet">
              <CoinsList />
              <AddCoin />
            </Section>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
