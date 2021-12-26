import React, { useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import Icon from "components/Common/Icon"

const SaveWallets = ({ wallets }) => {
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
    <Container className="d-flex" onClick={() => handleSaveWallets()}>
      <Icon name="save" className="mx-1" />
      <h2 className="h6 pr-2 m-0">SAVE WALLETS</h2>
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
