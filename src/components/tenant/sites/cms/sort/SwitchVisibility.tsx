import { Switch } from 'antd'
import React, { ComponentPropsWithoutRef, FC } from 'react'

import { useAltIntl } from '../../../../../intlConfig'

interface Props extends ComponentPropsWithoutRef<typeof Switch> {
  htmlFor: string
}

const SwitchVisibility: FC<Props> = ({ htmlFor, ...rest }) => {
  const { formatMessage } = useAltIntl()

  return (
    <div className="flex flex-column items-center">
      <label htmlFor={htmlFor}>
        {formatMessage({ id: 'tenant.sites.show?' })}
      </label>
      <Switch {...rest} />
    </div>
  )
}

export default SwitchVisibility
