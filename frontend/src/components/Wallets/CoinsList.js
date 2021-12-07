import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "../Common/Table"
import { removeCoin } from "ducks/Wallets"
import { setLocalStorageWallet } from "helpers/LocalStorage"
import EditCoin from "./EditCoin"

class CoinsList extends Component {
  fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }
  state = {
    editCoin: -1,
  }
  get getBody() {
    return [
      ...this.props.coins.map((coin, index) => {
        const currentCoin = this.props.market.coins.find(
          (c) => c.id === coin.id
        )
        const totalBTC = currentCoin ? coin.amount * currentCoin.value : 0
        const totalFiatCurrency = totalBTC * this.props.btc.value
        const isEditCoinCurrent = this.state.editCoin === index
        return [
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            width={24}
          />,
          coin.name,
          isEditCoinCurrent ? (
            <input defaultValue={coin.amount} />
          ) : (
            coin.amount
          ),
          totalBTC.toFixed(8),
          totalFiatCurrency.toFixed(2),
          <EditCoin
            editCoin={this.state.editCoin}
            index={index}
            edit={() => this.enterEditCoin(index)}
            cancel={() => this.cancelEditCoin()}
            save={() => this.saveEditCoin(this.props.walletId, index)}
            remove={() => this.props.removeCoin(this.props.walletId, index)}
          />,
        ]
      }),
      [
        "",
        "",
        "",
        this.props.totalBtcValue && (
          <b>{this.props.totalBtcValue.toFixed(8)} BTC</b>
        ),
        this.props.totalBtcValue && (
          <b>
            {`${this.fiatCurrencySign[this.props.btc.fiatCurrency]} ${(
              this.props.totalBtcValue * this.props.btc.value
            ).toFixed(2)}`}
          </b>
        ),
        "",
      ],
    ]
  }

  enterEditCoin = (row) => {
    this.setState({ editCoin: row })
  }

  cancelEditCoin = () => {
    this.setState({ editCoin: -1 })
  }

  saveEditCoin = () => {
    this.cancelEditCoin()
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

const mapDispatchToProps = {
  removeCoin,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)
