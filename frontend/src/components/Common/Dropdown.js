import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Modal from "./Modal"

const Dropdown = ({ show, children }) => {
  if (!show) return null
  return (
    <Modal id="jhf32084hf3">
      <>
        <Container className="card position-absolute bg-dark">
          {children}
        </Container>
      </>
    </Modal>
  )
}

export default Dropdown

const Container = styled.div`
  top: 32px;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
  background-color: black;
  > * {
    border-bottom: 1px solid #333;
    padding: 8px 12px;
  }
  @media (min-width: 768px) {
    right: 20vw;
  }
`
