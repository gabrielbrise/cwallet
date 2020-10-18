import React, { useState, useEffect } from "react"

const CoinSymbolInput = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const localList = localStorage.getItem("coins-list")
    if (localList) setList(JSON.parse(localList))
    if (!localList) {
      fetch("http://localhost:5000/api/v1/coins-list")
        .then((res) => res.json())
        .then((data) => {
          setList(data.list)
          localStorage.setItem("coins-list", JSON.stringify(data.list))
        })
    }
  }, [])

  return (
    <select className="form-control mr-2" name="coin">
      {list.map((coin, index) => (
        <option value={JSON.stringify(coin)} key={`coin-${coin.id}-${index}`}>
          {coin.symbol} - {coin.name}
        </option>
      ))}
    </select>
  )
}

export default CoinSymbolInput
