import React, { useEffect, useState, useContext } from "react"
import firebase from "firebase"
// require("firebase/firestore")

const TenantContext = React.createContext({})

export const useTenantConfig = () => useContext(TenantContext)

export const TenantContextProvider = ({ slug, children }) => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const db = firebase.firestore()
    db.collection("tenant")
      .where("slug", "==", slug)
      .get()
      .then(function(querySnapshot) {
        const [doc] = querySnapshot.docs
        setConfig(doc.data())
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  return (
    <TenantContext.Provider value={{ loading, config }}>
      {children}
    </TenantContext.Provider>
  )
}
