import React from "react"
import cx from "classnames"

const Section = ({
  title,
  headerChildren,
  headerClassName,
  titleClassName,
  cardClassName,
  cardStyle,
  className,
  children,
}) => (
  <div className={cx("mb-4", className)}>
    <div className={cx("d-flex", headerClassName)}>
      <h2 className={cx("h4 text-secondary OpenSans", titleClassName)}>
        {title}
      </h2>
      {headerChildren}
    </div>
    <div className={cx("card card-body", cardClassName)} style={cardStyle}>
      {children}
    </div>
  </div>
)
export default Section
