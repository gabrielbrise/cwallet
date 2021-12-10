import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTC } from "ducks/Btc"
import Section from "components/Common/Section"

const BitcoinSection = ({ btc, coins, updateBTC, totalWalletsValue }) => {
  useEffect(() => {
    updateBTC("BRL")
  }, [])

  useEffect(() => {}, [JSON.stringify(coins)])

  const fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }

  return (
    <div className="container">
      <div className="row">
        <Section
          title="Total Value"
          cardClassName="bg-primary d-flex justify-content-center"
          sectionClassName="flex-grow-1 mr-md-2 col-md px-0"
          cardStyle={{ height: 120, fontSize: "3rem" }}
        >
          <div className="d-flex">
            {btc.value && (
              <div>
                <div className="OpenSans font-weight-bold text-white">
                  {`${
                    fiatCurrencySign[btc.fiatCurrency]
                  } ${totalWalletsValue.toFixed(2)}`}
                </div>
              </div>
            )}
          </div>
        </Section>
        <Section
          title="Bitcoin Value"
          sectionClassName="flex-grow-1 ml-md-2 col-md px-0"
          cardClassName="d-flex justify-content-center"
          cardStyle={{
            height: 120,
            backgroundImage:
              "url(https://s2.coinmarketcap.com/static/img/coins/128x128/1.png)",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
            backgroundPositionX: "12px",
            backgroundSize: "90px",
            filter:
              "grayscale(100%) brightness(60%) contrast(500%) opacity(80%)",
          }}
        >
          <div className="d-flex flex-row">
            {btc.value && (
              <div style={{ marginLeft: 100 }}>
                <div className="text-gray">{btc.fiatCurrency}</div>
                <div className="OpenSans font-weight-bold h2">
                  {`${fiatCurrencySign[btc.fiatCurrency]} ${btc.value.toFixed(
                    2
                  )}`}
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  )
}

const getTotalWalletsValue = (wallets, btc, market) => {
  if (wallets.length === 0) return 0
  return wallets.reduce((acc, wallet) => {
    return acc + walletTotalBTCValue(wallet, market.coins) * btc.value
  }, 0)
}

const walletTotalBTCValue = (wallet, marketCoins) => {
  let coinToBtcValue = {}
  
  marketCoins.forEach((coin) => {
    coinToBtcValue[coin.id] = coin.value
  })
  const totalBTCValue = wallet.coins.reduce((acc, coin) => (acc + coin.amount * coinToBtcValue[coin.id]), 0)
  return totalBTCValue
}

const mapStateToProps = (state) => ({
  btc: state.btc,
  coins: state.market.coins,
  totalWalletsValue: getTotalWalletsValue(state.wallets, state.btc, state.market) | 0,
})

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinSection)
