// store/ducks/auth.js

// Types

export const types = {
  UPDATE_COINS: "market/UPDATE_COINS",
  UPDATE_COINS_START: "market/UPDATE_COINS_START",
  ADD_COIN: "market/ADD_COIN",
}

// Reducer

const initialState = {
  coins: [],
}

export function marketReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_COINS:
      return { coins: [...action.coins] }
    case types.ADD_COIN:
      return { coins: [...state.coins, action.coin] }
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
