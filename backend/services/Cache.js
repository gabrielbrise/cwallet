const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 120 })

exports.cacheMiddleware = (name, callback) => {
  const getCache = myCache.get(name)
  if (getCache) return getCache

  callback().then(data => {
    myCache.set(name, data)
    return data
  })
}
