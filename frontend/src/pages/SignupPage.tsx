import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { SignupForm } from '@/features/auth'

export function SignupPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return <SignupForm />
}
