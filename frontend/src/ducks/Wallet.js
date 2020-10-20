import { API_BASE_URL } from "../helpers/URL"

// Action Types

export const types = {
  ADD_COIN: "wallet/ADD_COIN",
  REMOVE_COIN: "wallet/REMOVE_COIN",
  UPDATE_COIN: "wallet/UPDATE_COIN",
}

// Reducer

const localStorageInitialState = localStorage.getItem("coins")

const initialState = localStorageInitialState
  ? JSON.parse(localStorageInitialState)
  : []

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_COIN:
      return [...state, action.payload]
    case types.REMOVE_COIN:
      const removedCoinState = state.filter(
        (_, index) => index !== action.payload.index
      )
      console.log(removedCoinState)
      return [...removedCoinState]
    default:
      return state
  }
}

// Action Creators

export function addCoin({ id, name, amount }) {
  return {
    type: types.ADD_COIN,
    payload: {
      id,
      name,
      amount,
    },
  }
}

export function removeCoin(index) {
  return {
    type: types.REMOVE_COIN,
    payload: {
      index,
    },
  }
}

// Middleware

export const addCoinBTCValue = (store) => (next) => (action) => {
  if (action.type === types.ADD_COIN) {
    return fetch(`${API_BASE_URL}/api/v1/coin/${action.payload.id}`)
      .then((res) => res.json())
      .then((data) => {
        const btcValue = data.btc_price
        const totalBTC = btcValue * action.payload.amount
        const resultWithBTCValue = {
          type: action.type,
          payload: {
            ...action.payload,
            btcValue,
            totalBTC,
          },
        }
        let result = next(resultWithBTCValue)
        return result
      })
      .catch(console.error)
  }

  let result = next(action)
  return result
}
