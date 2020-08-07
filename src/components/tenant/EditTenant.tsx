import React, { FC, useState, useCallback } from 'react'
import { message } from 'antd'

import TenantDataForm from './TenantDataForm'
import {
  useTenantConfig,
  setTenantData,
  useTenantDispatch,
} from '../../contexts/TenantContext'
import { useAltIntl } from '../../intlConfig'

type Props = {
  onSuccess?: () => void
}

const EditTenant: FC<Props> = ({ onSuccess }) => {
  const intl = useAltIntl()
  const [loading, setLoading] = useState(false)

  const { tenant, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleSaveTenantData = useCallback(
    (data: Partial<TenantConfig>) => {
      return setTenantData(dispatch, {
        tenantData: data,
        tenantId,
      })
        .then(() => {
          message.success(intl.formatMessage({ id: 'tenant.data.success' }))
        })
        .catch((error: string) => {
          message.error(
            error || intl.formatMessage({ id: 'tenant.data.error' })
          )
        })
        .finally(() => {
          setLoading(false)
          onSuccess?.()
        })
    },
    [tenantId, dispatch, intl, onSuccess]
  )

  return (
    <div>
      <TenantDataForm
        onSubmit={handleSaveTenantData}
        loading={loading}
        initialData={tenant as TenantConfig}
      />
    </div>
  )
}

export default EditTenant
