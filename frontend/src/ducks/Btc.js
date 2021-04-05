import { all, takeEvery, call, put } from "redux-saga/effects"
import { API_BASE_URL } from "../helpers/URL"

// Types

export const types = {
  FETCH_BTC_VALUE: "btc/FETCH_BTC_VALUE",
  UPDATE_BTC: "btc/UPDATE_BTC",
}

// Reducer

const localStorageInitialState = localStorage.getItem("btc")
const updateLocalStorage = (state) =>
  localStorage.setItem("btc", JSON.stringify(state))

const initialState = localStorageInitialState
  ? JSON.parse(localStorageInitialState)
  : {
      btc: {
        fiatCurrency: "USD",
        value: 25000,
      },
    }

export function btcReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_BTC: {
      let updatedBtc = { ...state, ...action.btc }
      updateLocalStorage(updatedBtc)
      return updatedBtc
    }
    default:
      return state
  }
}

// Action

export function updateBTC(fiatCurrency) {
  return {
    type: types.FETCH_BTC_VALUE,
    payload: {
      fiatCurrency,
    },
  }
}

// Sagas

function* watchBTC() {
  yield takeEvery(types.FETCH_BTC_VALUE, fetchBTCValue)
}

function* fetchBTCValue(action) {
  const btcValue = yield call(fetchCoinValue, action.payload.fiatCurrency)
  yield put({
    type: types.UPDATE_BTC,
    btc: { fiatCurrency: action.payload.fiatCurrency, value: btcValue },
  })
}

function fetchCoinValue(fiatCurrency) {
  return fetch(`${API_BASE_URL}/api/v1/btc/${fiatCurrency}`)
    .then((res) => res.json())
    .catch(console.error)
}

export function* BTCSaga() {
  yield all([watchBTC()])
}
