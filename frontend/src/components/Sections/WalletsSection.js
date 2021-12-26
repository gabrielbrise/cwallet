import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Section from "components/Common/Section"
import CoinsList from "components/Wallets/CoinsList"
import AddCoin from "components/Wallets/AddCoin"
import Icon from "components/Common/Icon"
import classnames from "classnames"
import Input from "components/Common/Input"
import { renameWallet, deleteWallet } from "ducks/Wallets"

const Wallets = ({ wallets, renameWallet, deleteWallet }) =>
  wallets.map((wallet) => (
    <Wallet
      {...wallet}
      key={wallet.id}
      renameWallet={renameWallet}
      deleteWallet={deleteWallet}
    />
  ))

const Wallet = (props) => {
  const [renameMode, setRenameMode] = useState(false)
  const [addCoin, setAddCoin] = useState(false)
  const states = {
    renameMode,
    setRenameMode,
    addCoin,
    setAddCoin,
  }
  return (
    <Container>
      <Section
        title={props.name}
        cardClassName="p-0 overflow-x-scroll"
        titleClassName={classnames({ "d-none": renameMode | addCoin })}
        headerChildren={<Header {...props} {...states} />}
      >
        <CoinsList coins={props.coins} walletId={props.id} />
      </Section>
    </Container>
  )
}

const Header = ({
  name,
  id,
  renameMode,
  setRenameMode,
  addCoin,
  setAddCoin,
  renameWallet,
  deleteWallet,
}) => {
  const [inputName, setInputName] = useState(name)
  const inputRef = useRef()
  return (
    <div className="d-flex flex-grow-1 justify-content-between mb-2">
      {addCoin && <AddCoin walletId={id} setAddCoin={setAddCoin} />}
      <div className="d-flex">
        {renameMode ? (
          <>
            <Input
              placeholder="Enter new wallet name"
              ref={inputRef}
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
            />
            <Icon
              name="done"
              className="success px-2"
              onClick={() => {
                renameWallet({ name: inputName, id })
                setRenameMode(false)
                setInputName(name)
              }}
            />
            <Icon
              name="close"
              className="danger px-2"
              onClick={() => {
                setRenameMode(false)
                setInputName(name)
              }}
            />
          </>
        ) : (
          <Icon
            name="edit"
            className={classnames("ml-1", {
              "d-none": addCoin | renameMode,
            })}
            onClick={() => {
              setRenameMode(true)
              setTimeout(() => inputRef.current.select(), 400)
            }}
          />
        )}
      </div>
      {!renameMode && !addCoin && (
        <CoinAddButton role="button" onClick={() => setAddCoin(true)}>
          <Icon name="add" />
          <Icon name="monetization_on" />
        </CoinAddButton>
      )}
      {renameMode && (
        <Icon
          name="delete"
          className="danger"
          onClick={() => {
            deleteWallet({ id })
            setRenameMode(false)
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({ wallets: state.wallets })

const mapDispatchToProps = { renameWallet, deleteWallet }

export default connect(mapStateToProps, mapDispatchToProps)(Wallets)

const Container = styled.div`
  .overflow-x-scroll {
    overflow-x: scroll;
    max-width: 100vw;
  }

  .hideTitle {
    display: none;
  }
`
const CoinAddButton = styled.div`
  white-space: nowrap;
  > * {
    display: inline;
  }
  :hover {
    > * {
      color: var(--primary);
    }
  }
`
