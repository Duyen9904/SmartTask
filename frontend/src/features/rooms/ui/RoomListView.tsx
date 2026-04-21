import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { roomsMock } from '../model/roomMockData'

export function RoomListView() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Task Rooms</h1>
          <p className="text-sm text-muted-foreground">
            Collaborative workspaces for your team
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          New Room
        </button>
      </div>

      {/* Room cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomsMock.map((room) => {
          const onlineCount = room.members.filter((m) =>
            room.activeMemberIds.includes(m.id)
          ).length
          const totalTasks = room.taskCounts.todo + room.taskCounts.inProgress + room.taskCounts.done
          const completionPct = totalTasks > 0
            ? Math.round((room.taskCounts.done / totalTasks) * 100)
            : 0

          return (
            <button
              key={room.id}
              onClick={() => navigate(`/dashboard/rooms/${room.id}`)}
              className="text-left p-5 rounded-2xl bg-[#151a21] hover:bg-[#1b2028] transition-all group border border-white/5 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(107,91,230,0.08)]"
            >
              {/* Room header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-sm font-extrabold text-primary">
                  {room.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400">
                    {onlineCount} active
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-0.5 group-hover:text-primary transition-colors">
                {room.name}
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                {room.subtitle}
              </p>

              {/* Task counts */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] text-muted-foreground">
                  📋 {room.taskCounts.todo} to do
                </span>
                <span className="text-[10px] text-amber-400">
                  ⚡ {room.taskCounts.inProgress} active
                </span>
                <span className="text-[10px] text-emerald-400">
                  ✅ {room.taskCounts.done} done
                </span>
              </div>

              {/* Progress */}
              <div className="h-1 rounded-full bg-white/5 mb-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {room.members.slice(0, 3).map((m, i) => (
                    <img
                      key={m.id}
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-6 h-6 rounded-full border-2 border-[#151a21] object-cover"
                      style={{ marginLeft: i > 0 ? '-6px' : 0, zIndex: 10 - i }}
                    />
                  ))}
                  {room.members.length > 3 && (
                    <span
                      className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#151a21] flex items-center justify-center text-[8px] font-bold text-muted-foreground"
                      style={{ marginLeft: '-6px' }}
                    >
                      +{room.members.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">{room.lastActivity}</span>
              </div>
            </button>
          )
        })}

        {/* Create room card */}
        <button
          className="p-5 rounded-2xl border border-dashed border-white/10 hover:border-primary/30 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold">Create New Room</span>
        </button>
      </div>
    </div>
  )
}
