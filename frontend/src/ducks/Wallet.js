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

export function addCoin({ name, value }) {
  return {
    type: types.ADD_COIN,
    payload: {
      name,
      value,
    },
  }
}
