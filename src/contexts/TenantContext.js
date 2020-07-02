import React, { useEffect, useState, useContext } from "react"
import * as firebase from "firebase"
import "firebase/firestore"

const TenantContext = React.createContext({})

export const useTenantConfig = () => useContext(TenantContext)

export const TenantContextProvider = ({ slug, tenantId, children }) => {
  const [tenant, setTenant] = useState(null)
  const [id, setId] = useState(tenantId)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug && !tenantId) return
    const db = firebase.firestore()
    const query = tenantId
      ? db.collection("tenants").doc(tenantId)
      : db.collection("tenants").where("slug", "==", slug)
    query
      .get()
      .then(querySnapshot => {
        const [doc] = querySnapshot.docs || [querySnapshot]
        const data = doc.data()
        setId(doc.id)
        setTenant(data)
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug, tenantId])

  return (
    <TenantContext.Provider
      value={{ loading, tenantId: id, tenant, updateTenant: setTenant }}
    >
      {children}
    </TenantContext.Provider>
  )
}
