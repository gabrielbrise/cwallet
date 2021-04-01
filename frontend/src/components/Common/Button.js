import React from "react"
import styled from "styled-components"

const Button = ({ children }) => (
  <Container className="Raleway">{children}</Container>
)

export default Button

const Container = styled.button`
  border-radius: 3px;
  border-color: #333;
  padding: 0 8px;
  background-color: #333;
  color: white;
  height: 24px;
  width: 24px;
`
