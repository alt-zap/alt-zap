import React, { ComponentPropsWithoutRef, FC } from 'react'
import { styled } from 'linaria/react'

import Real from '../Real'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  loading?: boolean
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  min-width: 166px;
  border: 0;
  cursor: ${(props) => (props.loading ? 'unset' : 'pointer')};
  background: ${(props) => (props.loading ? '#b3b3b3' : '#091525')};
  border-radius: 10px;
  padding: 10px 15px;
  transition: background-color 0.2s ease;
  &:hover {
    background: ${(props) => (props.loading ? '#b3b3b3' : '#203755')};
  }
`

const AddSpan = styled.span`
  color: white;
  margin-right: 10px;
  font-size: 15px;
`

const PriceSpan = styled.span`
  color: #d9d9d9;
`

interface Props extends ButtonProps {
  label: string
  price: number
}

const AddButton: FC<Props> = ({ label, price, type, ...buttonProps }) => {
  return (
    <StyledButton
      {...(buttonProps as ComponentPropsWithoutRef<typeof StyledButton>)}
      disabled={buttonProps.loading ?? buttonProps.disabled}
    >
      <AddSpan>{label}</AddSpan>
      <PriceSpan>
        <Real cents={price} />
      </PriceSpan>
    </StyledButton>
  )
}

export default AddButton
