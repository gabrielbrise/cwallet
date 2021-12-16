import React, { useState } from "react"
import styled from "styled-components"
import Icon from "./Icon"
import SideDrawer from "./SideDrawer"

const Menu = () => {
  const [show, setShow] = useState(false)

  return (
    <Container className="Raleway d-flex justify-content-center align-items-center">
      <Icon name="menu" onClick={() => setShow(!show)} className="p-1" />
      <SideDrawer show={show} setShow={setShow} />
    </Container>
  )
}

export default Menu

const Container = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  position: relative;
  background-color: #333;
  align-items: flex-start;
  color: white;
`
