import React, { FC } from 'react'
import MaskedInput from './MaskedInput'
import { masks } from '../constants'

type Props = Omit<React.ComponentPropsWithoutRef<typeof MaskedInput>, 'mask'>

const CepInput: FC<Props> = ({ ...props }) => {
  return <MaskedInput {...props} mask={masks.CEP} />
}

export default CepInput
