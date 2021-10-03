import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { Button, Result } from 'antd'

import { useAltIntl } from '../../intlConfig'

export const OrderPlaced: FC = () => {
  const intl = useAltIntl()

  return (
    <Result
      status="success"
      title={intl.formatMessage({ id: 'order.orderPlaced.title' })}
      extra={[
        <Button key="buy" onClick={() => navigate(-1)}>
          {intl.formatMessage({ id: 'goBack' })}
        </Button>,
      ]}
    />
  )
}

OrderPlaced.displayName = 'OrderPlaced'
