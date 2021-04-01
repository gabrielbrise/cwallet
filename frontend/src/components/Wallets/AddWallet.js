import React, { useEffect } from "react"
import PlusSign from "./PlusSign"
import styled from "styled-components"
import { connect } from "react-redux"
import { addWallet } from "ducks/Wallets"

const AddWallet = ({ wallets, addWallet }) => {
  useEffect(() => {
    console.log("wallets", wallets)
  })

  const onClick = (e) => {
    addWallet({ name: `Wallet ${wallets.length}` })
  }

  return (
    <Container
      className="d-flex pr-4 align-items-center justify-content-end"
      onClick={onClick}
    >
      <h2 className="d-inline h6 pr-2 m-0">ADD WALLET</h2>
      <PlusSign />
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
