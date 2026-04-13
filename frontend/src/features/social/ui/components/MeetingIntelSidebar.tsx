import { MessageSquare, Mic, MicOff, Sparkles, Users, Video, VideoOff } from 'lucide-react'
import { useState } from 'react'
import type { CallParticipant, InCallMessage, MeetingNote } from '../../model/chatTypes'

type Tab = 'chat' | 'people' | 'notes'

export function MeetingIntelSidebar({
  messages,
  participants,
  notes,
}: {
  messages: InCallMessage[]
  participants: CallParticipant[]
  notes: MeetingNote[]
}) {
  const [tab, setTab] = useState<Tab>('chat')

  const tabs: { label: string; value: Tab; icon: typeof MessageSquare }[] = [
    { label: 'CHAT', value: 'chat', icon: MessageSquare },
    { label: 'PEOPLE', value: 'people', icon: Users },
    { label: 'AI NOTES', value: 'notes', icon: Sparkles },
  ]

  return (
    <aside className="w-72 shrink-0 border-l border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-bold text-primary">Meeting Intel</h3>
        <p className="text-[10px] text-muted-foreground">AI-Powered Workspace</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={[
              'flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-bold uppercase tracking-wider transition-all border-b-2',
              tab === value
                ? 'text-white border-primary'
                : 'text-muted-foreground border-transparent hover:text-white',
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'chat' && <ChatTab messages={messages} />}
        {tab === 'people' && <PeopleTab participants={participants} />}
        {tab === 'notes' && <NotesTab notes={notes} />}
      </div>
    </aside>
  )
}

function ChatTab({ messages }: { messages: InCallMessage[] }) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id}>
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-xs font-bold ${msg.isAi ? 'text-emerald-400' : 'text-primary'}`}
            >
              {msg.senderName}
            </span>
            <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
          </div>
          <div
            className={[
              'text-xs leading-relaxed p-3 rounded-xl',
              msg.isAi
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-white/90'
                : 'bg-white/5 border border-white/10 text-white/80',
            ].join(' ')}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}

function PeopleTab({ participants }: { participants: CallParticipant[] }) {
  return (
    <div className="space-y-2">
      {participants.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10"
        >
          <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{p.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {p.isSpeaking ? '🔊 Speaking' : 'In call'}
            </p>
          </div>
          <div className="flex gap-1">
            {p.isMuted ? (
              <MicOff className="h-3.5 w-3.5 text-red-400" />
            ) : (
              <Mic className="h-3.5 w-3.5 text-emerald-400" />
            )}
            {p.isCameraOff ? (
              <VideoOff className="h-3.5 w-3.5 text-red-400" />
            ) : (
              <Video className="h-3.5 w-3.5 text-emerald-400" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function NotesTab({ notes }: { notes: MeetingNote[] }) {
  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-3">
          <div className="shrink-0 mt-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">{note.timestamp}</span>
            <p className="text-xs text-white/80 leading-relaxed mt-0.5">{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
