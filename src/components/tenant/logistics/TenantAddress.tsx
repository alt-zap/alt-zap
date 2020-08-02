import React, { FC, useCallback, useState } from 'react'
import { Divider, Skeleton, message } from 'antd'

import AddressForm from '../../AddressForm'
import {
  useTenantConfig,
  useTenantDispatch,
  setAddress,
} from '../../../contexts/TenantContext'
import { Address } from '../../../typings'

const TenantAddress: FC = () => {
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
          message.success('Endereço atualizado com sucesso')
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [tenantId, dispatch, setLoading]
  )

  return (
    <>
      <Divider>Endereço da Unidade</Divider>
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
