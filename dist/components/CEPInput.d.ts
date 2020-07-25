import React, { FC } from 'react'
import MaskedInput from './MaskedInput'
declare type Props = Omit<
  React.ComponentPropsWithoutRef<typeof MaskedInput>,
  'mask'
>
declare const CepInput: FC<Props>
export default CepInput
