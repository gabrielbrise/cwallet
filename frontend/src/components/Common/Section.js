import React from "react"

const Section = ({ title, children }) => (
  <section className="mb-4">
    <h2 className="h4 text-secondary OpenSans">{title}</h2>
    <div className="card card-body">{children}</div>
  </section>
)
export default Section
