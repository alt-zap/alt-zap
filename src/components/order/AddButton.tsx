import React, { FC } from 'react'
import { styled } from 'linaria/react'

const StyledButton = styled.button`
  background-color: 'red';
`

const AddButton: FC = () => {
  return <StyledButton />
}

export default AddButton
