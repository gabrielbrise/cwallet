import { validateWallet } from "./Wallet"

describe("validateWallet", () => {
  it("should reject wrong wallet object", () => {
    const wallet = {
      title: "My first crypto wallet",
      id: "2098hwdw8hf",
      coins: [
        {
          id: 1,
          name: "Bitcoin",
          amount: 2.2835723,
        },
      ],
    }

    expect(validateWallet(wallet)).toBe(false)
  })

  it("should accept valid wallet object", () => {
    const wallet = {
      name: "My first crypto wallet",
      id: "2098hwdw8hf",
      coins: [
        {
          id: 1,
          name: "Bitcoin",
          amount: 2.2835723,
        },
      ],
    }

    expect(validateWallet(wallet)).toBe(true)
  })
})
