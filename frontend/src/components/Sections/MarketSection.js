import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTC } from "ducks/Btc"
import Section from "components/Common/Section"

const MarketSection = ({ btc, coins }) => {
  useEffect(() => {
    console.log("market/coins", coins)
  }, [JSON.stringify(coins)])

  return (
    <Section title="Current Market">
      {coins.length === 0 ? (
        "Add altcoins to your wallets to see market information about them"
      ) : (
        <MarketInfo btc={btc} coins={coins} />
      )}
    </Section>
  )
}

const MarketInfo = ({ btc, coins }) => {
  const fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }

  return (
    <div className="d-flex flex-row">
      {coins.map((coin) => {
        const fiatCurrentValue = (coin.value * btc.value).toFixed(2)
        return (
          <Card>
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
              width={24}
            />
            <div className="OpenSans">{`${coin.name}`}</div>
            <div className="OpenSans font-weight-bold">{`${
              fiatCurrencySign[btc.fiatCurrency]
            } ${fiatCurrentValue}`}</div>
            <div className="OpenSans">{`${coin.value}`}</div>
          </Card>
        )
      })}
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSection)
