import WalletsSchema, { validateWallets } from "./Wallets"
import ajv from "./"

describe("validateWallets", () => {
  it("should reject wrong wallets array", () => {
    const wallets = [
      {
        title: "My first crypto wallet",
        coins: [
          {
            id: 1,
            name: "Bitcoin",
            amount: 2.2835723,
          },
        ],
      },
    ]

    expect(validateWallets(wallets)).toBe(false)
  })

  it("should accept valid wallets array", () => {
    const wallets = [
      {
        name: "My first crypto wallet",
        id: "2098hwdw8hf",
        coins: [
          {
            id: 1,
            name: "Bitcoin",
            amount: 2,
          },
          {
            id: 2010,
            name: "Cardano",
            amount: 2,
          },
        ],
        totalBtcValue: 2.00004048,
      },
      {
        name: "2f323f23",
        id: "2fb1d51d-801e-47d1-91fd-d7c9217919bd",
        coins: [
          {
            id: 1042,
            name: "Siacoin",
            amount: 333,
          },
        ],
        totalBtcValue: 0.00015984,
      },
    ]

    const expected = ajv.validate(WalletsSchema, wallets)

    console.log("errors", ajv.errors)

    expect(expected).toBe(true)
  })
})
