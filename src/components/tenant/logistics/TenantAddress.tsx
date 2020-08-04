import React, { FC, useCallback, useState } from 'react'
import { Divider, Skeleton, message } from 'antd'

import AddressForm from '../../AddressForm'
import {
  useTenantConfig,
  useTenantDispatch,
  setAddress,
} from '../../../contexts/TenantContext'
import { Address } from '../../../typings'
import { useAltIntl, Message } from '../../../intlConfig'

const TenantAddress: FC = () => {
  const intl = useAltIntl()
  const { tenant, tenantId, loading: tenantLoading } = useTenantConfig()
  const [loading, setLoading] = useState(false)

  const dispatch = useTenantDispatch()

  const handleAddressChange = useCallback(
    (address: Address) => {
      setLoading(true)
      setAddress(dispatch, {
        address,
        tenantId,
      })
        .then(() => {
          message.success(intl.formatMessage({ id: 'tenant.address.success' }))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [tenantId, dispatch, setLoading, intl]
  )

  return (
    <>
      <Divider>
        <Message id="tenant.address.title" />
      </Divider>
      {tenantLoading ? (
        <Skeleton active />
      ) : (
        <AddressForm
          loading={loading}
          initialAddress={tenant?.address}
          onValidSubmit={handleAddressChange}
        />
      )}
    </>
  )
}

export default TenantAddress
