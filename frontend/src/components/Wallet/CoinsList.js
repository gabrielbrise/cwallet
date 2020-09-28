import React, { Component } from "react"
import { connect } from "react-redux"

class CoinsList extends Component {
  render() {
    return (
      <>
        {this.props.coins.map((coin, index) => (
          <div key={`coin-${coin.name}-${index}`}>
            <span>{coin.name}</span>
            <span>{coin.value}</span>
          </div>
        ))}
      </>
    )
  }
}

export default connect((store) => ({
  coins: store.coins,
}))(CoinsList)
