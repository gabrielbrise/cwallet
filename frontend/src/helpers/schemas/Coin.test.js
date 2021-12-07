import { validateCoin } from "./Coin"

describe("validateCoin", () => {
  it("should reject wrong coin object", () => {
    const coin = {
      id: 1,
      title: "Bitcoin",
      total: 2.2835723,
    }

    expect(validateCoin(coin)).toBe(false)
  })

  it("should accept valid coin object", () => {
    const coin = {
      id: 1,
      name: "Bitcoin",
      amount: 2.2835723,
    }

    expect(validateCoin(coin)).toBe(true)
  })
})
