export type UserProfile = {
  id: string
  email: string
  fullName: string
  role: string
}

export type AuthSession = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: UserProfile
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
  password: string
  fullName: string
}
