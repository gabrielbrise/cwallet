import React, { useState } from "react"
import { connect } from "react-redux"
import styled, { keyframes } from "styled-components"
import classnames from 'classnames'
import Icon from "components/Common/Icon"
import SmoothCollapse from "components/Common/SmoothCollapse"
import { updateMarket } from "ducks/Market"

const UpdateMarketButton = ({ updateMarket }) => {
  const [onHover, setOnHover] = useState(false)
  const [animated, setAnimated] = useState(false)

  const update = () => {
    setAnimated(true)
    updateMarket()
  }

  return (
    <Container
      className="px-1 py-1 mb-2"
      role="button"
      onClick={() => update()}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onAnimationEnd={() => setAnimated(false)}
    >
      <SmoothCollapse className={classnames({ "mr-1": onHover, "ml-2": onHover })} show={onHover}>
        UPDATE VALUES
      </SmoothCollapse>
      <Icon name="sync" className={classnames({ animated }, "iconAdjust")} />
    </Container>
  )
}

const oneTimeRefresh = keyframes`
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(180deg);
    }
  `

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
	.animated {
    animation: ${oneTimeRefresh} 2s ease 1;
  }
  :hover {
    background-color: var(--primary);
    border-color: var(--primary);
    > * {
      color: white;
    }
  }
  .iconAdjust {
    padding-left: 1px;
  }
`

const mapDispatchToProps = { updateMarket }

export default connect(null, mapDispatchToProps)(UpdateMarketButton)
