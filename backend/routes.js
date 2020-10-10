const express = require("express")
const {
  btcCurrentValue,
  currentCoinsList,
} = require("./controllers/MarketController")

const router = express.Router()

router.route("/btc").get(btcCurrentValue)
router.route("/coins-list").get(currentCoinsList)

module.exports = router
