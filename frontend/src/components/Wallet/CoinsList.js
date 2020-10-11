import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "../Common/Table"

class CoinsList extends Component {
  get getBody() {
    return this.props.coins.map((coin, index) => {
      return [
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
          width={24}
        />,
        coin.name,
        coin.value,
        <span>Edit</span>,
        <span className="Raleway text-danger" style={{ width: 50 }}>
          X
        </span>,
      ]
    })
  }

  render() {
    return (
      <>
        <Table
          header={["Icon", "Name", "Amount", ""]}
          body={this.getBody}
        ></Table>
      </>
    )
  }
}

export default connect((store) => ({
  coins: store.coins,
}))(CoinsList)
