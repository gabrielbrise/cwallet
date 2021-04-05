import React from "react"
import styled from "styled-components"
import classnames from "classnames"

const Icon = ({ name, outlined = false, className, onClick }) => {
  const styleType = {
    filled: "material-icons",
    outlined: "material-icons-outlined",
    rounded: "material-icons-round",
    sharp: "material-icons-sharp",
    twoTone: "material-icons-two-tone",
  }
  const style = outlined ? styleType.outlined : styleType.filled
  return (
    <Container
      className={classnames({ pointer: onClick }, className)}
      onClick={onClick}
    >
      <span className={style}>{name}</span>
    </Container>
  )
}

export default Icon

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  &.pointer {
    cursor: pointer;
  }
`
