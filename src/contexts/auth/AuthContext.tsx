import React, { FC, useEffect, useReducer } from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

import { log, createCtx } from '../../utils'
import {
  authReducer,
  AuthContextActions,
  AuthContextState,
  UserDB,
} from './authReducar'

type Dispatch = (action: AuthContextActions) => void

export const [useAuthState, AuthStateProvider] = createCtx<AuthContextState>()
export const [useAuthDispatch, AuthDispatchProvider] = createCtx<Dispatch>()

export const useAuth = () =>
  [useAuthState(), useAuthDispatch()] as [AuthContextState, Dispatch]

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
  })

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

              dispatch({ type: 'SET_DB_USER', args: doc.data() as UserDB })
            }

            dispatch({ type: 'SET_AUTH_USER', args: user })
          })
      } else {
        dispatch({ type: 'SET_AUTH_USER', args: undefined })
        dispatch({ type: 'SET_DB_USER', args: undefined })
      }

      dispatch({ type: 'SET_LOADING', args: false })
    })

    return unsub
  }, [])

  return (
    <AuthStateProvider value={state}>
      <AuthDispatchProvider value={dispatch}>{children}</AuthDispatchProvider>
    </AuthStateProvider>
  )
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().signInWithRedirect(googleProvider)
}
