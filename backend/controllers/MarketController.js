const axios = require("axios")

const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 120 })

exports.btcCurrentValue = async (req, res, err) => {
  const storageKey = `BTC_${req.params.fiatCurrency}_VALUE`
  const getCache = myCache.get(storageKey)

  if (getCache) return res.status(200).json(getCache)

  const response = await fetchBTCByFiatCurrency(req.params.fiatCurrency)

  const BTC_VALUE = response.data.data.BTC.quote[req.params.fiatCurrency].price

  myCache.set(storageKey, BTC_VALUE)

  return res.status(200).json(BTC_VALUE)
}

exports.coinBtcCurrentValue = async (req, res, err) => {
  const getCache = myCache.get(`${req.params.id}_BTC_VALUE`)
  if (getCache) return res.status(200).json(getCache)
  const response = await fetchLatestCoinBTCValue(req.params.id)

  const COIN_BTC_VALUE = {
    btc_price: response.data.data[req.params.id].quote["BTC"].price,
  }
  myCache.set(`${req.params.id}_BTC_VALUE`, COIN_BTC_VALUE)

  return res.status(200).json(COIN_BTC_VALUE)
}

exports.currentCoinsList = async (req, res, err) => {
  const getCache = myCache.get("COINS_LIST")

  if (getCache) return res.status(200).json(getCache)

  const response = await fetchCoinsList()

  const COINS_LIST = {
    list: response.data.data
      .map(({ id, name, symbol, slug, rank }) => ({
        id,
        name,
        symbol,
        slug,
        rank,
      }))
      .sort((a, b) => (a.rank > b.rank ? 1 : -1)),
  }

  myCache.set("COINS_LIST", COINS_LIST)

  return res.status(200).json(COINS_LIST)
}

const fetchBTCByFiatCurrency = (fiatCurrency) =>
  axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    {
      params: {
        symbol: "BTC",
        convert: fiatCurrency,
      },
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
    }
  )

const fetchLatestBTC_USD = () =>
  axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    {
      params: {
        symbol: "BTC",
        convert: "USD",
      },
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
    }
  )

const fetchLatestBTC_BRL = () =>
  axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    {
      params: {
        symbol: "BTC",
        convert: "BRL",
      },
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
    }
  )

const fetchLatestCoinBTCValue = (coinId) =>
  axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    {
      params: {
        id: coinId,
        convert: "BTC",
      },
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
    }
  )

const fetchCoinsList = () =>
  axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", {
    headers: {
      Accept: "application/json",
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    },
  })
