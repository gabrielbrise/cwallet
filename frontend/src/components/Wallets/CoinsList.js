import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "../Common/Table"
import { removeCoin } from "ducks/Wallets"
import { setLocalStorageWallet } from "helpers/LocalStorage"

class CoinsList extends Component {
  get getBody() {
    return [
      ...this.props.coins.map((coin, index) => {
        const currentCoin = this.props.market.coins.find(
          (c) => c.id === coin.id
        )
        const totalBTC = currentCoin ? coin.amount * currentCoin.value : 0
        const totalFiatCurrency = totalBTC * this.props.btc.value
        return [
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            width={24}
          />,
          coin.name,
          coin.amount,
          totalBTC.toFixed(8),
          totalFiatCurrency.toFixed(2),
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
        // <b>{this.calculateTotal("totalBTC").toFixed(8)} BTC</b>,
        // <b>
        //   R$ {(this.calculateTotal("totalBTC") * this.props.BTC_BRL).toFixed(2)}
        // </b>,
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
            "Total BTC",
            `Total ${this.props.btc.fiatCurrency}`,
          ]}
          body={this.getBody}
        ></Table>
      </>
    )
  }
}

const mapStateToProps = (state) => ({ btc: state.btc, market: state.market })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)
