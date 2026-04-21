import { useMemo } from 'react'
import type { TaskSummary } from '../../model/taskTypes'
import { dateKey, daysInMonth, firstDayOfWeek, isSameDay } from '@/utils/date'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DOW_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

type CalendarYearViewProps = {
  selectedDate: Date
  tasks: TaskSummary[]
  onDayClick: (date: Date) => void
  onMonthClick: (date: Date) => void
}

function MiniMonth({
  year,
  month,
  today,
  selectedDate,
  taskDates,
  onDayClick,
  onMonthClick,
}: {
  year: number
  month: number
  today: Date
  selectedDate: Date
  taskDates: Set<string>
  onDayClick: (date: Date) => void
  onMonthClick: (date: Date) => void
}) {
  const totalDays = daysInMonth(year, month)
  const startDow = firstDayOfWeek(year, month)

  const cells: (number | null)[] = [
    ...Array.from<null>({ length: startDow }).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  return (
    <div className="p-3 bg-white/[.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all">
      {/* Month title */}
      <button
        type="button"
        onClick={() => onMonthClick(new Date(year, month, 1))}
        className="text-sm font-bold text-white hover:text-primary transition-colors w-full text-left mb-2 px-1"
      >
        {MONTHS[month]}
      </button>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DOW_SHORT.map((d, i) => (
          <div key={`${d}-${i}`} className="text-center">
            <span className="text-[8px] font-bold text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-5" />
          }

          const key = dateKey(year, month, day)
          const cellDate = new Date(year, month, day)
          const isToday = isSameDay(cellDate, today)
          const isSelected = isSameDay(cellDate, selectedDate)
          const hasTask = taskDates.has(key)

          return (
            <button
              key={key}
              type="button"
              onClick={() => onDayClick(cellDate)}
              className={[
                'h-5 flex flex-col items-center justify-center rounded transition-all relative',
                isToday ? 'bg-primary text-white' : '',
                isSelected && !isToday ? 'bg-primary/20 text-primary' : '',
                !isToday && !isSelected ? 'text-white/60 hover:text-white hover:bg-white/5' : '',
              ].join(' ')}
            >
              <span className="text-[10px] font-medium leading-none">{day}</span>
              {hasTask && !isToday && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary/70" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function CalendarYearView({
  selectedDate,
  tasks,
  onDayClick,
  onMonthClick,
}: CalendarYearViewProps) {
  const year = selectedDate.getFullYear()
  const today = new Date()

  // Build a set of dates that have tasks for quick lookup
  const taskDates = useMemo(() => {
    const set = new Set<string>()
    for (const t of tasks) {
      const date = t.scheduledDate ?? t.dueDate
      if (date) set.add(date)
    }
    return set
  }, [tasks])

  return (
    <div className="bg-[#111124] rounded-b-3xl border border-white/5 border-t-0 p-6">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, m) => (
          <MiniMonth
            key={m}
            year={year}
            month={m}
            today={today}
            selectedDate={selectedDate}
            taskDates={taskDates}
            onDayClick={onDayClick}
            onMonthClick={onMonthClick}
          />
        ))}
      </div>
    </div>
  )
}
