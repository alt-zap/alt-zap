import React, { FC } from 'react'
import { Input } from 'antd'

const TextInput: FC<React.ComponentPropsWithoutRef<typeof Input>> = (props) => (
  <Input size="large" spellCheck="false" autoComplete="off" {...props} />
)

export default TextInput
