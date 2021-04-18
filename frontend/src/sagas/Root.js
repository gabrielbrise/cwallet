import { BTCSaga } from "ducks/Btc"
import { MarketSaga } from "ducks/Market"
import { WalletsSaga } from "ducks/Wallets"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([BTCSaga(), WalletsSaga(), MarketSaga()])
}
