import { Check, ChevronDown, Send, X } from 'lucide-react'
import type { RoomTask } from '../../model/roomTypes'

export function TaskDetailPanel({
  task,
  onClose,
}: {
  task: RoomTask
  onClose: () => void
}) {
  const completedSubtasks = task.subtasks.filter((s) => s.done).length
  const totalSubtasks = task.subtasks.length
  const progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

  return (
    <aside className="w-72 shrink-0 bg-[#0f141a] border-l border-white/5 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Task Details</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Title */}
        <h2 className="text-base font-bold text-white leading-snug">{task.title}</h2>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Status
            </label>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 text-xs font-semibold text-white">
              {task.status === 'todo' ? 'To Do' : task.status === 'in_progress' ? 'In Progress' : 'Done'}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Priority
            </label>
            <button className={[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold',
              task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
              task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
              'bg-blue-500/10 text-blue-400',
            ].join(' ')}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </button>
          </div>
        </div>

        {/* Assignee */}
        {task.assignee && (
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Assignee
            </label>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
              <img
                src={task.assignee.avatarUrl}
                alt={task.assignee.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-white">{task.assignee.name}</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Description
          </label>
          <p className="text-xs text-white/70 leading-relaxed">
            Need to audit all surface and primary tokens against WCAG 2.1 AA standards.
            Ensure the deep navy background maintains 4.5:1 ratio with secondary labels.
          </p>
        </div>

        {/* Checklist */}
        {totalSubtasks > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Checklist
              </label>
              <span className="text-[10px] font-bold text-primary">{progress}%</span>
            </div>
            <div className="space-y-1.5">
              {task.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2.5">
                  <div
                    className={[
                      'w-4.5 h-4.5 rounded flex items-center justify-center shrink-0',
                      sub.done
                        ? 'bg-primary text-white'
                        : 'bg-white/5 border border-white/20',
                    ].join(' ')}
                  >
                    {sub.done && <Check className="h-3 w-3" />}
                  </div>
                  <span
                    className={[
                      'text-xs',
                      sub.done ? 'text-muted-foreground line-through' : 'text-white/80',
                    ].join(' ')}
                  >
                    {sub.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity & Comments */}
        {task.comments.length > 0 && (
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">
              Activity & Comments
            </label>
            <div className="space-y-3">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5">
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white">{comment.author.name}</span>
                      <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comment input */}
      <div className="mt-auto px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
