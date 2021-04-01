import React from "react"
import styled from "styled-components"

const PlusSign = () => (
  <Container>
    <span className="material-icons material-icons-outlined">add_circle</span>
  </Container>
)

export default PlusSign

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`
