import React, { FC } from 'react'
import { styled } from 'linaria/react'

const StyledHeader = styled.div`
  text-transform: uppercase;
  background-color: red;
  height: 100px;
  width: 100px;
`

const Header: FC = () => {
  return <StyledHeader>Hello Real Red</StyledHeader>
}

export default Header
