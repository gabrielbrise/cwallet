import React from "react"
import styled from "styled-components"

const Select = ({ id, options, onChange }) => (
  <Container id={id} onChange={onChange}>
    {options.map(({ value, title }, index) => (
      <option value={value} key={`${index}-${title}`}>
        {title}
      </option>
    ))}
  </Container>
)

export default Select

const Container = styled.select`
  background-color: transparent;
  color: #333;
  border-color: #333;
  border-radius: 3px;
`
