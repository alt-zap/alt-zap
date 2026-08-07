import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TenantConfig } from '../typings'

type Lock = 'tenant'

export const useSecurePage = (
  lockType: Lock,
  userId?: string,
  tenant?: TenantConfig
) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (lockType === 'tenant') {
      if (!tenant || !userId) {
        return
      }

      if (tenant.userId !== userId) {
        navigate('/app/tenants')
      }
    }
  }, [tenant, userId, lockType, navigate])
}
