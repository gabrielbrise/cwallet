import { API_BASE_URL } from "../helpers/URL"
import { v4 as uuidv4 } from "uuid"
import { types as MARKET_TYPES } from "./Market"
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects"

// Action Types

export const types = {
  ADD_COIN: "wallets/ADD_COIN",
  REMOVE_COIN: "wallets/REMOVE_COIN",
  UPDATE_COIN: "wallets/UPDATE_COIN",
  ADD_WALLET: "wallets/ADD_WALLET",
  CALCULATE_WALLET_BTC_VALUE: "wallets/CALCULATE_WALLET_BTC_VALUE",
}

// Reducer

const localStorageInitialState = localStorage.getItem("wallets")

const initialState = localStorageInitialState
  ? JSON.parse(localStorageInitialState)
  : [
      {
        name: "My first crypto wallet",
        id: "2098hwdw8hf",
        coins: [],
        totalBtcValue: 0,
      },
    ]

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_COIN:
      const unalteredWallets = state.filter(
        (wallet) => action.payload.walletId !== wallet.id
      )
      const alteredWallet = state.find(
        (wallet) => action.payload.walletId === wallet.id
      )
      const newCoin = {
        id: action.payload.id,
        name: action.payload.name,
        amount: action.payload.amount,
      }
      return [
        ...unalteredWallets,
        { ...alteredWallet, coins: [...alteredWallet.coins, newCoin] },
      ]
    case types.REMOVE_COIN:
      const removedCoinState = state.filter(
        (_, index) => index !== action.payload.index
      )
      return [...removedCoinState]
    case types.ADD_WALLET:
      return [...state, { name: action.payload.name, id: uuidv4(), coins: [] }]
    case types.CALCULATE_WALLET_BTC_VALUE:
      const walletIndex = state.findIndex(
        (wallet) => wallet.id === action.wallet.id
      )
      if (state.length === 1)
        return [
          { ...state[walletIndex], totalBtcValue: action.wallet.totalBtcValue },
        ]
      return [
        ...state.slice(0, walletIndex),
        { ...state[walletIndex], totalBtcValue: action.wallet.totalBtcValue },
        ...state.slice(walletIndex + 1),
      ]
    default:
      return state
  }
}

// Action Creators

export function addCoin({ id, name, amount, walletId }) {
  return {
    type: types.ADD_COIN,
    payload: {
      id,
      name,
      amount,
      walletId,
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

export function addWallet({ name }) {
  return {
    type: types.ADD_WALLET,
    payload: {
      name,
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

// Sagas

function* watchWallets() {
  yield takeEvery(types.ADD_COIN, checkForNewCoins)
}

function* checkForNewCoins(action) {
  const currentCoins = yield select(getCurrentMarketCoins)
  if (
    (currentCoins.length == 0) |
    !currentCoins.some((coin) => coin.id === action.payload.id)
  ) {
    const coinCurrentValue = yield call(fetchCoinValue, action.payload.id)
    yield put({
      type: MARKET_TYPES.ADD_COIN,
      coin: {
        id: action.payload.id,
        name: action.payload.name,
        value: coinCurrentValue.btc_price.toFixed(8),
      },
    })
  }
  const wallets = yield select(getWallets)
  const currentWalletCoins = wallets.find(
    (w) => w.id === action.payload.walletId
  )
  const marketCoins = yield select(getCurrentMarketCoins)
  const walletBTCValue = currentWalletCoins.coins.reduce((acc, coin) => {
    return acc + coin.amount * marketCoins.find((c) => c.id === coin.id).value
  }, 0)

  yield put({
    type: types.CALCULATE_WALLET_BTC_VALUE,
    wallet: {
      id: action.payload.walletId,
      totalBtcValue: walletBTCValue,
    },
  })
}

const getWallets = (state) => state.wallets

const getCurrentMarketCoins = (state) => state.market.coins

function fetchCoinValue(coinId) {
  return fetch(`${API_BASE_URL}/api/v1/coin/${coinId}`)
    .then((res) => res.json())
    .catch(console.error)
}

export function* WalletsSaga() {
  yield all([watchWallets()])
}
