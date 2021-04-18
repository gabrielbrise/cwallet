import React from "react"
import classNames from "classnames"
import styled from "styled-components"

const Table = ({ header, body }) => {
  return (
    <Container className="Montserrat TextLight StickyHeader">
      {header && (
        <thead>
          <tr className="TableHeader FS3x Uppercase" style={{ paddingTop: 24 }}>
            {header.map((name, index) => (
              <th key={`table-header-${index}`}>{name}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {body.map((row, index) => (
          <tr className="TableRow ColorBlack3" key={`table-row-${index}`}>
            {row.map((cell, key) => (
              <Column key={`table-row-${index}-${key}`} data={cell} />
            ))}
          </tr>
        ))}
      </tbody>
    </Container>
  )
}

const Column = ({ data }) => {
  if (!data?.children) return <td className="FS2x py-1 PR24">{data}</td>
  const { className, ...props } = data
  return <td className={classNames("FS2x py-1 PR24", className)} {...props} />
}

const Container = styled.table`
  width: 100%;
  border-spacing: 0;
  tr {
    td:first-child,
    th:first-child {
      padding-left: 32px;
    }
    td:last-child,
    th:last-child {
      padding-right: 24px;
    }
  }

  .TableHeader,
  .TableRow {
    text-align: left;
  }
  .TableHeader {
    th {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .TablePosition {
    text-align: center;
  }
  .TableRow {
    :nth-child(odd) {
      background-color: #f5f5f5;
    }
  }
  &.StickyHeader {
    th {
      position: sticky;
      top: 0;
      z-index: 5;
      background: #fff;
    }
  }
`

export default Table
