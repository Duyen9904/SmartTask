import { ArrowRight, CheckCircle2, Circle, Plus, Sparkles, Users, Video } from 'lucide-react'
import type { AIInsight, HuddleInfo, SharedChecklistItem } from '../../model/roomTypes'

/* ─── Checklist item icon ────────────────────────────────────────── */
function ChecklistIcon({ status }: { status: SharedChecklistItem['status'] }) {
  if (status === 'completed') {
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      </div>
    )
  }
  if (status === 'in_progress') {
    return (
      <div className="w-6 h-6 rounded-full border-2 border-primary/50 flex items-center justify-center shrink-0 animate-pulse">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    )
  }
  return (
    <div className="w-6 h-6 rounded-full border-2 border-white/20 shrink-0 hover:border-white/40 transition-colors cursor-pointer" />
  )
}

/* ─── Main workspace ─────────────────────────────────────────────── */
export function RoomWorkspace({
  roomName,
  roomNumber,
  priority,
  deadline,
  memberCount,
  checklist,
  aiInsight,
  huddle,
}: {
  roomName: string
  roomNumber: string
  priority: 'high' | 'medium' | 'low'
  deadline: string
  memberCount: number
  checklist: SharedChecklistItem[]
  aiInsight: AIInsight
  huddle: HuddleInfo
}) {
  const completedCount = checklist.filter((c) => c.status === 'completed').length
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0

  const priorityColor =
    priority === 'high'
      ? 'bg-red-500/15 text-red-400 border-red-500/20'
      : priority === 'medium'
        ? 'bg-amber-500/15 text-amber-400 border-amber-500/20'
        : 'bg-blue-500/15 text-blue-400 border-blue-500/20'

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* ── Room Header ──────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-6">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full tracking-wide">
            ROOM {roomNumber}
          </span>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${priorityColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {priority.toUpperCase()} PRIORITY
          </span>
        </div>

        {/* Title + meta */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
              {roomName.split('—')[0].trim()}
            </h1>
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                📅 Deadline: <span className="font-semibold text-white">{deadline}</span>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-semibold text-white">{memberCount}</span> active collaborators
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
              <Video className="h-4 w-4" />
              Join Video Call
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors border border-white/10">
              •••
            </button>
          </div>
        </div>
      </div>

      {/* ── Shared Checklist ──────────────────────────────────────── */}
      <div className="px-8 pb-6">
        <div className="bg-[#151a22] rounded-2xl border border-white/5 p-6">
          {/* Checklist header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-muted-foreground">☰</span>
                Shared Checklist
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-white">{progress}%</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">
            Real-time task synchronization across the room.
          </p>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-white/5 mb-6 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-1">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={[
                  'flex items-center gap-4 px-4 py-4 rounded-xl transition-all group',
                  item.status === 'completed'
                    ? 'bg-white/[0.02]'
                    : 'hover:bg-white/[0.03]',
                ].join(' ')}
              >
                <ChecklistIcon status={item.status} />

                <div className="flex-1 min-w-0">
                  <span
                    className={[
                      'text-sm font-semibold',
                      item.status === 'completed'
                        ? 'text-muted-foreground line-through'
                        : 'text-white',
                    ].join(' ')}
                  >
                    {item.title}
                  </span>
                  {item.assignee && item.estimatedTime && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assigned to {item.assignee} • {item.estimatedTime}
                    </p>
                  )}
                  {item.completedBy && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Completed by {item.completedBy} • {item.completedAgo}
                    </p>
                  )}
                  {item.waitingFor && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Waiting for {item.waitingFor} {item.waitingReason}
                    </p>
                  )}
                </div>

                {/* AI Suggestion badge */}
                {item.hasAiSuggestion && (
                  <span className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" />
                    AI Suggestion
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Add subtask */}
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-sm font-semibold text-muted-foreground hover:text-white hover:border-white/20 transition-all">
            <Plus className="h-4 w-4" />
            Add Subtask to Checklist
          </button>
        </div>
      </div>

      {/* ── Bottom Cards ─────────────────────────────────────────── */}
      <div className="px-8 pb-8 grid grid-cols-2 gap-4">
        {/* AI Room Insights */}
        <div className="bg-[#151a22] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-white">AI Room Insights</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {aiInsight.progressText}
          </p>
          <button className="flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all">
            {aiInsight.recommendation}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Upcoming Huddle */}
        <div className="bg-gradient-to-br from-[#1a1f2e] to-[#151a22] rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">
            {huddle.title}
          </span>
          <span className="text-3xl font-extrabold text-white mb-2">
            {huddle.timeRemaining}
          </span>
          <span className="text-sm text-muted-foreground">
            {huddle.topic}
          </span>
        </div>
      </div>
    </div>
  )
}
