import React, { useEffect, useState, useContext, useCallback } from "react"
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"

import { log } from '../util/utils'

const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userDb, setUserDb] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = firebase.firestore()
    const unsub = firebase.auth().onAuthStateChanged(user => {
      log('Auth State Changed')
      log({ user })
      if (user) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .limit(1)
          .get()
          .then(res => {
            if (!res.empty) {
              const [doc] = res.docs
              setUserDb(doc.data())
            } else {
              /**
               * Por que: Num futuro, quero que exista um cadastro mais arrojado dos usuários para, então, poderem
               * cadastrar tenants. Porém, em virtude da minha pressa, estou deixando esse cadastro ser automático por enquanto.
               */
              db.collection("users")
                .add({
                  uid: user.uid
                })
                .then(console.log)
                .catch(console.log)
            }
            setUser(user)
            setLoading(false)
          })
      } else {
        setUser(null)
        setUserDb(null)
        setLoading(false)
      }
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
