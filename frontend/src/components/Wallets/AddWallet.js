import React, { useEffect } from "react"
import PlusSign from "./PlusSign"
import styled from "styled-components"
import { connect } from "react-redux"
import { addWallet } from "ducks/Wallets"
import Icon from "components/Common/Icon"

const AddWallet = ({ wallets, addWallet }) => {
  const onClick = (e) => {
    addWallet({ name: `Wallet ${wallets.length}` })
  }

  return (
    <Container
      className="d-flex pr-4 align-items-center justify-content-end"
      onClick={onClick}
    >
      <h2 className="d-none d-md-inline h6 pr-2 m-0">ADD WALLET</h2>
      <Icon name="account_balance_wallet" />
      <Icon name="add" outlined />
    </Container>
  )
}

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {
  addWallet,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWallet)

const Container = styled.div`
  cursor: pointer;
  transition: color 0.2s ease;
  :hover {
    color: white;
  }
`
