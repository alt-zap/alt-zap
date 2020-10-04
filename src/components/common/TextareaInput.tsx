import React, { FC } from 'react'
import { Input } from 'antd'

const TextareaInput: FC<React.ComponentPropsWithoutRef<
  typeof Input.TextArea
>> = (props) => (
  <Input.TextArea
    style={{ fontSize: '16px' }}
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

export default TextareaInput
