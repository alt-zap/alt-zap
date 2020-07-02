import React, { useCallback, useState } from "react"
import { Modal } from "antd"
import { useNavigate } from "@reach/router"
import * as firebase from "firebase/app"
import "firebase/firestore"

import TenantForm from "../components/TenantForm"
import { useAuth } from "../contexts/AuthContext"
import { useTenantConfig } from "../contexts/TenantContext"

export default () => {
  const { user } = useAuth()
  const {
    loading: loadingTenant,
    tenant,
    tenantId,
    updateTenant
  } = useTenantConfig()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState(null)

  const saveTenant = useCallback(
    ({ formData }) => {
      setLoading(true)
      const db = firebase.firestore()
      const updatedTenant = {
        editedLast: new Date().toISOString(),
        ...formData
      }
      db.collection("tenants")
        .doc(tenantId)
        .set(updatedTenant)
        .then(data => {
          updateTenant(updatedTenant)
          setModalMsg("Alterações salvas com sucesso")
        })
        .catch(e => {
          console.log(e)
          setModalMsg("Não foi possível salvar seus dados")
        })
        .finally(() => setLoading(false))
    },
    [tenantId]
  )

  if (loadingTenant || !user) {
    return null
  }

  if (tenant.userId !== user.uid) {
    navigate("/")
    return null
  }

  return (
    <div className="flex flex-column items-center pa2">
      <h1>Edite o seu negócio</h1>
      <span className="grey mb2">Alterações entram no ar imediatamente</span>
      <div className="w-90 w-50-l">
        <TenantForm
          initialValue={tenant}
          onSubmit={saveTenant}
          disabled={loading}
        />
      </div>
      <Modal
        title="Basic Modal"
        visible={!!modalMsg}
        onOk={() => setModalMsg(null)}
        onCancel={() => setModalMsg(null)}
      >
        <p>{modalMsg}</p>
      </Modal>
    </div>
  )
}
