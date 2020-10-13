const axios = require("axios")
const { cacheMiddleware } = require("../services/Cache")

const BASE_CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency"

exports.btcCurrentValue = async (req, res, err) =>
  cacheMiddleware("BTC_VALUE", async () => {
    const p1 = fetchLatestBtcValue()
    const p2 = fetchLatestBtcValue("BRL")

    const response = await Promise.all([p1, p2])
    const BTC_VALUE = {
      BTC_USD: response[0].data.data.BTC.quote.USD.price,
      BTC_BRL: response[1].data.data.BTC.quote.BRL.price
    }
    return res.status(200).json(data)
  })

exports.coinBtcCurrentValue = async (req, res, err) => {
  const response = await fetchLatestCoinBTCValue(req.params.id)

  const COIN_BTC_VALUE = {
    btc_price: response.data.data["1"].quote["BTC"].price
  }

  return res.status(200).json(COIN_BTC_VALUE)
}

exports.currentCoinsList = async (req, res, err) =>
  cacheMiddleware("COINS_LIST", async () => {
    const response = await fetchCoinsList()

    const COINS_LIST = {
      list: response.data.data
        .map(({ id, name, symbol, slug, rank }) => ({
          id,
          name,
          symbol,
          slug,
          rank
        }))
        .sort((a, b) => (a.rank > b.rank ? 1 : -1))
    }
    return COINS_LIST
  })

const headers = {
  Accept: "application/json",
  "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
}

const fetchLatestBtcValue = (convert = "USD") =>
  axios.get(`${BASE_CMC_URL}/quotes/latest`, {
    params: {
      symbol: "BTC",
      convert
    },
    headers
  })

const fetchLatestCoinBTCValue = coinId =>
  axios.get(`${BASE_CMC_URL}/quotes/latest`, {
    params: {
      id: coinId,
      convert: "BTC"
    },
    headers
  })

const fetchCoinsList = () =>
  axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", {
    headers
  })
