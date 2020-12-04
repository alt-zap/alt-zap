import { useEffect } from 'react'
import { navigate } from 'gatsby-link'

import { TenantConfig } from '../typings'

type Lock = 'tenant'

export const useSecurePage = (
  lockType: Lock,
  userId?: string,
  tenant?: TenantConfig
) => {
  useEffect(() => {
    if (lockType === 'tenant') {
      if (!tenant || !userId) {
        return
      }

      if (tenant.userId !== userId) {
        navigate('/app/tenants')
      }
    }
  }, [tenant, userId])
}
