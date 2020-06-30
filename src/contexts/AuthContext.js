import React, { useEffect, useState, useContext, useCallback } from "react"
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"

const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userDb, setUserDb] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      console.log("onAuth", user)
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .where("uid", "==", user.uid)
          .limit(1)
          .get()
          .then(res => {
            console.log({ res })
            if (!res.empty) {
              const [doc] = res
              setUserDb(doc.data())
            }
            setUser(user)
          })
      } else {
        setUser(null)
        setUserDb(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const loginWithGoogle = useCallback(() => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(googleProvider)
  }, [])

  return (
    <AuthContext.Provider value={{ loading, user, userDb, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
