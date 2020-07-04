import React, { FC } from 'react'
import MaskedInput from './MaskedInput'

type Props = Omit<React.ComponentPropsWithoutRef<typeof MaskedInput>, 'mask'>

const RealInput: FC<Props> = ({ ...props }) => {
  return <MaskedInput {...props} mask="00[0],`00" />
}

export default RealInput
