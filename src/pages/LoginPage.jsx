import React, { Fragment, useEffect } from 'react'
import { useNavigate } from '@reach/router'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { log } from '../util/utils'
import { useAuth } from '../contexts/AuthContext'

// uid
export default () => {
  const { loginWithGoogle, user, userDb, loading } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    log('Login Effect')
    log({ user })
    if (user && !userDb) {
      navigate('/onboard')
      return
    }
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="flex flex-column items-center pa2">
      {loading && (
        <h3 className="grey">Estamos verificando se você já está logado</h3>
      )}
      {!loading && (
        <Fragment>
          <h1>Login</h1>
          <GoogleLoginButton onClick={() => loginWithGoogle()} />
        </Fragment>
      )}
    </div>
  )
}
