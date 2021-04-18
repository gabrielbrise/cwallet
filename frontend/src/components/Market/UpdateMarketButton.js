import React, { useState } from "react"
import { connect } from "react-redux"
import styled, { keyframes } from "styled-components"
import classnames from "classnames"
import Icon from "components/Common/Icon"
import { updateMarket } from "ducks/Market"

const UpdateMarketButton = ({ updateMarket }) => {
  const [animated, setAnimated] = useState(false)

  const update = () => {
    setAnimated(true)
    updateMarket()
  }

  return (
    <Container
      className="d-flex align-items-center mb-1 ml-1"
      onAnimationEnd={() => setAnimated(false)}
    >
      <Icon
        name="sync"
        className={classnames("refresh", { animated })}
        onClick={update}
      />
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
  .refresh {
    color: var(--secondary);
    cursor: pointer;
    :hover {
      color: var(--primary);
    }
  }
  .animated {
    animation: ${oneTimeRefresh} 2s ease 1;
  }
`

const mapDispatchToProps = { updateMarket }

export default connect(null, mapDispatchToProps)(UpdateMarketButton)
