import { Tag } from 'antd'
import React, { ComponentPropsWithoutRef, FC } from 'react'

interface Props extends ComponentPropsWithoutRef<typeof Tag> {
  isOpen: boolean
}

const OpenStatus: FC<Props> = ({ isOpen, children, ...rest }) => {
  return (
    <Tag className="pointer dim" color={isOpen ? 'blue' : 'red'} {...rest}>
      {children}
    </Tag>
  )
}

export default OpenStatus
