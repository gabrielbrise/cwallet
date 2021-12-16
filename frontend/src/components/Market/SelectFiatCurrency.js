import React from "react"
import Select from "components/Common/Select"
import { updateBTC } from "ducks/Btc"
import { connect } from "react-redux"
import styled from "styled-components"

const SelectFiatCurrency = ({ updateBTC }) => {
  const onChange = (e) => updateBTC(e.target.value)

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

  return (
    <Container className="pl-4 text-white d-flex align-items-start flex-column">
      <h2 className="d-block h6 pr-2">FIAT CURRENCY</h2>
      <Select id="fiatCurrency" options={options} onChange={onChange} />
    </Container>
  )
}

const mapStateToProps = (state) => ({ btc: state.btc })

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFiatCurrency)

const Container = styled.div`
  select {
    color: white;
    border-color: white;
  }
`
