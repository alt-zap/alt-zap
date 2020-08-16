import React, { FC, useCallback, useState } from 'react'
import { Alert } from 'antd'
import { useNavigate, RouteComponentProps } from '@reach/router'
import firebase from 'firebase/app'
import 'firebase/firestore'

import AdminPage from '../templates/AdminPage'
import { useAuth } from '../contexts/auth/AuthContext'
import TenantForm from '../components/TenantForm'
import { log } from '../utils'
import OnboardStepper from '../components/tenant/onboard/OnboardStepper'

const OnboardPage: FC<RouteComponentProps> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [{ user }] = useAuth()
  const navigate = useNavigate()

  const saveTenant = useCallback(
    ({ formData: data }) => {
      setLoading(true)
      const db = firebase.firestore()
      const { slug } = data

      db.collection('tenants')
        .where('slug', '==', slug)
        .limit(1)
        .get()
        .then((res) => {
          if (res.empty) {
            db.collection('tenants')
              .add({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                userId: user!.uid,
                createdAt: new Date().toISOString(),
                ...data,
              })
              .then((ref) => {
                navigate(`/tenant/${ref.id}`)
              })
              .catch((err) => {
                log({ err })
                setError('Não foi possível realizar seu cadastro')
                setLoading(false)
              })
          } else {
            setError('Slug já utilizado por outro usuário')
            setLoading(false)
          }
        })
    },
    [navigate, user]
  )

  if (!user) {
    navigate(`/`)
  }

  return (
    <AdminPage>
      <div className="flex flex-column items-center ph2">
        <div className="bg-white pa3 ma3 mt5 w-90 w-70-l">
          <OnboardStepper />
        </div>
      </div>
    </AdminPage>
  )
}

export default OnboardPage
