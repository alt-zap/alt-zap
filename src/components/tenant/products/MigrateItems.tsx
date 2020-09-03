import React, { FC, useState, useCallback } from 'react'
import { Button } from 'antd'

import { Message } from '../../../intlConfig'
import { __MIGRATE_TENANT, useTenant } from '../../../contexts/TenantContext'
import { useAuth } from '../../../contexts/auth/AuthContext'

const MigrateItems: FC = () => {
  const [loading, setLoading] = useState(false)
  const [{ user }] = useAuth()
  const [{ tenant, tenantId }, dispatch] = useTenant()

  const onMigrate = useCallback(() => {
    setLoading(true)

    if (!tenant?.items?.length || !tenantId || !user?.uid) {
      return setLoading(false)
    }

    __MIGRATE_TENANT(dispatch, {
      tenant,
      tenantId,
      userId: user?.uid,
    })
  }, [setLoading, tenant, tenantId, user, dispatch])

  return (
    <Button type="primary" loading={loading} onClick={onMigrate}>
      <Message id="tenant.migrate" />
    </Button>
  )
}

export default MigrateItems
