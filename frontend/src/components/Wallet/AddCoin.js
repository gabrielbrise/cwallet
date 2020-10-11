import React, { Component } from "react"
import { connect } from "react-redux"
import { addCoin } from "../../ducks/Wallet"
import CoinSymbolInput from "components/Wallet/CoinSymbolInput"

class AddCoin extends Component {
  addCoin = (e) => {
    const coin = {
      id: JSON.parse(e.target.coin.value).id,
      name: JSON.parse(e.target.coin.value).name,
      value: e.target.value.value,
    }

    e.preventDefault()
    this.props.dispatch(addCoin(coin))
  }
  render() {
    return (
      <form className="form-inline mt-4" onSubmit={this.addCoin}>
        <CoinSymbolInput />
        <input
          className="form-control mr-2"
          name="value"
          type="number"
          placeholder="AMOUNT"
        ></input>
        <button className="btn btn-primary" type="submit">
          ADD
        </button>
      </form>
    )
  }
}

export default connect((store) => ({}))(AddCoin)
