import {
  Calendar,
  Check,
  MoreVertical,
  Briefcase,
  GraduationCap,
  User,
  HeartPulse,
  Users,
} from 'lucide-react'
import type { TaskStatus, TaskSummary } from '../model/taskTypes'

const priorityConfig: Record<string, { bg: string; text: string; border: string }> = {
  CRITICAL: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-l-red-500' },
  HIGH:     { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-l-red-500' },
  MEDIUM:   { bg: 'bg-amber-500/20', text: 'text-amber-500', border: 'border-l-amber-500' },
  LOW:      { bg: 'bg-white/10', text: 'text-slate-400', border: 'border-l-primary/40' },
}

const categoryIcons: Record<string, React.ElementType> = {
  WORK: Briefcase,
  STUDY: GraduationCap,
  PERSONAL: User,
  HEALTH: HeartPulse,
  SOCIAL: Users,
}

function formatDueDateLabel(dueDate?: string): string | undefined {
  if (!dueDate) return undefined
  const d = new Date(dueDate)
  if (Number.isNaN(d.getTime())) return dueDate
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

type TaskListItemProps = {
  task: TaskSummary
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
  onEdit?: (task: TaskSummary) => void
}

export function TaskListItem({ task, onStatusChange, onEdit }: TaskListItemProps) {
  const p = priorityConfig[task.priority] ?? priorityConfig.MEDIUM
  const CategoryIcon = categoryIcons[task.category] ?? User
  const completed = task.status === 'COMPLETED'
  const dueDateLabel = formatDueDateLabel(task.dueDate)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onStatusChange) return
    onStatusChange(task.id, completed ? 'PENDING' : 'COMPLETED')
  }

  return (
    <div
      className={[
        'rounded-2xl p-4 flex items-center gap-4 group transition-all border-l-4 cursor-pointer',
        'bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]',
        'hover:border-primary/30',
        p.border,
        completed ? 'opacity-60' : '',
        (task.priority === 'HIGH' || task.priority === 'CRITICAL') && !completed ? 'shadow-xl shadow-red-500/5' : '',
      ].join(' ')}
      onClick={() => onEdit?.(task)}
    >
      {/* Checkbox */}
      {completed ? (
        <div
          className="flex items-center justify-center h-6 w-6 rounded-md bg-emerald-500/20 text-emerald-400 cursor-pointer flex-shrink-0 hover:bg-emerald-500/30 transition-colors"
          onClick={handleToggle}
          role="button"
          aria-label="Mark as pending"
        >
          <Check className="h-4 w-4" />
        </div>
      ) : (
        <div
          className="h-6 w-6 rounded-md border-2 border-white/20 hover:border-primary hover:bg-primary/10 transition-colors cursor-pointer flex-shrink-0"
          onClick={handleToggle}
          role="button"
          aria-label="Mark as completed"
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <h3
            className={[
              'text-sm font-bold truncate',
              completed ? 'text-slate-400 line-through' : 'text-white',
            ].join(' ')}
          >
            {task.title}
          </h3>
          <span className={`px-2 py-0.5 ${p.bg} ${p.text} text-[10px] font-bold rounded uppercase tracking-wider`}>
            {task.priority}
          </span>
          {(task.priority === 'HIGH' || task.priority === 'CRITICAL') && !completed && (
            <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>

        {task.description && !completed && (
          <p className="text-[11px] text-slate-400 mb-1 max-w-md truncate">{task.description}</p>
        )}

        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          {dueDateLabel && (
            <span
              className={[
                'flex items-center gap-1',
                (task.priority === 'HIGH' || task.priority === 'CRITICAL') && !completed ? 'text-red-400 font-semibold' : '',
              ].join(' ')}
            >
              <Calendar className="h-3 w-3" />
              {dueDateLabel}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CategoryIcon className="h-3 w-3" />
            {task.category}
          </span>
        </div>
      </div>

      {/* More menu */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onEdit?.(task)
        }}
        className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  )
}

