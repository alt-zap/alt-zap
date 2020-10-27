import React, { FC } from 'react'
import { styled } from 'linaria/react'

import Real from '../Real'

const StyledButton = styled.button`
  display: flex;
  cursor: pointer;
  background: #091525;
  border-radius: 20px;
  &:hover {
    border: 2px solid white;
  }
`

const AddSpan = styled.span`
  color: white;
  margin-right: 10px;
`

const PriceSpan = styled.span`
  color: #d9d9d9;
`

type Props = {
  label: string
  price: number
}

const AddButton: FC<Props> = ({ label, price }) => {
  return (
    <StyledButton>
      <AddSpan>{label}</AddSpan>
      <PriceSpan>
        <Real cents={price} />
      </PriceSpan>
    </StyledButton>
  )
}

export default AddButton
