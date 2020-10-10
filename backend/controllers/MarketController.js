const axios = require("axios")

const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 120 })

exports.btcCurrentValue = async (req, res, err) => {
  const getCache = myCache.get("BTC_VALUE")

  if (getCache) return getCache

  const p1 = await fetchLatestBTC_USD()
  const p2 = await fetchLatestBTC_BRL()

  const response = await Promise.all([p1, p2])

  console.log(response)

  const BTC_VALUE = {
    BTC_USD: p1.data.data.BTC.quote.USD.price,
    BTC_BRL: p2.data.data.BTC.quote.BRL.price,
  }

  myCache.set("BTC_VALUE", BTC_VALUE)

  return res.status(200).json(BTC_VALUE)
  // return res.status(500).send("deu ruim");
}

exports.currentCoinsList = async (req, res, err) => {
  const getCache = myCache.get("COINS_LIST")

  if (getCache) return getCache

  const response = await fetchCoinsList()
  console.log(response)

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

const fetchCoinsList = () =>
  axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", {
    headers: {
      Accept: "application/json",
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    },
  })
