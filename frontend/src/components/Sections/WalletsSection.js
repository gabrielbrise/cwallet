import React, { useEffect } from "react"
import { connect } from "react-redux"
import Section from "components/Common/Section"
import CoinsList from "components/Wallets/CoinsList"
import AddCoin from "components/Wallets/AddCoin"

const Wallets = ({ wallets }) => {
  useEffect(() => {
    console.log("waaal", wallets)
  }, [])
  return wallets.map((wallet) => <Wallet {...wallet} key={wallet.id} />)
}

const Wallet = ({ name, id, coins }) => (
  <Section title={name}>
    <CoinsList coins={coins} />
    <AddCoin walletId={id} />
  </Section>
)

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets)
