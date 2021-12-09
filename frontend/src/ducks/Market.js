// store/ducks/auth.js

import { call, all, select, takeEvery, put } from "@redux-saga/core/effects"
import { fetchCoinValue } from "ducks/Wallets"

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

function* watchMarket() {
  yield takeEvery(types.UPDATE_COINS_START, fetchUpdatedCoins)
}

const getCurrentWalletsCoins = (state) =>
  state.wallets.reduce((acc, wallet) => [...acc, ...wallet.coins], [])

const filterRepeatedCoins = (coins) =>
  coins.reduce((acc, coin) => {
    console.log("acc", acc, coins)
    const accCoinsIds = acc.map(({ id }) => id)
    if (accCoinsIds.includes(coin.id)) return acc
    return [...acc, coin]
  }, [])

const getCurrentMarketCoins = (state) =>
  filterRepeatedCoins(getCurrentWalletsCoins(state))

function* fetchUpdatedCoins() {
  const coins = yield select(getCurrentMarketCoins)
  const updatedCoins = yield call(fetchAllMarketCoins, coins)
  yield put({ type: types.UPDATE_COINS, coins: updatedCoins })
}

async function fetchAllMarketCoins(coins) {
  const p = await Promise.all(
    coins.map(async (coin) =>
      fetchCoinValue(coin.id).then(({ btc_price }) => ({
        ...coin,
        value: btc_price.toFixed(8),
      }))
    )
  )
  return p
}

export function* MarketSaga() {
  yield all([watchMarket()])
}
