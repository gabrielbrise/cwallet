import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Section from "components/Common/Section"
import UpdateMarketButton from "components/Market/UpdateMarketButton"

const MarketSection = ({ btc, coins }) => {
  return (
    <Section
      title="Current Market"
      headerChildren={<UpdateMarketButton />}
      cardStyle={{ overflow: "scroll" }}
    >
      {coins.length === 0 || (coins.length === 1 && coins[0].id === 1) ? (
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
        if (coin.id === 1) return null
        const fiatCurrentValue = (coin.value * btc.value).toFixed(2)
        return (
          <Card key={`market-coin-${coin.id}`}>
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
  <div
    className="py-2  px-3 d-flex flex-column align-items-center justify-content-center"
    style={{ borderRight: "1px solid #eee", minWidth: 135 }}
  >
    {children}
  </div>
)

const mapStateToProps = (state) => ({
  btc: state.btc,
  coins: state.market.coins,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSection)
