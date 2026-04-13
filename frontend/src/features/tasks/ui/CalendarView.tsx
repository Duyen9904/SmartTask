import { useState, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Camera,
  Save,
  Copy,
  LayoutTemplate,
} from 'lucide-react'
import type { TaskPriority, TaskStatus, TaskSummary } from '../model/taskTypes'
import { TemplatePickerModal } from '../../templates/ui/TemplatePickerModal'
import { SaveAsTemplateModal } from '../../templates/ui/SaveAsTemplateModal'
import { CopyDayModal } from './CopyDayModal'

/* ─── Helpers ───────────────────────────────────────────────────── */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function firstDow(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

const priorityDot: Record<TaskPriority, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-emerald-400',
}

type CalendarTask = {
  id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD
  timeLabel?: string
  status: TaskStatus
  priority: TaskPriority
  subtasks?: { done: number; total: number }
}

/* ─── Side panel: day detail ─────────────────────────────────────── */
function DayDetail({
  date,
  tasks,
  onApplyTemplate,
  onSaveTemplate,
  onCopyDay,
}: {
  date: Date
  tasks: CalendarTask[]
  onApplyTemplate: () => void
  onSaveTemplate: () => void
  onCopyDay: () => void
}) {
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-white">Today's Tasks</h3>
        <div className="flex items-center gap-1">
          <button onClick={onCopyDay} title="Copy Day" className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded">
            <Copy className="h-4 w-4" />
          </button>
          <button onClick={onSaveTemplate} title="Save as Template" className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded">
            <Save className="h-4 w-4" />
          </button>
          <button onClick={onApplyTemplate} title="Apply Template" className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded">
            <LayoutTemplate className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mb-5">{formatted}</p>

      {tasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground italic">No tasks scheduled</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {tasks.map((t) => {
            const isCompleted = t.status === 'COMPLETED'
            return (
              <div
                key={t.id}
                className={[
                  'p-4 rounded-xl border transition-all cursor-pointer group',
                  isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
                    : 'bg-white/5 border-white/10 hover:border-primary/40 hover:bg-white/[.07]',
                ].join(' ')}
              >
                <div className="flex items-start gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={[
                        'text-sm font-semibold leading-snug',
                        isCompleted ? 'text-white/50 line-through' : 'text-white',
                      ].join(' ')}
                    >
                      {t.title}
                    </p>
                    {t.timeLabel && (
                      <span className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {t.timeLabel}
                      </span>
                    )}
                  </div>
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${priorityDot[t.priority] ?? 'bg-slate-500'}`} />
                </div>

                {/* Description preview */}
                {t.description && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-7">
                    {t.description}
                  </p>
                )}

                {/* Subtasks indicator */}
                {t.subtasks && (
                  <div className="mt-2.5 pl-7 flex items-center gap-2">
                    <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${(t.subtasks.done / t.subtasks.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {t.subtasks.done}/{t.subtasks.total}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Photo proof drop zone */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Photo Proof</h4>
        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/30 transition-colors cursor-pointer group">
          <Camera className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <p className="text-[11px] text-muted-foreground text-center">
            Drop photo proof here or<br />
            <span className="text-primary font-semibold">click to upload</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Calendar View ─────────────────────────────────────────── */
export function CalendarView({ tasks, isLoading }: { tasks: TaskSummary[]; isLoading?: boolean }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const [showApplyTemplate, setShowApplyTemplate] = useState(false)
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const [showCopyDay, setShowCopyDay] = useState(false)

  const totalDays = daysInMonth(year, month)
  const startDow = firstDow(year, month)
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate())

  // Build task lookup by date
  const tasksByDate = useMemo(() => {
    const map: Record<string, CalendarTask[]> = {}
    for (const t of tasks) {
      const date = t.dueDate || t.scheduledDate
      if (!date) continue
      const ct: CalendarTask = {
        id: t.id,
        title: t.title,
        description: t.description,
        date,
        status: t.status,
        priority: t.priority,
        timeLabel: t.scheduledTime ? String(t.scheduledTime) : undefined,
      }
      if (!map[date]) map[date] = []
      map[date].push(ct)
    }
    return map
  }, [tasks])

  const selectedKey = dateKey(year, month, selectedDay)
  const selectedTasks = tasksByDate[selectedKey] ?? []

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11) }
    else setMonth((m) => m - 1)
    setSelectedDay(1)
  }

  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0) }
    else setMonth((m) => m + 1)
    setSelectedDay(1)
  }

  // Generate grid cells (empty prefix + day numbers)
  const cells: (number | null)[] = [
    ...Array.from<null>({ length: startDow }).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* ── Calendar Grid ──────────────────────────────────────── */}
      <div className="col-span-12 lg:col-span-8">
        <div className="bg-[#111124] rounded-3xl border border-white/5 overflow-hidden">
          {/* Month header */}
          <div className="flex items-center justify-between px-6 py-5 bg-[#1d1d34]/50 border-b border-white/10">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {MONTHS[month]} {year}
            </h2>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-white/5">
            {DAYS.map((d) => (
              <div key={d} className="py-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="aspect-square border-b border-r border-white/[.03]" />
              }

              const key = dateKey(year, month, day)
              const isToday = key === todayKey
              const isSelected = day === selectedDay
              const dayTasks = tasksByDate[key] ?? []
              const hasTasks = dayTasks.length > 0
              const hasUrgent = dayTasks.some((t) => t.priority === 'HIGH' || t.priority === 'CRITICAL')
              const allDone = hasTasks && dayTasks.every((t) => t.status === 'COMPLETED')

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={[
                    'aspect-square border-b border-r border-white/[.03] p-2 flex flex-col items-center justify-start gap-1 transition-all relative group',
                    isSelected
                      ? 'bg-primary/10 ring-1 ring-inset ring-primary/30'
                      : 'hover:bg-white/[.03]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-colors',
                      isToday ? 'bg-primary text-white' : '',
                      isSelected && !isToday ? 'text-primary' : '',
                      !isSelected && !isToday ? 'text-white/70 group-hover:text-white' : '',
                    ].join(' ')}
                  >
                    {day}
                  </span>

                  {/* Task indicators */}
                  {hasTasks && (
                    <div className="flex items-center gap-0.5 mt-auto">
                      {hasUrgent && !allDone && (
                        <AlertTriangle className="h-2.5 w-2.5 text-red-400" />
                      )}
                      {allDone ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <div className="flex gap-0.5">
                          {dayTasks.slice(0, 3).map((t) => (
                            <span
                              key={t.id}
                              className={`w-1.5 h-1.5 rounded-full ${
                                t.status === 'COMPLETED'
                                  ? 'bg-emerald-400'
                                  : priorityDot[t.priority] ?? 'bg-slate-500'
                              }`}
                            />
                          ))}
                          {dayTasks.length > 3 && (
                            <span className="text-[8px] text-muted-foreground font-bold ml-0.5">
                              +{dayTasks.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Day Detail Sidebar ─────────────────────────────────── */}
      <aside className="col-span-12 lg:col-span-4">
        <div className="bg-[#111124] rounded-3xl border border-white/5 p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="text-sm text-muted-foreground italic">Loading tasks…</div>
          ) : (
            <DayDetail 
              date={new Date(year, month, selectedDay)} 
              tasks={selectedTasks} 
              onApplyTemplate={() => setShowApplyTemplate(true)}
              onSaveTemplate={() => setShowSaveTemplate(true)}
              onCopyDay={() => setShowCopyDay(true)}
            />
          )}
        </div>
      </aside>

      <TemplatePickerModal 
        isOpen={showApplyTemplate} 
        onClose={() => setShowApplyTemplate(false)} 
        targetDate={new Date(year, month, selectedDay)} 
      />
      <SaveAsTemplateModal 
        isOpen={showSaveTemplate} 
        onClose={() => setShowSaveTemplate(false)} 
        sourceDate={new Date(year, month, selectedDay)} 
      />
      <CopyDayModal 
        isOpen={showCopyDay} 
        onClose={() => setShowCopyDay(false)} 
        sourceDate={new Date(year, month, selectedDay)} 
      />
    </div>
  )
}
