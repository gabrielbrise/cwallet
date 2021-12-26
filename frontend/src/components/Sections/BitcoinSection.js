import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTC } from "ducks/Btc"
import Section from "components/Common/Section"
import styled from "styled-components"

const BitcoinSection = ({
  btc,
  coins,
  updateBTC,
  totalWalletsValue,
  totalWalletsBTCValue,
}) => {
  useEffect(() => {
    updateBTC("BRL")
  }, [])

  useEffect(() => {}, [JSON.stringify(coins)])

  const fiatCurrencySign = {
    USD: "$",
    BRL: "R$",
  }

  return (
    <Container className="container">
      <div className="row">
        <Section
          title="Total Value"
          cardClassName="bg-primary d-flex justify-content-center"
          className="flex-grow-1 mr-md-2 col-md px-0"
          cardStyle={{ height: 120, fontSize: "2rem" }}
        >
          <div className="d-flex">
            {btc.value && (
              <div>
                <div className="OpenSans font-weight-bold text-white">
                  <div className="text-gray h6 mb-0">{btc.fiatCurrency}</div>
                  {`${
                    fiatCurrencySign[btc.fiatCurrency]
                  } ${totalWalletsValue.toFixed(2)}`}
                </div>
                <div className="OpenSans text-white" style={{ fontSize: 12 }}>
                  {totalWalletsBTCValue.toFixed(8)} BTC
                </div>
              </div>
            )}
          </div>
        </Section>
        <Section
          title="Bitcoin Value"
          className="flex-grow-1 ml-md-2 col-md px-0"
          cardClassName="d-flex justify-content-center btc-icon"
        >
          <div className="d-flex flex-row">
            {btc.value && (
              <div className="btc-icon-margin-left">
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
    </Container>
  )
}

const Container = styled.div`
  .btc-icon {
    @media (min-width: 768px) {
      height: 120px;
      background-image: url(https://s2.coinmarketcap.com/static/img/coins/128x128/1.png);
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: 12px;
      background-size: 90px;
      filter: grayscale(100%) brightness(60%) contrast(500%) opacity(80%);
    }
  }
  .btc-icon-margin-left {
    @media (min-width: 768px) {
      margin-left: 100px;
    }
  }
`

const getTotalWalletsValue = (wallets, btc, market) => {
  if (wallets.length === 0) return 0
  return wallets.reduce((acc, wallet) => {
    return acc + getWalletTotalBTCValue(wallet, market.coins) * btc.value
  }, 0)
}

const getTotalWalletsBTCValue = (wallets, btc, market) => {
  if (wallets.length === 0) return 0
  return wallets.reduce((acc, wallet) => {
    return acc + getWalletTotalBTCValue(wallet, market.coins)
  }, 0)
}

const getWalletTotalBTCValue = (wallet, marketCoins) => {
  let coinToBtcValue = {}
  if (!wallet.coins.length || !marketCoins.length) return 0

  marketCoins.forEach((coin) => {
    coinToBtcValue[coin.id] = coin.value
  })
  const totalBTCValue = wallet.coins.reduce(
    (acc, coin) => acc + coin.amount * coinToBtcValue[coin.id],
    0
  )
  return totalBTCValue
}

const mapStateToProps = (state) => ({
  btc: state.btc,
  coins: state.market.coins,
  totalWalletsValue:
    getTotalWalletsValue(state.wallets, state.btc, state.market) || 0,
  totalWalletsBTCValue:
    getTotalWalletsBTCValue(state.wallets, state.btc, state.market) || 0,
})

const mapDispatchToProps = {
  updateBTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinSection)
