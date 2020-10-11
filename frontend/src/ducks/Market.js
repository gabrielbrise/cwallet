// store/ducks/auth.js

// Types

export const types = {
  UPDATE_BTC: "market/UPDATE_BTC",
}

// Reducer

const initialState = {
  btc: {
    BTC_USD: 0,
    BTC_BRL: 0,
  },
}

export function marketReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case types.UPDATE_BTC:
      return { btc: action.payload }
    default:
      return state
  }
}

// Action

export function updateBTCValue({ BTC_USD, BTC_BRL }) {
  return {
    type: types.UPDATE_BTC,
    payload: {
      BTC_USD,
      BTC_BRL,
    },
  }
}
