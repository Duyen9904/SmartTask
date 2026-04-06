import {
  Archive,
  Bell,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Timer,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLogoutMutation } from '@/features/auth/api/useLogoutMutation'

/* ─── Sidebar nav item ──────────────────────────────────────────── */
function SidebarLink({
  to,
  icon: Icon,
  children,
}: {
  to: string
  icon: React.ElementType
  children: ReactNode
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all',
          isActive
            ? 'text-white bg-primary/15 border-l-[3px] border-primary -ml-[3px]'
            : 'text-muted-foreground hover:text-white hover:bg-white/5',
        ].join(' ')
      }
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="uppercase tracking-wide text-xs">{children}</span>
    </NavLink>
  )
}

/* ─── User avatar ────────────────────────────────────────────────── */
function NavAvatar() {
  const { user } = useAuth()
  const initial = user?.fullName?.trim()?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full ring-2 ring-primary/30 overflow-hidden flex items-center justify-center bg-primary/10">
        <span className="text-xs font-bold text-white">{initial}</span>
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-semibold text-white leading-none">{user?.fullName ?? 'Alex Sterling'}</p>
        <p className="text-[10px] text-muted-foreground">Lead Designer</p>
      </div>
    </div>
  )
}

/* ─── Fixed left sidebar ─────────────────────────────────────────── */
function Sidebar() {
  const logoutMutation = useLogoutMutation()

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-[240px] bg-card border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white">SmartTask Pro</span>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Enterprise Tier</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
        <SidebarLink to="/dashboard/tasks" icon={ListTodo}>Tasks</SidebarLink>
        <SidebarLink to="/dashboard/social" icon={Users}>Social</SidebarLink>
        <SidebarLink to="/dashboard/ai" icon={Sparkles}>AI Assistant</SidebarLink>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-6 space-y-3">
        <button
          type="button"
          className="w-full py-2.5 rounded-xl bg-[#00B894] hover:bg-[#00a884] text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Upgrade Workspace
        </button>

        <div className="space-y-1">
          <button
            type="button"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Help Center</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-all w-full"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-xs font-medium">
              {logoutMutation.isPending ? 'Logging out…' : 'Log Out'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}

/* ─── Top header for main content area ───────────────────────────── */
function TopBar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="h-14 px-6 flex items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, teams, or AI insights..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 ml-4">
          <button type="button" className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-muted-foreground hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" />
            Focus Mode
          </button>
          <button type="button" className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-muted-foreground hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Team
          </button>
          <button type="button" className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-muted-foreground hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
            <Archive className="h-3.5 w-3.5" />
            Archive
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Notification */}
          <div className="relative p-2 text-muted-foreground hover:text-white cursor-pointer transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-destructive text-white text-[9px] font-bold flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Settings */}
          <button type="button" className="p-2 text-muted-foreground hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>

          {/* Create New */}
          <button
            type="button"
            className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Create New
          </button>

          {/* Avatar */}
          <NavAvatar />
        </div>
      </div>
    </header>
  )
}

/* ─── Root layout ────────────────────────────────────────────────── */
export function StitchDashboardLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 ml-[240px] flex flex-col">
        <TopBar />

        <main className="px-6 py-6 flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
