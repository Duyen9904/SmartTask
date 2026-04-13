import {
  Camera,
  MessageSquare,
  Mic,
  Monitor,
  PhoneOff,
  Smile,
  Users,
} from 'lucide-react'

export function CallControls({
  isMuted,
  isCameraOff,
  isChatOpen,
  onToggleMic,
  onToggleCamera,
  onToggleChat,
}: {
  isMuted: boolean
  isCameraOff: boolean
  isChatOpen: boolean
  onToggleMic: () => void
  onToggleCamera: () => void
  onToggleChat: () => void
}) {
  const controlBtns = [
    {
      icon: Mic,
      label: 'MIC',
      active: !isMuted,
      danger: isMuted,
      onClick: onToggleMic,
    },
    {
      icon: Camera,
      label: 'CAMERA',
      active: !isCameraOff,
      danger: isCameraOff,
      onClick: onToggleCamera,
    },
    { icon: Monitor, label: 'SHARE', active: false, onClick: () => {} },
  ]

  const secondaryBtns = [
    {
      icon: MessageSquare,
      label: 'CHAT',
      active: isChatOpen,
      onClick: onToggleChat,
    },
    { icon: Users, label: 'USERS', active: false, onClick: () => {} },
    { icon: Smile, label: 'REACT', active: false, onClick: () => {} },
  ]

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {/* Primary controls */}
      <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        {controlBtns.map(({ icon: Icon, label, active, danger, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={[
              'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
              danger
                ? 'text-red-400 bg-red-500/10'
                : active
                  ? 'text-white bg-white/10'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </div>

      {/* Secondary controls */}
      <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        {secondaryBtns.map(({ icon: Icon, label, active, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={[
              'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
              active
                ? 'text-primary bg-primary/15'
                : 'text-muted-foreground hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </div>

      {/* Leave button */}
      <button className="flex flex-col items-center gap-1 px-6 py-2 rounded-2xl bg-red-500/80 hover:bg-red-500 text-white transition-colors shadow-lg shadow-red-500/25">
        <PhoneOff className="h-5 w-5" />
        <span className="text-[9px] font-bold uppercase tracking-wider">LEAVE</span>
      </button>
    </div>
  )
}
