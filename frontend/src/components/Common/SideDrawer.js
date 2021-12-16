import React, { useEffect } from "react"
import styled from "styled-components"
import AddWallet from "components/Wallets/AddWallet"
import SaveWallets from "components/Wallets/SaveWallets"
import LoadWallets from "components/Wallets/LoadWallets"
import SelectFiatCurrency from "components/Market/SelectFiatCurrency"
import Modal from "./Modal"
import cx from "classnames"

const SideDrawer = ({ show, setShow }) => {
  useEffect(() => {
    const el = document.createElement("div")
    el.onclick = () => setShow(false)
    if (show) {
      const attributes = {
        width: "100vw",
        height: "100vh",
        display: "block",
        "background-color": "#333",
        opacity: "0.35",
        position: "absolute",
        top: window.scrollY.toString() + "px" || "0",
        left: "0",
        "z-index": "9",
      }
      Object.entries(attributes).forEach(([key, value]) => {
        el.style[key] = value
      })
      try {
        document.body.appendChild(el)
        document.body.classList.add("open-modal-freeze")
      } catch (error) {}
    }

    if (!show) {
      try {
        document.body.removeChild(el)
        document.body.classList.remove("open-modal-freeze")
      } catch (error) {}
    }
    return () => {
      try {
        document.body.removeChild(el)
        document.body.classList.remove("open-modal-freeze")
      } catch (error) {}
    }
  }, [show])
  return (
    <Modal>
      <Container className={cx({ show })} style={{ top: window.scrollY }}>
        <SaveWallets extended={show} />
        <LoadWallets extended={show} />
        <AddWallet extended={show} />
        {show && <SelectFiatCurrency />}
      </Container>
    </Modal>
  )
}

export default SideDrawer

const Container = styled.div`
  height: 100vh;
  width: 250px;
  transform: translateX(-250px);
  transition: transform 0.2s ease;
  display: flex;
  position: absolute;
  left: 0;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background: #333;
  color: var(--primary);
  z-index: 999;
  &.show {
    transform: translateX(0);
  }
  > * {
    border-bottom: 1px solid #aaa;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`
