import React, { useCallback, useState } from "react"
import { Modal } from "antd"
import { useNavigate } from "@reach/router"
import firebase from "firebase/app"
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
      const { slug } = updatedTenant
      db.collection("tenants")
        .where("slug", "==", slug)
        .limit(1)
        .get()
        .then(res => {
          if (res.empty || res.docs[0].id === tenantId) {
            return db
              .collection("tenants")
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
          } else {
            setLoading(false)
            setModalMsg("Slug já utilizado por outro usuário")
          }
        })
    },
    [tenantId, updateTenant]
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
      <TenantForm
        initialValue={tenant}
        onSubmit={saveTenant}
        disabled={loading}
      />
      <Modal
        title="Aviso"
        visible={!!modalMsg}
        onOk={() => setModalMsg(null)}
        onCancel={() => setModalMsg(null)}
      >
        <p>{modalMsg}</p>
      </Modal>
    </div>
  )
}
