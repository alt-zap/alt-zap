import React, { FC, useEffect, useState, useContext, useCallback } from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

import { log, createCtx } from '../utils'

type Props = {
  loading?: boolean
  user?: firebase.User
  userDb?: {
    id: string
  }
  loginWithGoogle: () => void
}

const [use, AuthProvider] = createCtx<Props>()

export const useAuth = use

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Props['user']>()
  const [userDb, setUserDb] = useState<Props['userDb']>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = firebase.firestore()
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      log('Auth State Changed')
      log({ user })
      if (user) {
        db.collection('users')
          .where('uid', '==', user.uid)
          .limit(1)
          .get()
          .then((res) => {
            if (!res.empty) {
              const [doc] = res.docs
              setUserDb(doc.data() as Props['userDb'])
            } else {
              /**
               * Por que: Num futuro, quero que exista um cadastro mais arrojado dos usuários para, então, poderem
               * cadastrar tenants. Porém, em virtude da minha pressa, estou deixando esse cadastro ser automático por enquanto.
               */
              db.collection('users')
                .add({
                  uid: user.uid,
                })
                .then(console.log)
                .catch(console.log)
            }
            setUser(user)
            setLoading(false)
          })
      } else {
        setUser(undefined)
        setUserDb(undefined)
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
    <AuthProvider value={{ loading, user, userDb, loginWithGoogle }}>
      {children}
    </AuthProvider>
  )
}
