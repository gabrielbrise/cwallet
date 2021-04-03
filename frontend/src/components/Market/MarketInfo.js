import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTC } from "ducks/Btc"

const MarketInfo = ({ btc, coins, updateBTC }) => {
  useEffect(() => {
    updateBTC("BRL")
  }, [])

  useEffect(() => {
    console.log("market/coins", coins)
  }, [JSON.stringify(coins)])

  const fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }

  return (
    <div className="d-flex flex-row">
      {btc.value && (
        <Card>
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`}
            width={24}
          />
          <div style={{ color: "#888" }}>{btc.fiatCurrency}</div>
          <div className="OpenSans font-weight-bold">
            {`${fiatCurrencySign[btc.fiatCurrency]} ${btc.value.toFixed(2)}`}
          </div>
        </Card>
      )}
      {coins.map((coin, index) => (
        <Card key={`${coin.id}-${index}`}>
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            width={24}
          />
          <div className="OpenSans font-weight-bold">{`${coin.value}`}</div>
        </Card>
      ))}
    </div>
  )
}

const Card = ({ children }) => (
  <div className="p-2 mx-2 d-flex flex-column align-items-center justify-content-center">
    {children}
  </div>
)

const mapStateToProps = (state) => ({
  btc: state.btc,
  coins: state.market.coins,
})

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo)
