import React, { FC } from 'react'
import { Input } from 'antd'
interface Props extends React.ComponentPropsWithoutRef<typeof Input> {
  mask: string
  experimentalNumber?: boolean
  placeholder: string
}
declare const MaskedInput: FC<Props>
export default MaskedInput
