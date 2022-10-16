import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Icon from "components/Common/Icon"

const AddCoinButton = ({ onClick, expanded = false }) => {
  const [onHover, setOnHover] = useState(false)

  return (
    <Container
      className="px-1"
      role="button"
      onClick={onClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Icon name="add" />
      <SmoothCollapse className="mr-1" show={onHover || expanded}>
        ADD COIN
      </SmoothCollapse>
      <Icon name="monetization_on" />
    </Container>
  )
}

export default AddCoinButton

const SmoothCollapse = ({ className, show, children }) => {
  const [width, setWidth] = useState("0")
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth + "px")
    }
  }, [show])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        maxWidth: show ? width : 0,
        transition: "all 0.2s ease",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  )
}

const Container = styled.div`
  white-space: nowrap;
  border-color: var(--secondary);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  display: flex;
  flex-direction: center;
  align-items: center;

  > * {
    display: inline;
  }
  :hover {
    background-color: var(--primary);
    border-color: var(--primary);
    > * {
      color: white;
    }
  }
`
