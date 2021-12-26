import React from "react"
import styled from "styled-components"
import Menu from "./Common/Menu"

const Header = () => {
  return (
    <Container>
      <Menu />
      <div className="d-flex flex-row align-items-center justify-content-center w-100">
        <h1 className="h5 mb-0 text-strong text-center">cwallet</h1>
      </div>
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  width: 100vw;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  height: 32px;
  background-color: #f7931a;
  box-shadow: 0 4px 8px -8px #333;
`
