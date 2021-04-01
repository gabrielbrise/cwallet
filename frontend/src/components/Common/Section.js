import React from "react"
import classnames from "classnames"

const Section = ({ title, cardClassName, cardStyle, children }) => (
  <section className="mb-4">
    <h2 className="h4 text-secondary OpenSans">{title}</h2>
    <div
      className={classnames("card card-body", cardClassName)}
      style={cardStyle}
    >
      {children}
    </div>
  </section>
)
export default Section
