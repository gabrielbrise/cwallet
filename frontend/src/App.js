import React, { Component } from "react"
import "./App.css"
import Section from "./components/Common/Section"
import AddCoin from "./components/Wallet/AddCoin"
import { createStore } from "redux"
import { Provider } from "react-redux"
import CoinsList from "./components/Wallet/CoinsList"
import { walletReducer } from "./ducks/Wallet"

function reducer(state = {}, action) {
  return {
    coins: walletReducer(state.coins, action),
  }
}

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <h1 className="my-4"> Personal Wallet </h1>
            <Section title="Current Market">test</Section>
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
