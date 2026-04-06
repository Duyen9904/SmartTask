import type { AuthSession, LoginPayload, RegisterPayload, UserProfile } from '../model/authTypes'
import { httpClient } from '@/lib/httpClient'

export const authService = {
  login: (payload: LoginPayload) => httpClient.post<AuthSession>('/auth/login', payload),
  register: (payload: RegisterPayload) => httpClient.post<AuthSession>('/auth/register', payload),
  refresh: (refreshToken: string) =>
    httpClient.post<AuthSession>('/auth/refresh', { refreshToken }),
  me: () => httpClient.get<UserProfile>('/auth/me'),
  logout: () => httpClient.post<void>('/auth/logout'),
}
