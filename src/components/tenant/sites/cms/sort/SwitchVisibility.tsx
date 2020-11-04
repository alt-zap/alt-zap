import { Switch } from 'antd'
import React, { ComponentPropsWithoutRef, FC } from 'react'

import { useAltIntl } from '../../../../../intlConfig'

const SwitchVisibility: FC<ComponentPropsWithoutRef<typeof Switch>> = (
  props
) => {
  const { formatMessage } = useAltIntl()

  return (
    <div className="flex flex-column items-center">
      <label htmlFor="switch-put-item-id-here">
        {formatMessage({ id: 'tenant.sites.show?' })}
      </label>
      <Switch {...props} />
    </div>
  )
}

export default SwitchVisibility
