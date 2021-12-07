import ajv from "./"

const CoinSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    amount: { type: "number" },
  },
  required: ["id", "name", "amount"],
}

export const validateCoin = ajv.compile(CoinSchema)

export default CoinSchema
