// store/ducks/auth.js

// Action Types

export const types = {
  ADD_COIN: "wallet/ADD_COIN",
  REMOVE_COIN: "wallet/REMOVE_COIN",
  UPDATE_COIN: "wallet/UPDATE_COIN",
}

// Reducer

const initialState = [
  {
    name: "BTC",
    value: 1.2321,
    id: 1,
  },
]

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_COIN:
      return [...state, action.payload]
    default:
      return state
  }
}

// Action Creators

export function addCoin({ id, name, value }) {
  fetch(`http://localhost:5000/api/v1/btc/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return {
        type: types.ADD_COIN,
        payload: {
          id,
          name,
          value,
          btc_price: data.btc_price,
        },
      }
    })
    .catch(console.error)
}
