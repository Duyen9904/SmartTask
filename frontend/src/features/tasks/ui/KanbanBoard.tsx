import { Calendar, MoreHorizontal, Plus, Camera, CheckCircle, Zap, ShieldCheck } from 'lucide-react'
import type { TaskPriority, TaskStatus, TaskSummary } from '../model/taskTypes'

/* ─── Priority styling map ───────────────────────────────────────── */
const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-orange-500/5',  text: 'text-orange-400',   border: 'border-l-orange-400' },
  high:     { bg: 'bg-orange-500/10', text: 'text-orange-400',   border: 'border-l-transparent hover:border-l-primary' },
  medium:   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-l-emerald-400' },
  low:      { bg: 'bg-white/5',       text: 'text-slate-400',    border: 'border-l-slate-500/30' },
}

type KanbanCard = {
  id: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  priorityLabel: string
  statusLabel?: string
  assignees: { id: string; avatar?: string }[]
  dueDateLabel?: string
  isActive?: boolean
  isCompleted?: boolean
  hasProofIcon?: boolean
}

type KanbanColumn = {
  id: string
  title: string
  status: TaskStatus
  count: number
  cards: KanbanCard[]
}

function toKanbanPriority(priority: TaskPriority): KanbanCard['priority'] {
  switch (priority) {
    case 'CRITICAL':
      return 'critical'
    case 'HIGH':
      return 'high'
    case 'MEDIUM':
      return 'medium'
    case 'LOW':
    default:
      return 'low'
  }
}

function priorityLabel(priority: TaskPriority): string {
  switch (priority) {
    case 'CRITICAL':
      return 'Critical'
    case 'HIGH':
      return 'High Priority'
    case 'MEDIUM':
      return 'On Track'
    case 'LOW':
    default:
      return 'Low'
  }
}

function formatDueDateLabel(dueDate?: string): string | undefined {
  if (!dueDate) return undefined
  const d = new Date(dueDate)
  if (Number.isNaN(d.getTime())) return dueDate
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function buildKanbanColumns(tasks: TaskSummary[]): KanbanColumn[] {
  const byStatus: Record<TaskStatus, TaskSummary[]> = {
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  }

  for (const t of tasks) {
    byStatus[t.status]?.push(t)
  }

  const mkCol = (status: TaskStatus, title: string): KanbanColumn => {
    const cards: KanbanCard[] = byStatus[status].map((t) => ({
      id: t.id,
      title: t.title,
      priority: toKanbanPriority(t.priority),
      priorityLabel: priorityLabel(t.priority),
      assignees: [],
      dueDateLabel: formatDueDateLabel(t.dueDate),
      isCompleted: status === 'COMPLETED',
      isActive: status === 'IN_PROGRESS',
      hasProofIcon: false,
      statusLabel: status === 'IN_PROGRESS' ? 'Active' : undefined,
    }))

    return {
      id: `col-${status.toLowerCase()}`,
      title,
      status,
      count: cards.length,
      cards,
    }
  }

  return [
    mkCol('PENDING', 'To Do'),
    mkCol('IN_PROGRESS', 'In Progress'),
    mkCol('COMPLETED', 'Done'),
  ]
}

/* ─── Task Card ──────────────────────────────────────────────────── */
function TaskCardComponent({ card }: { card: KanbanCard }) {
  const p = priorityColors[card.priority] ?? priorityColors.low

  if (card.isCompleted) {
    return (
      <div className="bg-[#111124] p-6 rounded-2xl border-l-2 border-emerald-500/30 shadow-sm opacity-60 grayscale-[0.5]">
        <h4 className="text-lg font-bold leading-tight mb-4 line-through text-slate-500">{card.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Completed</span>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={[
        'p-6 rounded-2xl border-l-2 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group',
        card.isActive
          ? 'bg-[#1d1d34] border-l-4 border-l-emerald-400 shadow-2xl scale-[1.03] ring-1 ring-primary/20'
          : `bg-[#111124] ${p.border} hover:bg-[#1d1d34] hover:scale-[1.02]`,
      ].join(' ')}
    >
      {/* Top row: priority badge + icons */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold tracking-widest uppercase ${p.text} ${p.bg} px-2 py-1 rounded`}>
          {card.priorityLabel}
        </span>
        <div className="flex items-center gap-2">
          {card.statusLabel === 'Pending Approval' && (
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          )}
          {card.hasProofIcon && (
            <Camera className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>

      {/* Title */}
      <h4
        className={[
          'text-lg font-bold leading-tight mb-4',
          card.isActive ? 'text-primary' : 'text-white',
        ].join(' ')}
      >
        {card.title}
      </h4>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        {card.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {card.assignees.map((a) => (
              <div
                key={a.id}
                className="w-7 h-7 rounded-full bg-primary/20 border-2 border-[#111124] flex items-center justify-center text-[9px] font-bold text-white"
              >
                {a.id.slice(-2).toUpperCase()}
              </div>
            ))}
          </div>
        )}

        {card.dueDateLabel && (
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {card.dueDateLabel}
          </div>
        )}

        {card.statusLabel === 'Active' && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
            <Zap className="h-3.5 w-3.5" />
            Active
          </div>
        )}

        {card.statusLabel === 'Pending Approval' && (
          <div className="text-slate-400 text-[11px] font-medium">Pending Approval</div>
        )}
      </div>
    </div>
  )
}

/* ─── Column ─────────────────────────────────────────────────────── */
function KanbanColumnComponent({ column }: { column: KanbanColumn }) {
  const isInProgress = column.status === 'IN_PROGRESS'
  const isDone = column.status === 'COMPLETED'

  return (
    <div className="flex-1 flex flex-col min-w-[280px]">
      {/* Column header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
          {column.title}
          <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-medium">{column.count}</span>
        </h3>
        <button type="button" className="text-slate-500 cursor-pointer hover:text-white transition-colors">
          {column.status === 'PENDING' ? <Plus className="h-5 w-5" /> : <MoreHorizontal className="h-5 w-5" />}
        </button>
      </div>

      {/* Cards */}
      <div className={['flex-1 space-y-4 overflow-y-auto pr-2', isDone ? 'opacity-60 grayscale-[0.3]' : ''].join(' ')}>
        {column.cards.map((card) => (
          <TaskCardComponent key={card.id} card={card} />
        ))}

        {/* Drop target for In Progress */}
        {isInProgress && (
          <div className="border-2 border-dashed border-white/10 rounded-2xl h-32 flex items-center justify-center text-slate-500 italic text-sm">
            Drop task here
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Kanban Board ──────────────────────────────────────────── */
export function KanbanBoard({ tasks, isLoading }: { tasks: TaskSummary[]; isLoading?: boolean }) {
  const columns = buildKanbanColumns(tasks)
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {isLoading ? (
        <div className="text-sm text-muted-foreground italic">Loading tasks…</div>
      ) : columns.every((c) => c.count === 0) ? (
        <div className="text-sm text-muted-foreground italic">No tasks found.</div>
      ) : (
        columns.map((col) => <KanbanColumnComponent key={col.id} column={col} />)
      )}
    </div>
  )
}
