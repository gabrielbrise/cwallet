// store/ducks/auth.js

// Types

export const types = {
  UPDATE_COINS: "market/UPDATE_COINS",
  UPDATE_COINS_START: "market/UPDATE_COINS_START",
  ADD_COIN: "market/ADD_COIN",
}

// Reducer

const localStorageInitialState = localStorage.getItem("market")
const updateLocalStorage = (state) =>
  localStorage.setItem("market", JSON.stringify(state))

const initialState = localStorageInitialState
  ? JSON.parse(localStorageInitialState)
  : {
      coins: [],
    }

export function marketReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_COINS: {
      let updatedMarket = { coins: [...action.coins] }
      updateLocalStorage(updatedMarket)
      return updatedMarket
    }
    case types.ADD_COIN: {
      let updatedMarket = { coins: [...state.coins, action.coin] }
      updateLocalStorage(updatedMarket)
      return updatedMarket
    }
    default:
      return state
  }
}

// Action

export function updateMarket() {
  return {
    type: types.UPDATE_COINS_START,
  }
}
