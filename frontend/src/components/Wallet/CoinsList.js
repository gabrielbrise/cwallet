import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "../Common/Table"
import { removeCoin } from "ducks/Wallet"
import { setLocalStorageWallet } from "helpers/LocalStorage"

class CoinsList extends Component {
  get getBody() {
    return [
      ...this.props.coins.map((coin, index) => {
        const totalUSD = coin.totalBTC * this.props.BTC_USD
        const totalBRL = coin.totalBTC * this.props.BTC_BRL
        return [
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            width={24}
          />,
          coin.name,
          coin.amount,
          coin.btcValue.toFixed(8),
          coin.totalBTC.toFixed(8),
          totalUSD.toFixed(2),
          totalBRL.toFixed(2),
          <span>Edit</span>,
          <span
            className="Raleway text-danger"
            style={{ width: 50, cursor: "pointer" }}
            onClick={() => this.removeCoin(index)}
          >
            X
          </span>,
        ]
      }),
      [
        "",
        "",
        "",
        "",
        <b>{this.calculateTotal("totalBTC").toFixed(8)} BTC</b>,
        <b>
          ${(this.calculateTotal("totalBTC") * this.props.BTC_USD).toFixed(2)}
        </b>,
        <b>
          R$ {(this.calculateTotal("totalBTC") * this.props.BTC_BRL).toFixed(2)}
        </b>,
        "",
        "",
      ],
    ]
  }

  removeCoin = async (index) => {
    await this.props.dispatch(removeCoin(index))
    return setLocalStorageWallet(this.props.coins)
  }

  calculateTotal = (value) =>
    this.props.coins.reduce((_acc, coin) => _acc + coin[value], 0)

  render() {
    return (
      <>
        <Table
          header={[
            "Icon",
            "Name",
            "Amount",
            "BTC",
            "Total BTC",
            "Total USD",
            "Total BRL",
          ]}
          body={this.getBody}
        ></Table>
      </>
    )
  }
}

export default connect((store) => ({
  coins: store.coins,
  BTC_USD: store.market.btc.BTC_USD,
  BTC_BRL: store.market.btc.BTC_BRL,
}))(CoinsList)
