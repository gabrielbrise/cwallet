import React, { Component } from "react"
import "./App.css"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { walletReducer } from "ducks/Wallets"
import { btcReducer } from "ducks/Btc"
import createSagaMiddleware from "redux-saga"
import { marketReducer } from "./ducks/Market"
import { Helmet } from "react-helmet"
import Header from "./components/Header"
import rootSaga from "./sagas/Root"
import WalletsSection from "./components/Sections/WalletsSection"
import BitcoinSection from "components/Sections/BitcoinSection"
import MarketSection from "components/Sections/MarketSection"

function reducer(state = {}, action) {
  return {
    btc: btcReducer(state.btc, action),
    wallets: walletReducer(state.wallets, action),
    market: marketReducer(state.market, action),
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossorigin="anonymous"
          />
          <link href="index.css" rel="stylesheet" />
        </Helmet>
        <div className="App">
          <div className="container" style={{ paddingTop: 32 }}>
            <Header />
            <BitcoinSection />
            <MarketSection />
            <WalletsSection />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
