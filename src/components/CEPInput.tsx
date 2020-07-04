import React, { FC } from 'react'
import MaskedInput from './MaskedInput'

type Props = Omit<React.ComponentPropsWithoutRef<typeof MaskedInput>, 'mask'>

const CepInput: FC<Props> = ({ ...props }) => {
  return <MaskedInput {...props} mask="00000-000" />
}

export default CepInput
