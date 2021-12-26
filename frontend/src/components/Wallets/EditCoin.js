import React from "react"
import Icon from "components/Common/Icon"
import classnames from "classnames"
import styled from "styled-components"

const EditCoin = ({ editCoin, index, save, cancel, edit, remove }) => {
  const isEditCoinCurrent = editCoin === index
  return isEditCoinCurrent ? (
    <Container className="d-flex justify-content-center">
      <Icon name="done" className="px-2 success" onClick={save} />
      <Icon name="close" className="px-2 danger" onClick={cancel} />
      <span style={{ borderRight: "1px solid #ccc" }} />
      <Icon name="delete" className="ml-3 danger" onClick={remove} />
    </Container>
  ) : (
    editCoin < 0 && (
      <Container className="d-flex justify-content-center">
        <Icon
          name="edit"
          className={classnames("", {
            "d-none": editCoin > -1,
          })}
          onClick={edit}
        />
      </Container>
    )
  )
}

export default EditCoin

const Container = styled.span`
  width: 140px;
`
