import { Zap } from 'lucide-react'
import { TaskListItem } from './TaskListItem'
import type { TaskStatus, TaskSummary } from '../model/taskTypes'

type TaskListViewProps = {
  tasks: TaskSummary[]
  isLoading?: boolean
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
  onEdit?: (task: TaskSummary) => void
}

/**
 * List view — renders only the task rows and the AI summary card.
 * Search, filters, pills, and tabs are handled by TasksPage (shared).
 */
export function TaskListView({ tasks, isLoading, onStatusChange, onEdit }: TaskListViewProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* ─── AI Flow Analysis ───────────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/10 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap className="h-16 w-16" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-black text-white uppercase tracking-widest">AI Flow Analysis</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">
            You've completed <span className="text-emerald-400 font-bold">12% more</span> tasks today. Focus on{' '}
            <span className="text-primary font-bold">Work</span> tasks next to stay ahead.
          </p>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: '68%' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-slate-400">Daily Goal Progress</span>
            <span className="text-[10px] font-bold text-emerald-400">68%</span>
          </div>
        </div>
      </div>

      {/* ─── Task List ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="text-sm text-muted-foreground italic">Loading tasks…</div>
        ) : tasks.length === 0 ? (
          <div className="text-sm text-muted-foreground italic">No tasks found.</div>
        ) : (
          tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}

