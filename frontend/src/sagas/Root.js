import { BTCSaga } from "ducks/Btc"
import { WalletsSaga } from "ducks/Wallets"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([BTCSaga(), WalletsSaga()])
}
