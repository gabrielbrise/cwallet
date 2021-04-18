import React from "react"
import classnames from "classnames"
import styled from "styled-components"
import classNames from "classnames"

const Section = ({
  title,
  headerChildren,
  headerClassName,
  titleClassName,
  cardClassName,
  cardStyle,
  sectionClassName,
  children,
}) => (
  <Container className={classnames("mb-4", sectionClassName)}>
    <div className={classNames("d-flex", headerClassName)}>
      <h2 className={classNames("h4 text-secondary OpenSans", titleClassName)}>
        {title}
      </h2>
      {headerChildren}
    </div>
    <div
      className={classnames("card card-body", cardClassName)}
      style={cardStyle}
    >
      {children}
    </div>
  </Container>
)
export default Section

const Container = styled.section``
