import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials, clearCredentials } from '@/store/authSlice'
import type { AuthSession } from '@/features/auth/model/authTypes'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { session, user, isAuthenticated } = useAppSelector((state) => state.auth)

  const setAuthSession = useCallback(
    (next: AuthSession) => dispatch(setCredentials(next)),
    [dispatch],
  )

  const logoutLocal = useCallback(() => dispatch(clearCredentials()), [dispatch])

  return { session, isAuthenticated, user, setAuthSession, logoutLocal }
}
