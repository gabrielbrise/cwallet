import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { addWallet } from "ducks/Wallets"
import Icon from "components/Common/Icon"

const AddWallet = ({ wallets, addWallet, extended }) => {
  const onClick = (e) => {
    addWallet({ name: `Wallet ${wallets.length}` })
  }

  return (
    <Container className="d-flex" onClick={onClick}>
      <Icon name="add" outlined className="mx-1" />
      {extended && <h2 className="h6 pr-2 m-0">ADD WALLET</h2>}
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
  color: white;
  :hover {
    color: var(--primary);
  }
`
