import { Switch } from 'antd'
import React, { ComponentPropsWithoutRef, FC } from 'react'

const SwitchVisibility: FC<ComponentPropsWithoutRef<typeof Switch>> = (
  props
) => {
  return (
    <div className="flex flex-column">
      <label htmlFor="switch-put-item-id-here">Ativo?</label>
      <Switch {...props} />
    </div>
  )
}

export default SwitchVisibility
