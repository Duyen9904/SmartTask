import { ArrowLeft, Expand, Grid3X3, Info, Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  callParticipantsMock,
  inCallMessagesMock,
  meetingNotesMock,
} from '../model/chatMockData'
import { CallControls } from './components/CallControls'
import { MeetingIntelSidebar } from './components/MeetingIntelSidebar'
import { VideoGrid } from './components/VideoGrid'

export function CallHubView() {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-[#0c0c1d] overflow-hidden">
      {/* Top bar */}
      <header className="h-12 shrink-0 flex items-center justify-between px-5 bg-black/30 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/social')}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-sm font-bold text-white">Sprint Planning</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">REC</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">00:15:24</span>
        </div>
        <div className="flex items-center gap-1">
          {[Grid3X3, Expand, Settings, Info].map((Icon, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex flex-col relative">
          <VideoGrid participants={callParticipantsMock} />

          {/* PiP self-view */}
          <div className="absolute bottom-20 left-4 w-32 h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
            <img
              src={callParticipantsMock[0].avatarUrl}
              alt="You"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-2">
              <span className="text-[8px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                YOU (LIVE)
              </span>
            </div>
          </div>

          {/* Controls */}
          <CallControls
            isMuted={isMuted}
            isCameraOff={isCameraOff}
            isChatOpen={isChatOpen}
            onToggleMic={() => setIsMuted((v) => !v)}
            onToggleCamera={() => setIsCameraOff((v) => !v)}
            onToggleChat={() => setIsChatOpen((v) => !v)}
          />
        </div>

        {/* Meeting intel sidebar */}
        {isChatOpen && (
          <MeetingIntelSidebar
            messages={inCallMessagesMock}
            participants={callParticipantsMock}
            notes={meetingNotesMock}
          />
        )}
      </div>
    </div>
  )
}
