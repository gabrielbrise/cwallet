import React, { useEffect } from "react"
import { connect } from "react-redux"
import { updateBTCValue } from "ducks/Market"
import BtcIcon from "../../../public/assets/btc.svg"

const MarketInfo = ({ btc, dispatch }) => {
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/btc")
      .then((res) => res.json())
      .then((data) => {
        console.log("ewwefwef", data)
        return dispatch(updateBTCValue(data))
      })
      .catch(console.error)
  }, [])

  return (
    <div className="d-flex flex-row">
      <Card>
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`}
          width={24}
        />
        <div style={{ color: "#888" }}>BRL</div>
        <div className="OpenSans font-weight-bold">
          R$ {btc.BTC_BRL.toFixed(2)}
        </div>
      </Card>
      <Card>
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`}
          width={24}
        />
        <div style={{ color: "#888" }}>USD</div>
        <div className="OpenSans font-weight-bold">
          ${btc.BTC_USD.toFixed(2)}
        </div>
      </Card>
    </div>
  )
}

const Card = ({ children }) => (
  <div className="p-2 mx-2 d-flex flex-column align-items-center justify-content-center">
    {children}
  </div>
)

export default connect((store) => ({
  btc: store.market.btc,
}))(MarketInfo)
