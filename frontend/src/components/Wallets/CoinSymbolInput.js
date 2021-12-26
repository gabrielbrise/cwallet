import React, { useState, useEffect } from "react"
import { API_BASE_URL } from "helpers/URL"
import Select from "react-select/async"
import { createFilter } from "react-select"
import { FixedSizeList as List } from "react-window"

const CoinSymbolInput = ({ name }) => {
  return (
    <div className="flex-grow-1 pr-2">
      <Select
        components={{ MenuList }}
        name={name}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        filterOption={createFilter({ ignoreAccents: false })}
      />
    </div>
  )
}

const loadOptions = (inputValue, callback) => {
  const localList = localStorage.getItem("coins-list")
  if (localList) {
    const options = JSON.parse(localList).map((coin) => ({
      value: JSON.stringify({ id: coin.id, name: coin.name }),
      label: `${coin.symbol} - ${coin.name}`,
    }))
    callback(options)
  }
  if (!localList) {
    fetch(`${API_BASE_URL}/api/v1/coins-list`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("coins-list", JSON.stringify(data.list))
        const options = data.list.map((coin) => ({
          value: JSON.stringify({ id: coin.id, name: coin.name }),
          label: `${coin.symbol} - ${coin.name}`,
        }))

        callback(options)
      })
  }
}

class MenuList extends React.Component {
  render() {
    const { options, children, getValue } = this.props
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * 35

    return (
      <List
        height={300}
        itemCount={children.length || 8548}
        itemSize={35}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
}

export default CoinSymbolInput
