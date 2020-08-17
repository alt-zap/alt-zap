import { User } from 'firebase/app'

import { Action } from '../../typings'

export type AuthContextActions =
  | Action<'SET_LOADING', { args: boolean }>
  | Action<'SET_AUTH_USER', { args: User | undefined }>
  | Action<'SET_DB_USER', { args: UserDB | undefined }>
  | Action<'SET_DB_USER_ID', { args: string | undefined }>
  | Action<'SET_DB_USER_ID', { args: string | undefined }>
  | Action<'SET_DB_USER_FIELDS', { args: Partial<UserDB> }>

export type UserDB = {
  uid: string
  name: string
  document: string
  email?: string
  hasTenant?: boolean
}

export type AuthContextState = {
  loading?: boolean
  user?: User
  userDb?: UserDB
  userDbId?: string
}

export const authReducer = (
  state: AuthContextState,
  action: AuthContextActions
): AuthContextState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.args }

    case 'SET_AUTH_USER':
      return { ...state, user: action.args }

    case 'SET_DB_USER':
      return { ...state, userDb: action.args }

    case 'SET_DB_USER_FIELDS':
      return {
        ...state,
        userDb: {
          ...(state.userDb as UserDB),
          ...action.args,
        },
      }

    case 'SET_DB_USER_ID':
      return { ...state, userDbId: action.args }

    default:
      throw new Error('Auth Reducer: Unsupported action type')
  }
}
