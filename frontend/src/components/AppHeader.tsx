import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLogoutMutation } from '@/features/auth/api/useLogoutMutation'

export function AppHeader() {
  const { isAuthenticated, user } = useAuth()
  const logoutMutation = useLogoutMutation()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <header className="app-header">
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </nav>
      <div>
        {isAuthenticated ? (
          <>
            <span>{user?.fullName}</span>
            <button type="button" onClick={handleLogout} disabled={logoutMutation.isPending}>
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  )
}
