import { env } from '@/config/env'
import type { ApiRequestOptions, ApiResponse, PagedApiResponse } from '@/lib/apiTypes'
import { clearSession, getSession, setSession } from '@/store/authStore'
import type { AuthSession } from '@/features/auth/model/authTypes'
import { HttpError } from './httpErrors'

const basePath = `${env.apiBaseUrl}/api/${env.apiVersion}`

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

// ── Refresh-token mutex ──────────────────────────────────────────────────────
// Prevents multiple concurrent 401 responses from each triggering a separate
// refresh call.  The first caller starts the refresh; every subsequent caller
// awaits the same promise.  Once the promise resolves **all** queued callers
// retry with the fresh access token.

let refreshPromise: Promise<AuthSession | null> | null = null

const refreshAccessToken = async (refreshToken: string): Promise<AuthSession | null> => {
  // If a refresh is already in-flight, piggyback on it
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${basePath}/auth/refresh`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ refreshToken }),
      })
      if (!response.ok) throw new Error('refresh failed')
      const payload = (await response.json()) as ApiResponse<AuthSession>
      // Persist to localStorage
      setSession(payload.data)
      // Also sync Redux store if available
      syncReduxStore(payload.data)
      return payload.data
    } catch {
      clearSession()
      redirectToLogin()
      return null
    } finally {
      // Always clear the mutex so future 401s can trigger a fresh refresh
      refreshPromise = null
    }
  })()

  return refreshPromise
}

// ── Redux store sync ─────────────────────────────────────────────────────────
// httpClient lives outside of React, so we can't use hooks. Instead,
// the Redux store reference is injected once at app startup via
// `injectStoreForHttpClient`.

import type { Store } from '@reduxjs/toolkit'
import { setCredentials, clearCredentials } from '@/store/authSlice'

let _store: Store | null = null

/** Call this once from App.tsx (or main.tsx) to give httpClient access to Redux. */
export const injectStoreForHttpClient = (store: Store) => {
  _store = store
}

const syncReduxStore = (session: AuthSession) => {
  if (_store) _store.dispatch(setCredentials(session))
}

const redirectToLogin = () => {
  if (_store) _store.dispatch(clearCredentials())
  // Use window.location for a hard redirect – works even outside React Router
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
    window.location.href = '/login'
  }
}

// ── Core request function ────────────────────────────────────────────────────

const request = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const session = getSession()
  const token = options.token ?? session?.accessToken

  const response = await fetch(`${basePath}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      ...jsonHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  // ── Handle 401 with transparent refresh ──
  if (
    response.status === 401 &&
    !options.token && // don't retry if caller already provided a fresh token
    !path.includes('/auth/refresh') &&
    !path.includes('/auth/login') &&
    session?.refreshToken
  ) {
    const refreshed = await refreshAccessToken(session.refreshToken)
    if (refreshed) {
      // Retry the original request with the new access token
      return request<T>(path, { ...options, token: refreshed.accessToken })
    }
    // refresh failed → the user was already redirected to /login
    throw new HttpError('Session expired', 401)
  }

  const payload = (await response.json().catch(() => ({}))) as Partial<ApiResponse<T>>

  if (!response.ok) {
    throw new HttpError(payload.message ?? 'Request failed', response.status, payload.errors)
  }

  return (payload.data ?? payload) as T
}

// ── Public API ───────────────────────────────────────────────────────────────

export const httpClient = {
  get: <T>(path: string, token?: string) => request<T>(path, { method: 'GET', token }),
  post: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: 'POST', body, token }),
  put: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: 'PUT', body, token }),
  patch: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: 'PATCH', body, token }),
  delete: <T>(path: string, token?: string) => request<T>(path, { method: 'DELETE', token }),
}

// ── Paged request (re-uses the same refresh logic) ───────────────────────────

export const requestPaged = async <T>(path: string, tokenOverride?: string): Promise<PagedApiResponse<T>> => {
  const session = getSession()
  const token = tokenOverride ?? session?.accessToken

  const response = await fetch(`${basePath}${path}`, {
    method: 'GET',
    headers: {
      ...jsonHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  // ── Handle 401 with the shared refresh mutex ──
  if (
    response.status === 401 &&
    !tokenOverride &&
    session?.refreshToken
  ) {
    const refreshed = await refreshAccessToken(session.refreshToken)
    if (refreshed) {
      return requestPaged<T>(path, refreshed.accessToken)
    }
    throw new HttpError('Session expired', 401)
  }

  const payload = (await response.json().catch(() => ({}))) as Partial<PagedApiResponse<T>>

  if (!response.ok) {
    throw new HttpError(payload.message ?? 'Request failed', response.status)
  }

  return payload as PagedApiResponse<T>
}
