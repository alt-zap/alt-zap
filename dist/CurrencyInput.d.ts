import React, { FC } from 'react'
import { Input } from 'antd'
interface Props extends React.ComponentPropsWithoutRef<typeof Input> {
  separator?: string
}
export declare const toCurrency: (value: string, separator: string) => string
declare const CurrencyInput: FC<Props>
export default CurrencyInput
