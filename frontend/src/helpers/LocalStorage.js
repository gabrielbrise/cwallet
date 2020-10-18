export const setLocalStorageWallet = (coins) => {
  return localStorage.setItem("coins", JSON.stringify(coins))
}
