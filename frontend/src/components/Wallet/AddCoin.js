import React, { Component } from "react"
import { connect } from "react-redux"
import { addCoin } from "../../ducks/Wallet"

class AddCoin extends Component {
  addCoin = (e) => {
    const coin = {
      name: e.target.name.value,
      value: e.target.value.value,
    }
    console.log(coin)

    e.preventDefault()
    this.props.dispatch(addCoin(coin))
  }
  render() {
    return (
      <form className="form-inline" onSubmit={this.addCoin}>
        <input
          className="form-control mr-2"
          name="name"
          type="text"
          placeholder="NAME"
        ></input>
        <input
          className="form-control mr-2"
          name="value"
          type="number"
          placeholder="VALUE"
        ></input>
        <button className="btn btn-primary" type="submit">
          ADD
        </button>
      </form>
    )
  }
}

export default connect((store) => ({}))(AddCoin)
