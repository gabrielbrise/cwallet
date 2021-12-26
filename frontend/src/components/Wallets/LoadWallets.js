import React, { useEffect } from "react"
import PlusSign from "./PlusSign"
import styled from "styled-components"
import { connect } from "react-redux"
import { loadWallets } from "ducks/Wallets"
import Icon from "components/Common/Icon"

const LoadWallets = ({ loadWallets }) => {
  const uploadWalletsFile = () => {
    const upload = document.getElementById("fileUpload")
    upload.click()
  }

  const handleWalletsFile = (e) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const file = e.currentTarget.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        "load",
        (event) => {
          const wallets = JSON.parse(event.currentTarget.result)
          loadWallets(wallets)
        },
        { once: true }
      )
      reader.readAsText(file)
    }
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-start"
      onClick={uploadWalletsFile}
    >
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        accept=".json"
        onChange={handleWalletsFile}
      />
      <Icon name="upload" className="mx-1" />
      <h2 className="h6 pr-2 m-0">LOAD WALLETS</h2>
    </Container>
  )
}

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {
  loadWallets,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadWallets)

const Container = styled.div`
  cursor: pointer;
  transition: color 0.2s ease;
  color: white;
  :hover {
    color: var(--primary);
  }
`
