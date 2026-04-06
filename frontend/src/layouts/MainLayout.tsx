import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'

export function MainLayout() {
  return (
    <div className="layout layout-main">
      <AppHeader />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  )
}
