import { Bell, Filter, Search, Share2 } from 'lucide-react'
import { useState } from 'react'
import { roomTasksMock } from '../model/roomMockData'
import type { RoomMember, RoomSection } from '../model/roomTypes'
import { KanbanBoard } from './components/KanbanBoard'
import { RoomSidebar } from './components/RoomSidebar'
import { TaskDetailPanel } from './components/TaskDetailPanel'

const viewTabs = ['Board', 'List', 'Timeline'] as const

export function TaskRoomView({
  roomName,
  subtitle,
  members,
}: {
  roomName: string
  subtitle: string
  members: RoomMember[]
}) {
  const [activeSection, setActiveSection] = useState<RoomSection>('task-board')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(roomTasksMock[0].id)
  const [activeView, setActiveView] = useState<string>('Board')

  const selectedTask = roomTasksMock.find((t) => t.id === selectedTaskId)

  return (
    <div className="flex h-screen bg-[#0a0e14] overflow-hidden">
      {/* Left sidebar */}
      <RoomSidebar
        roomName={roomName}
        subtitle={subtitle}
        members={members}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 shrink-0 flex items-center justify-between px-5 border-b border-white/5 bg-[#0a0e14]/80 backdrop-blur-xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <a href="/rooms" className="text-muted-foreground hover:text-white transition-colors">
              Rooms
            </a>
            <span className="text-muted-foreground/50">›</span>
            <span className="text-muted-foreground">{roomName.split('—')[0].trim()}</span>
            <span className="text-muted-foreground/50">›</span>
            <span className="text-white font-semibold">Task Board</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* View toggles */}
            <div className="flex bg-white/5 rounded-lg p-0.5">
              {viewTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveView(tab)}
                  className={[
                    'px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all',
                    activeView === tab
                      ? 'bg-white/10 text-white'
                      : 'text-muted-foreground hover:text-white',
                  ].join(' ')}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Quick filter..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-36 transition-colors"
              />
            </div>

            <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors relative">
              <Bell className="h-4 w-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-[11px] font-bold transition-colors flex items-center gap-1.5">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <KanbanBoard
            tasks={roomTasksMock}
            selectedTaskId={selectedTaskId}
            onSelectTask={setSelectedTaskId}
          />

          {selectedTask && (
            <TaskDetailPanel
              task={selectedTask}
              onClose={() => setSelectedTaskId(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
