const express = require("express")
const {
  btcCurrentValue,
  currentCoinsList,
  coinBtcCurrentValue,
} = require("./controllers/MarketController")

const router = express.Router()

router.route("/btc/:fiatCurrency").get(btcCurrentValue)
router.route("/coins-list").get(currentCoinsList)
router.route("/coin/:id").get(coinBtcCurrentValue)

module.exports = router
