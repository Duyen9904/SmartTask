import { Plus } from 'lucide-react'
import type { RoomTask, TaskStatus } from '../../model/roomTypes'
import { TaskCard } from './TaskCard'

const columns: { status: TaskStatus; label: string }[] = [
  { status: 'todo', label: 'TO DO' },
  { status: 'in_progress', label: 'IN PROGRESS' },
  { status: 'done', label: 'DONE' },
]

export function KanbanBoard({
  tasks,
  selectedTaskId,
  onSelectTask,
}: {
  tasks: RoomTask[]
  selectedTaskId: string | null
  onSelectTask: (id: string) => void
}) {
  return (
    <div className="flex-1 flex gap-4 p-4 overflow-x-auto">
      {columns.map(({ status, label }) => {
        const columnTasks = tasks.filter((t) => t.status === status)

        return (
          <div key={status} className="flex-1 min-w-[280px] flex flex-col">
            {/* Column header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {label}
                </h3>
                <span className="min-w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground px-1.5">
                  {columnTasks.length}
                </span>
              </div>
              <button className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onSelectTask(task.id)}
                  isSelected={selectedTaskId === task.id}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
