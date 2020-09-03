import React, { FC } from 'react'
import { Input } from 'antd'

const TextInput: FC<React.ComponentPropsWithoutRef<typeof Input>> = (props) => (
  <Input
    size="large"
    className="fw1"
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

export default TextInput
