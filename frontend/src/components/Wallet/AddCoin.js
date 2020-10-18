import React, { Component } from "react"
import { connect } from "react-redux"
import { addCoin } from "../../ducks/Wallet"
import CoinSymbolInput from "components/Wallet/CoinSymbolInput"
import { setLocalStorageWallet } from "helpers/LocalStorage"

class AddCoin extends Component {
  addCoin = (e) => {
    const coin = {
      id: JSON.parse(e.target.coin.value).id,
      name: JSON.parse(e.target.coin.value).name,
      amount: e.target.amount.value,
    }

    e.preventDefault()
    this.props
      .dispatch(addCoin(coin))
      .then(() => setLocalStorageWallet(this.props.coins))
  }
  render() {
    return (
      <form className="form-inline mt-4" onSubmit={this.addCoin}>
        <CoinSymbolInput />
        <input
          className="form-control mr-2"
          name="amount"
          type="number"
          step="any"
          min={0}
          placeholder="AMOUNT"
        ></input>
        <button className="btn btn-primary" type="submit">
          ADD
        </button>
      </form>
    )
  }
}

export default connect((store) => ({ coins: store.coins }))(AddCoin)
