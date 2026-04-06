import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="layout layout-auth">
      <main className="layout-content auth-content">
        <Outlet />
      </main>
    </div>
  )
}
