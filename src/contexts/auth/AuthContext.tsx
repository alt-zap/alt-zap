import React, { FC, useEffect, useReducer } from 'react'
import firebase, { firestore } from 'firebase/app'
import * as Sentry from '@sentry/react'

import 'firebase/auth'
import 'firebase/firestore'

import { log, createCtx } from '../../utils'
import {
  authReducer,
  AuthContextActions,
  AuthContextState,
  UserDB,
} from './authReducer'
import { tenantsRef } from '../TenantContext'

type Dispatch = (action: AuthContextActions) => void

export const [useAuthState, AuthStateProvider] = createCtx<AuthContextState>()
export const [useAuthDispatch, AuthDispatchProvider] = createCtx<Dispatch>()

export const useAuth = () =>
  [useAuthState(), useAuthDispatch()] as [AuthContextState, Dispatch]

const usersRef = (db: firestore.Firestore) => db.collection('users')

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().signInWithRedirect(googleProvider)
}

export const upsertUser = (
  dispatch: Dispatch,
  { userData, userDbId }: { userData: UserDB; userDbId?: string }
) => {
  const db = firebase.firestore()
  const ref = usersRef(db)

  const op = userDbId
    ? ref.doc(userDbId).update(userData)
    : ref.add({ ...userData }).then((doc) => doc.id)

  return (op as Promise<string | undefined>)
    .then((id) => {
      if (id) {
        dispatch({ type: 'SET_DB_USER_ID', args: id })
      }

      dispatch({ type: 'SET_DB_USER', args: userData })
    })
    .catch((e) => {
      Sentry.captureException(e)
      throw e
    })
}

export const setHasTenant = (
  dispatch: Dispatch,
  { hasTenant, userDbId }: { hasTenant: boolean; userDbId: string }
) => {
  const db = firebase.firestore()
  const ref = usersRef(db)

  return ref
    .doc(userDbId)
    .update({
      hasTenant,
    })
    .then(() => {
      dispatch({ type: 'SET_DB_USER_FIELDS', args: { hasTenant } })
    })
}

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
  })

  useEffect(() => {
    const db = firebase.firestore()

    // TODO: Refact
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      log('Auth State Changed')
      log({ user })
      if (user) {
        usersRef(db)
          .where('uid', '==', user.uid)
          .limit(1)
          .get()
          .then((res) => {
            if (!res.empty) {
              const [doc] = res.docs
              const userDb = doc.data() as UserDB

              dispatch({ type: 'SET_DB_USER', args: userDb })
              dispatch({ type: 'SET_DB_USER_ID', args: doc.id })

              Sentry.setUser({ email: user.email ?? 'anon@alt.app.br' })

              // DATA MIGRATION WARNING
              // Some users who were onboarded before the new Admin may have tenants
              // but not have this flag set
              if (!userDb.hasTenant) {
                const query = tenantsRef(db)
                  .where('userId', '==', user.uid)
                  .limit(1)
                  .get()

                query.then((docs) => {
                  if (!docs.empty) {
                    setHasTenant(dispatch, {
                      hasTenant: true,
                      userDbId: doc.id,
                    })
                    dispatch({ type: 'SET_LOADING', args: false })
                  }
                })
              }
            }

            dispatch({ type: 'SET_AUTH_USER', args: user })
            dispatch({ type: 'SET_LOADING', args: false })
          })
      } else {
        dispatch({ type: 'SET_AUTH_USER', args: undefined })
        dispatch({ type: 'SET_DB_USER', args: undefined })
        dispatch({ type: 'SET_LOADING', args: false })
      }
    })

    return unsub
  }, [])

  return (
    <AuthStateProvider value={state}>
      <AuthDispatchProvider value={dispatch}>{children}</AuthDispatchProvider>
    </AuthStateProvider>
  )
}
