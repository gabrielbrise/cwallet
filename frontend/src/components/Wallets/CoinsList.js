import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "../Common/Table"
import { removeCoin, editCoinAmount } from "ducks/Wallets"
import EditCoin from "./EditCoin"

class CoinsList extends Component {
  fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }
  state = {
    editCoin: -1,
  }

  get getTotalBTCValue() {
    let coinToBtcValue = {}

    this.props.market.coins.forEach((coin) => {
      coinToBtcValue[coin.id] = coin.value
    })
    const totalBTCValue = this.props.coins.reduce(
      (acc, coin) => acc + coin.amount * coinToBtcValue[coin.id],
      0
    )
    return totalBTCValue
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
            <input
              defaultValue={coin.amount}
              style={{ height: 24 }}
              onChange={(e) =>
                this.setState({
                  currentCoinAmount: parseInt(e.currentTarget.value),
                })
              }
            />
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
            save={(e) =>
              this.saveEditCoin(
                this.props.walletId,
                index,
                this.state.currentCoinAmount
              )
            }
            remove={() => this.props.removeCoin(this.props.walletId, index)}
          />,
        ]
      }),
      [
        "",
        "",
        "",
        this.getTotalBTCValue && <b>{this.getTotalBTCValue.toFixed(8)} BTC</b>,
        this.getTotalBTCValue && (
          <b>
            {`${this.fiatCurrencySign[this.props.btc.fiatCurrency]} ${(
              this.getTotalBTCValue * this.props.btc.value
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

  saveEditCoin = (walletId, index, amount) => {
    this.props.editCoinAmount(walletId, index, amount)
    this.cancelEditCoin()
  }

  removeCoin = (index) => this.props.removeCoin(index)

  calculateTotal = (value) =>
    this.props.coins.reduce((_acc, coin) => _acc + coin[value], 0)

  render() {
    return (
      <>
        <Table
          header={[
            { title: "Icon" },
            { title: "Name" },
            { title: "Amount" },
            { title: "Total BTC" },
            { title: `Total ${this.props.btc.fiatCurrency}` },
            { title: "" },
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
  editCoinAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)
