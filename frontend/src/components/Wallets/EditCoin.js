import React from "react"
import Icon from "components/Common/Icon"
import classnames from "classnames"
import styled from "styled-components"

const EditCoin = ({ editCoin, index, save, cancel, edit, remove }) => {
  const isEditCoinCurrent = editCoin === index
  return isEditCoinCurrent ? (
    <Container className="d-flex justify-content-center">
      <Icon name="done" className="text-success px-2" onClick={save} />
      <Icon name="close" className="text-danger px-2" onClick={cancel} />
    </Container>
  ) : (
    editCoin < 0 && (
      <Container className="d-flex justify-content-between">
        <Icon
          name="edit"
          className={classnames("IconButton", {
            "d-none": editCoin > -1,
          })}
          onClick={edit}
        />
        <Icon name="delete" className="IconButton Delete" onClick={remove} />
      </Container>
    )
  )
}

export default EditCoin

const Container = styled.span`
  .IconButton {
    color: #ccc;

    :hover {
      color: var(--primary);
      &.Delete {
        color: red;
      }
    }
  }
`
