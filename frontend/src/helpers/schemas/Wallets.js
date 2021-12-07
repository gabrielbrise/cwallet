import ajv from "./"
import WalletSchema from "./Wallet"

const WalletsSchema = {
  type: "array",
  items: WalletSchema,
}

export const validateWallets = ajv.compile(WalletsSchema)

export default WalletsSchema
