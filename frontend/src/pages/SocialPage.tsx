import { Outlet } from 'react-router-dom'
import { SocialTabSwitcher } from '@/features/social/ui/SocialTabSwitcher'

export function SocialPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Social Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect, collaborate, and stay accountable
        </p>
      </div>

      {/* Tab navigation */}
      <SocialTabSwitcher />

      {/* Active tab content */}
      <Outlet />
    </div>
  )
}
