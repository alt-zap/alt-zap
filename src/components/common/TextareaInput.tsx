import React, { FC } from 'react'
import { Input } from 'antd'

const TextareaInput: FC<React.ComponentPropsWithoutRef<
  typeof Input.TextArea
>> = (props) => (
  <Input.TextArea
    className="fw1"
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

export default TextareaInput
