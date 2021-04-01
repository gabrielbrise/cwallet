import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Select from "./Common/Select"
import AddWallet from "./Wallets/AddWallet"
import { updateBTC } from "ducks/Btc"

const Header = ({ updateBTC }) => {
  const options = [
    {
      value: "BRL",
      title: "Brazilian Real (R$)",
    },
    {
      value: "USD",
      title: "United States Dollar ($)",
    },
  ]

  const onChange = (e) => updateBTC(e.target.value)
  return (
    <Container>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 same-width-columns">
        <div className="pl-4">
          <h2 className="d-inline h6 pr-2">FIAT CURRENCY</h2>
          <Select id="fiatCurrency" options={options} onChange={onChange} />
        </div>
        <h1 className="h5 mb-0 text-strong text-center">cwallet</h1>
        <AddWallet />
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => ({ btc: state.btc })

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const Container = styled.header`
  display: fixed;
  min-height: 32px;
  background-color: #f7931a;
  .same-width-columns {
    > * {
      flex-grow: 1;
      width: 33.33%;
    }
    :last-child {
      justify-content: right;
    }
  }
`
