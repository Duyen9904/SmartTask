import { useMemo } from 'react'
import { Plus, CheckCircle2 } from 'lucide-react'
import type { TaskSummary, TaskCategory } from '../../model/taskTypes'
import { dateKey, daysInMonth, firstDayOfWeek, isSameDay, toIsoDate } from '@/utils/date'

const DAYS_HEADER = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MAX_VISIBLE_TASKS = 3

/** Category-based color bands (Google Calendar style) */
const categoryBar: Record<TaskCategory, string> = {
  WORK: 'bg-blue-500/80 hover:bg-blue-500/90',
  PERSONAL: 'bg-emerald-500/80 hover:bg-emerald-500/90',
  STUDY: 'bg-violet-500/80 hover:bg-violet-500/90',
  HEALTH: 'bg-rose-500/80 hover:bg-rose-500/90',
  SOCIAL: 'bg-amber-500/80 hover:bg-amber-500/90',
}

type CalendarMonthViewProps = {
  selectedDate: Date
  tasks: TaskSummary[]
  onDayClick: (date: Date) => void
  onCreateTask: (date: Date) => void
  onTaskClick: (task: TaskSummary) => void
}

export function CalendarMonthView({
  selectedDate,
  tasks,
  onDayClick,
  onCreateTask,
  onTaskClick,
}: CalendarMonthViewProps) {
  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()
  const today = new Date()
  const totalDays = daysInMonth(year, month)
  const startDow = firstDayOfWeek(year, month)

  // Build task lookup by date
  const tasksByDate = useMemo(() => {
    const map: Record<string, TaskSummary[]> = {}
    for (const t of tasks) {
      const date = t.scheduledDate ?? t.dueDate
      if (!date) continue
      if (!map[date]) map[date] = []
      map[date].push(t)
    }
    return map
  }, [tasks])

  // Cells: previous month + current month + next month fill
  const cells: { day: number; isCurrentMonth: boolean; monthOffset: number }[] = []

  // Previous month trailing days
  const prevMonthDays = daysInMonth(year, month === 0 ? 11 : month - 1)
  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false, monthOffset: -1 })
  }

  // Current month
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, isCurrentMonth: true, monthOffset: 0 })
  }

  // Next month to fill grid
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, isCurrentMonth: false, monthOffset: 1 })
    }
  }

  return (
    <div className="bg-[#111124] rounded-b-3xl border border-white/5 border-t-0 overflow-hidden">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-b border-white/5">
        {DAYS_HEADER.map((d) => (
          <div key={d} className="py-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          const cellMonth = month + cell.monthOffset
          const cellYear = cellMonth < 0 ? year - 1 : cellMonth > 11 ? year + 1 : year
          const normalizedMonth = ((cellMonth % 12) + 12) % 12

          const key = cell.isCurrentMonth
            ? dateKey(year, month, cell.day)
            : `other-${idx}`

          const cellDate = new Date(cellYear, normalizedMonth, cell.day)
          const isToday = isSameDay(cellDate, today)
          const isSelected = cell.isCurrentMonth && isSameDay(cellDate, selectedDate)
          const cellKey = dateKey(cellYear, normalizedMonth, cell.day)
          const dayTasks = tasksByDate[cellKey] ?? []

          return (
            <div
              key={key}
              className={[
                'min-h-[120px] border-b border-r border-white/[.04] p-1.5 flex flex-col transition-all group/cell relative',
                cell.isCurrentMonth
                  ? 'hover:bg-white/[.03] cursor-pointer'
                  : 'opacity-30',
                isSelected ? 'bg-primary/5' : '',
              ].join(' ')}
              onClick={() => {
                if (cell.isCurrentMonth) onCreateTask(cellDate)
              }}
            >
              {/* Day number (top-left, Google Calendar style) + hover create button (top-right) */}
              <div className="flex items-start justify-between mb-1">
                <span
                  className={[
                    'text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-colors',
                    isToday ? 'bg-primary text-white' : '',
                    isSelected && !isToday ? 'text-primary font-bold' : '',
                    !isSelected && !isToday ? 'text-white/60' : '',
                  ].join(' ')}
                >
                  {cell.day}
                </span>

                {/* Hover + button for quick create */}
                {cell.isCurrentMonth && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onCreateTask(cellDate)
                    }}
                    className="opacity-0 group-hover/cell:opacity-100 p-0.5 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                    title="Create task"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Task bars (Google Calendar style colored horizontal bars) */}
              {cell.isCurrentMonth && dayTasks.length > 0 && (
                <div className="flex flex-col gap-[3px] flex-1 overflow-hidden">
                  {dayTasks.slice(0, MAX_VISIBLE_TASKS).map((task) => {
                    const isDone = task.status === 'COMPLETED'
                    const barColor = categoryBar[task.category] ?? categoryBar.WORK
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onTaskClick(task)
                        }}
                        className={[
                          'text-left w-full px-2 py-[3px] rounded-md text-[10px] font-medium truncate transition-all',
                          barColor,
                          isDone ? 'opacity-50 line-through' : '',
                          'text-white',
                        ].join(' ')}
                      >
                        <span className="flex items-center gap-1">
                          {isDone && (
                            <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
                          )}
                          {task.scheduledTime && !isDone && (
                            <span className="opacity-80 font-normal">{task.scheduledTime}</span>
                          )}
                          <span className="truncate">{task.title}</span>
                        </span>
                      </button>
                    )
                  })}
                  {dayTasks.length > MAX_VISIBLE_TASKS && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDayClick(cellDate)
                      }}
                      className="text-[10px] font-bold text-slate-400 hover:text-primary pl-2 text-left transition-colors"
                    >
                      +{dayTasks.length - MAX_VISIBLE_TASKS} more
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
