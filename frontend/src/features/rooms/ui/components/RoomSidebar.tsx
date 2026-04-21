import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import type { RoomSection } from '../../model/roomTypes'

const navItems: { icon: typeof ClipboardList; label: string; section: RoomSection }[] = [
  { icon: LayoutDashboard, label: 'My Tasks', section: 'task-board' },
  { icon: Users, label: 'Shared Rooms', section: 'shared-notes' },
  { icon: ClipboardList, label: 'Collaboration', section: 'goals' },
  { icon: BarChart3, label: 'Analytics', section: 'resources' },
  { icon: Settings, label: 'Settings', section: 'room-chat' },
]

export function RoomSidebar({
  roomName,
  subtitle,
  activeSection,
  onSectionChange,
}: {
  roomName: string
  subtitle: string
  activeSection: RoomSection
  onSectionChange: (s: RoomSection) => void
}) {
  return (
    <aside className="w-56 shrink-0 bg-[#0a0e14] flex flex-col h-full border-r border-white/5">
      {/* App branding */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-lg font-extrabold text-primary">✦</span>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight leading-tight">
              SmartTask Pro
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              AI-Powered Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Room context */}
      <div className="px-5 pb-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
          {subtitle}
        </p>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label, section }) => {
          const isActive = activeSection === section
          return (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={[
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all relative',
                isActive
                  ? 'text-white bg-primary/10'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5',
              ].join(' ')}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-primary" />
              )}
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all">
          <HelpCircle className="h-[18px] w-[18px]" />
          Support
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
