import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTC } from "ducks/Btc"
import Section from "components/Common/Section"

const BitcoinSection = ({ btc, coins, updateBTC }) => {
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
    <Section
      title="Bitcoin"
      cardClassName="bg-primary"
      cardStyle={{
        backgroundImage:
          "url(https://s2.coinmarketcap.com/static/img/coins/128x128/1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
        backgroundSize: "contain",
      }}
    >
      <div className="d-flex flex-row">
        {btc.value && (
          <div style={{ marginLeft: 90 }}>
            <div>{btc.fiatCurrency}</div>
            <div className="OpenSans font-weight-bold">
              {`${fiatCurrencySign[btc.fiatCurrency]} ${btc.value.toFixed(2)}`}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

const Card = ({ children }) => (
  <div className="p-2 mx-2 d-flex flex-column align-items-center justify-content-center">
    {children}
  </div>
)

const mapStateToProps = (state) => ({
  btc: state.btc,
})

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinSection)
