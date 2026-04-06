import type { AuthSession } from '@/features/auth/model/authTypes'

const STORAGE_KEY = 'smarttask_auth_session'

const parseSession = (value: string | null): AuthSession | null => {
  if (!value) return null
  try {
    return JSON.parse(value) as AuthSession
  } catch {
    return null
  }
}

export const getSession = (): AuthSession | null => {
  return parseSession(localStorage.getItem(STORAGE_KEY))
}

export const setSession = (next: AuthSession) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export const isAuthenticated = () => Boolean(getSession()?.accessToken)
