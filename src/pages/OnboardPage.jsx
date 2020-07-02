import React, { useCallback, useState } from "react"
import { Alert } from "antd"
import { useNavigate } from "@reach/router"
import * as firebase from "firebase/app"
import "firebase/firestore"

import { useAuth } from "../contexts/AuthContext"
import TenantForm from "../components/TenantForm"

export default () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useAuth()
  const navigate = useNavigate()

  const saveTenant = useCallback(
    ({ formData: data }) => {
      setLoading(true)
      const db = firebase.firestore()
      db.collection("tenants")
        .add({
          userId: user.uid,
          createdAt: new Date().toISOString(),
          ...data
        })
        .then(ref => {
          navigate(`/tenant/${ref.id}`)
        })
        .catch(error => {
          console.log({ error })
          setError("Não foi possível realizar seu cadastro")
          setLoading(false)
        })
    },
    [navigate, user]
  )

  if (!user) {
    navigate(`/`)
  }

  return (
    <div className="flex flex-column items-center ph2">
      <h1>Bem-vindo</h1>
      <h3>Vamos, agora, configurar a página do seu negócio</h3>
      <div className="w-90 w-50-l">
        {error && <Alert type="error">{error}</Alert>}
        <TenantForm onSubmit={saveTenant} disabled={loading} />
      </div>
    </div>
  )
}
