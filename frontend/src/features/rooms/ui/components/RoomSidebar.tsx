import {
  ClipboardList,
  FileText,
  FolderOpen,
  MessageSquare,
  Settings,
  Target,
  UserPlus,
} from 'lucide-react'
import type { RoomMember, RoomSection } from '../../model/roomTypes'

const navItems: { icon: typeof ClipboardList; label: string; section: RoomSection }[] = [
  { icon: ClipboardList, label: 'Task Board', section: 'task-board' },
  { icon: FileText, label: 'Shared Notes', section: 'shared-notes' },
  { icon: Target, label: 'Goals', section: 'goals' },
  { icon: FolderOpen, label: 'Resources', section: 'resources' },
  { icon: MessageSquare, label: 'Room Chat', section: 'room-chat' },
]

export function RoomSidebar({
  roomName,
  subtitle,
  members,
  activeSection,
  onSectionChange,
}: {
  roomName: string
  subtitle: string
  members: RoomMember[]
  activeSection: RoomSection
  onSectionChange: (s: RoomSection) => void
}) {
  const onlineMembers = members.filter((m) => m.isOnline)
  const currentUser = members[0]

  return (
    <aside className="w-60 shrink-0 bg-[#0a0e14] flex flex-col h-full">
      {/* Room header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-sm font-extrabold text-primary">
            {roomName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">{roomName.split('—')[0].trim()}</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Presence row */}
      <div className="px-5 pb-4">
        <div className="flex items-center">
          {onlineMembers.slice(0, 4).map((m, i) => (
            <img
              key={m.id}
              src={m.avatarUrl}
              alt={m.name}
              className="w-8 h-8 rounded-full border-2 border-[#0a0e14] object-cover"
              style={{ marginLeft: i > 0 ? '-8px' : 0, zIndex: 10 - i }}
            />
          ))}
          {onlineMembers.length > 4 && (
            <span
              className="w-8 h-8 rounded-full bg-primary/20 border-2 border-[#0a0e14] flex items-center justify-center text-[10px] font-bold text-primary"
              style={{ marginLeft: '-8px' }}
            >
              +{onlineMembers.length - 4}
            </span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          {onlineMembers.length} active now
        </p>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label, section }) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={[
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              activeSection === section
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-muted-foreground hover:text-white transition-colors">
          <UserPlus className="h-4 w-4" />
          Invite Members
        </button>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
