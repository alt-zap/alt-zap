import { Switch } from 'antd'
import React, { FC } from 'react'

type VisibleSection = { type: 'category' }

type Props = {
  checked: boolean
  onChecked: (value: boolean) => void
}

const SwitchVisibility: FC<Props> = ({ checked, onChecked }) => {
  return (
    <div className="flex flex-column">
      <label htmlFor="switch-put-item-id-here">Ativo?</label>
      <Switch checked={checked} onChange={(value) => onChecked(value)} />
    </div>
  )
}

export default SwitchVisibility
