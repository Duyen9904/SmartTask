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

  const payload = (await response.json().catch(() => ({}))) as Partial<ApiResponse<T>>

  if (response.status === 401 && !path.includes('/auth/refresh') && session?.refreshToken) {
    const refreshed = await refreshAccessToken(session.refreshToken)
    if (refreshed) {
      return request<T>(path, { ...options, token: refreshed.accessToken })
    }
  }

  if (!response.ok) {
    throw new HttpError(payload.message ?? 'Request failed', response.status, payload.errors)
  }

  return (payload.data ?? payload) as T
}

const refreshAccessToken = async (refreshToken: string): Promise<AuthSession | null> => {
  try {
    const response = await fetch(`${basePath}/auth/refresh`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ refreshToken }),
    })
    if (!response.ok) throw new Error('refresh failed')
    const payload = (await response.json()) as ApiResponse<AuthSession>
    setSession(payload.data)
    return payload.data
  } catch {
    clearSession()
    return null
  }
}

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

export const requestPaged = async <T>(path: string): Promise<PagedApiResponse<T>> => {
  const response = await fetch(`${basePath}${path}`, {
    method: 'GET',
    headers: jsonHeaders,
  })

  const payload = (await response.json()) as PagedApiResponse<T>
  if (!response.ok) {
    throw new HttpError(payload.message ?? 'Request failed', response.status)
  }

  return payload
}
