import React, { FC, useCallback, useState } from "react"
import { Alert } from "antd"
import { useNavigate, RouteComponentProps } from "@reach/router"
import firebase from "firebase/app"
import "firebase/firestore"

import { useAuth } from "../contexts/AuthContext"
import TenantForm from "../components/TenantForm"

const OnboardPage: FC<RouteComponentProps> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { user } = useAuth()
  const navigate = useNavigate()

  const saveTenant = useCallback(
    ({ formData: data }) => {
      setLoading(true)
      const db = firebase.firestore()
      const { slug } = data
      db.collection("tenants")
        .where("slug", "==", slug)
        .limit(1)
        .get()
        .then(res => {
          if (res.empty) {
            db.collection("tenants")
              .add({
                userId: user!.uid,
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
          } else {
            setError("Slug já utilizado por outro usuário")
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
    <div className="flex flex-column items-center ph2">
      <h1>Novo Negócio</h1>
      <h3 className="tc">
        Cadastre aqui seu cardápio e meios de pagamento. Sua página estará
        online logo em seguida!
      </h3>
      {error && <Alert type="error" message={error}/>}
      <TenantForm onSubmit={saveTenant} disabled={loading} />
    </div>
  )
}

export default OnboardPage