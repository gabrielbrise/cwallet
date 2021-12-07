import React, { useEffect } from "react"
import PlusSign from "./PlusSign"
import styled from "styled-components"
import { connect } from "react-redux"
import { addWallet } from "ducks/Wallets"
import Icon from "components/Common/Icon"

const SaveWallets = ({ wallets, saveWallets }) => {
  const handleSaveWallets = async () => {
    const blob = new Blob([JSON.stringify(wallets, null, 2)], {
      type: "application/json",
    })
    const a = document.createElement("a")
    a.download = "my-file.json"
    a.href = URL.createObjectURL(blob)
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000)
    })
    a.click()
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-end"
      onClick={() => handleSaveWallets()}
    >
      <h2 className="d-none d-md-inline h6 pr-2 m-0">SAVE WALLETS</h2>
      <Icon name="save" />
    </Container>
  )
}

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {
  //   addWallet,
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveWallets)

const Container = styled.div`
  cursor: pointer;
  transition: color 0.2s ease;
  color: white;
  :hover {
    color: var(--primary);
  }
`
