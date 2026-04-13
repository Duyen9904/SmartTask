import { MoreHorizontal } from 'lucide-react'
import type { RoomTask } from '../../model/roomTypes'

const priorityStyles: Record<string, string> = {
  high: 'bg-red-500/15 text-red-400',
  medium: 'bg-amber-500/15 text-amber-400',
  low: 'bg-blue-500/15 text-blue-400',
}

export function TaskCard({
  task,
  onClick,
  isSelected,
}: {
  task: RoomTask
  onClick: () => void
  isSelected: boolean
}) {
  const completedSubtasks = task.subtasks.filter((s) => s.done).length
  const totalSubtasks = task.subtasks.length
  const progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

  return (
    <button
      onClick={onClick}
      className={[
        'w-full text-left p-4 rounded-xl transition-all group',
        isSelected
          ? 'bg-[#1b2028] ring-1 ring-primary/30'
          : 'bg-[#151a21] hover:bg-[#1b2028]',
        task.editingBy ? 'ring-1 ring-primary/20 shadow-[0_0_12px_rgba(107,91,230,0.1)]' : '',
      ].join(' ')}
    >
      {/* Priority + menu */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-white transition-all">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-white leading-snug mb-3">{task.title}</h4>

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              📅 {task.dueDate}
            </span>
          )}
          {!task.dueDate && task.editingBy && null}
          {task.comments.length > 0 && (
            <span>💬 {task.comments.length} comments</span>
          )}
        </div>
        {task.assignee && (
          <img
            src={task.assignee.avatarUrl}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
          />
        )}
      </div>

      {/* Subtask progress */}
      {totalSubtasks > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">
              {completedSubtasks}/{totalSubtasks} subtasks
            </span>
            <span className="text-[10px] text-primary font-semibold">{progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Editing indicator */}
      {task.editingBy && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary italic">
            {task.editingBy} is editing...
          </span>
        </div>
      )}
    </button>
  )
}
