import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthSession, UserProfile } from '@/features/auth/model/authTypes'
import { clearSession, getSession, setSession } from './authStore'

type AuthState = {
  session: AuthSession | null
  user: UserProfile | null
  isAuthenticated: boolean
}

const persisted = getSession()

const initialState: AuthState = {
  session: persisted,
  user: persisted?.user ?? null,
  isAuthenticated: Boolean(persisted?.accessToken),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthSession>) {
      const session = action.payload
      state.session = session
      state.user = session.user
      state.isAuthenticated = true
      setSession(session)
    },
    clearCredentials(state) {
      state.session = null
      state.user = null
      state.isAuthenticated = false
      clearSession()
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
