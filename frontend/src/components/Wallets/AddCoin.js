import React, { Component } from "react"
import { connect } from "react-redux"
import CoinSymbolInput from "components/Wallets/CoinSymbolInput"
import { addCoin } from "ducks/Wallets"

class AddCoin extends Component {
  addCoin = (e) => {
    const coin = {
      id: JSON.parse(e.target.coin.value).id,
      name: JSON.parse(e.target.coin.value).name,
      amount: e.target.amount.value,
      walletId: this.props.walletId,
    }

    e.preventDefault()
    this.props.addCoin(coin)
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

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {
  addCoin,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoin)
