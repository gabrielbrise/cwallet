import React, { Component } from "react"
import { connect } from "react-redux"
import CoinSymbolInput from "components/Wallets/CoinSymbolInput"
import { addCoin } from "ducks/Wallets"
import styled from "styled-components"

class AddCoin extends Component {
  addCoin = (e) => {
    const coin = {
      id: JSON.parse(e.target.coin.value).id,
      name: JSON.parse(e.target.coin.value).name,
      amount: Number(e.target.amount.value),
      walletId: this.props.walletId,
    }

    e.preventDefault()
    this.props.addCoin(coin)
    this.props.setAddCoin(false)
  }
  cancel = (e) => {
    e.preventDefault()
    this.props.setAddCoin(false)
  }
  render() {
    return (
      <Container className="form-inline mt-4" onSubmit={this.addCoin}>
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
        <button className="btn btn-danger ml-2" onClick={this.cancel}>
          cancel
        </button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {
  addCoin,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoin)

const Container = styled.form`
  display: flex;
  max-width: 90vw;
  > * {
    max-width: 45%;
  }
  > :last-child {
    max-width: 10%;
  }
`
