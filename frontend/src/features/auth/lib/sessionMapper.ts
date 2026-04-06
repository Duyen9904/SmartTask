import type { AuthSession } from '../model/authTypes'

export const normalizeAuthSession = (session: AuthSession): AuthSession => {
  return {
    ...session,
    tokenType: session.tokenType || 'Bearer',
  }
}
