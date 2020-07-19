import React, { FC, Fragment, useState, useEffect } from 'react'
import { useNavigate } from '@reach/router'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { useAuth } from '../../contexts/AuthContext'
import TenantList from './TenantList'

interface TenantForList extends TenantConfig {
  id: string
}

const ListTenants: FC = () => {
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState<TenantForList[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    const db = firebase.firestore()
    const query = db.collection('tenants').where('userId', '==', user.uid).get()

    query.then(({ docs }) => {
      setTenants(
        docs.map((doc) => ({ ...doc.data(), id: doc.id })) as TenantForList[]
      )
      setLoading(false)
    })
  }, [user])

  return (
    <Fragment>
      <div className="flex flex-column items-center">
        <div className="flex br2 mt2 flex-column items-center pa3 w-90">
          <TenantList
            loading={loading}
            tenants={tenants}
            onSelectTenant={(id) => navigate(`/tenants/${id}`)}
            onAddTenant={() => navigate('/onboard')}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ListTenants
