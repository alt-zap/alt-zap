import React, { FC, useCallback, useState, useMemo } from 'react'
import { Modal } from 'antd'
import { useNavigate } from '@reach/router'
import firebase from 'firebase/app'
import 'firebase/firestore'

import TenantForm from './TenantForm'
import { useAuth } from '../contexts/AuthContext'
import { useTenantConfig } from '../contexts/TenantContext'
import { log } from '../utils'

const EditTenant: FC = () => {
  const { user } = useAuth()
  const {
    loading: loadingTenant,
    tenant,
    tenantId,
    updateTenant,
  } = useTenantConfig()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

  const saveTenant = useCallback(
    ({ formData }) => {
      setLoading(true)
      const db = firebase.firestore()
      const updatedTenant = {
        editedLast: new Date().toISOString(),
        ...formData,
      }

      const { slug } = updatedTenant

      db.collection('tenants')
        .where('slug', '==', slug)
        .limit(1)
        .get()
        .then((res) => {
          if (res.empty || res.docs[0].id === tenantId) {
            return db
              .collection('tenants')
              .doc(tenantId)
              .set(updatedTenant)
              .then(() => {
                updateTenant(updatedTenant)
                setModalMsg('Alterações salvas com sucesso')
              })
              .catch((e) => {
                log(e)
                setModalMsg('Não foi possível salvar seus dados')
              })
              .finally(() => setLoading(false))
          }

          setLoading(false)
          setModalMsg('Slug já utilizado por outro usuário')
        })
    },
    [tenantId, updateTenant]
  )

  const url = useMemo(() => `https://alt-zap.vercel.app/${tenant?.slug}`, [
    tenant,
  ])

  if (loadingTenant || !user) {
    return null
  }

  if (tenant && tenant.userId !== user.uid) {
    navigate('/')

    return null
  }

  return (
    <div className="flex flex-column items-center pa2">
      <h1>Edite o seu negócio</h1>
      <span className="grey mb2">Alterações entram no ar imediatamente</span>
      <h4>
        Compartilhe o link{' '}
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {url}
        </a>{' '}
        para seus clientes
      </h4>
      <TenantForm
        initialValue={tenant}
        onSubmit={saveTenant}
        disabled={loading}
      />
      <Modal
        title="Aviso"
        visible={!!modalMsg}
        onOk={() => setModalMsg('')}
        onCancel={() => setModalMsg('')}
      >
        <p>{modalMsg}</p>
      </Modal>
    </div>
  )
}

export default EditTenant
