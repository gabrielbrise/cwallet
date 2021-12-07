import AddWallet from "components/Wallets/AddWallet"
import SaveWallets from "components/Wallets/SaveWallets"
import LoadWallets from "components/Wallets/LoadWallets"
import React, { useState } from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Dropdown from "./Dropdown"

const Menu = () => {
  const [show, setShow] = useState(false)

  return (
    <Container className="Raleway">
      <Icon
        name={show ? "close" : "menu"}
        onClick={() => setShow(!show)}
        className="pr-2"
      />
      <Dropdown show={show} className="card">
        <SaveWallets />
        <LoadWallets />
        <AddWallet />
      </Dropdown>
    </Container>
  )
}

export default Menu

const Container = styled.div`
  display: flex;
  justify-content: right;
  position: relative;
`
