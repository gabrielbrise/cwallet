import ajv from "./"
import CoinSchema from "./Coin"

const WalletSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    id: { type: "string" },
    coins: { type: "array", items: CoinSchema },
  },
  required: ["name", "id", "coins"],
}

export const validateWallet = ajv.compile(WalletSchema)

export default WalletSchema
