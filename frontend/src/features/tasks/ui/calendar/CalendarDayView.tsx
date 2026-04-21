import React, { useCallback, useRef, useState, useMemo } from 'react'
import { Clock } from 'lucide-react'
import type { TaskSummary, TaskCategory } from '../../model/taskTypes'
import { formatHour, formatTime, isSameDay } from '@/utils/date'

/* ─── Constants ───────────────────────────────────────────────────── */
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const SLOT_HEIGHT = 60
const HALF_SLOT = SLOT_HEIGHT / 2

const categoryColor: Record<TaskCategory, string> = {
  WORK: 'bg-blue-500/25 border-blue-500/40 text-blue-200',
  PERSONAL: 'bg-emerald-500/25 border-emerald-500/40 text-emerald-200',
  STUDY: 'bg-violet-500/25 border-violet-500/40 text-violet-200',
  HEALTH: 'bg-rose-500/25 border-rose-500/40 text-rose-200',
  SOCIAL: 'bg-amber-500/25 border-amber-500/40 text-amber-200',
}

/* ─── Types ───────────────────────────────────────────────────────── */
type TimeSlot = { startTime: string; endTime: string; date: string }

type CalendarDayViewProps = {
  selectedDate: Date
  tasks: TaskSummary[]
  onCreateFromSlot: (slot: TimeSlot) => void
  onTaskClick?: (task: TaskSummary) => void
}

/* ─── Task block on the timeline ──────────────────────────────────── */
function TaskBlock({
  task,
  onClick,
}: {
  task: TaskSummary
  onClick?: (task: TaskSummary) => void
}) {
  const [h, m] = (task.scheduledTime ?? '09:00').split(':').map(Number)
  const durationHrs = task.estimatedHours ? parseFloat(task.estimatedHours) : 1
  const topPx = h * SLOT_HEIGHT + (m / 60) * SLOT_HEIGHT
  const heightPx = Math.max(durationHrs * SLOT_HEIGHT, 28)

  const endH = Math.floor(h + durationHrs + m / 60)
  const endM = Math.round(((h + durationHrs + m / 60) % 1) * 60)
  const isDone = task.status === 'COMPLETED'

  return (
    <button
      type="button"
      onClick={() => onClick?.(task)}
      className={[
        'absolute left-[72px] right-3 rounded-lg border px-3 py-1.5 text-left transition-all z-10',
        'hover:scale-[1.01] hover:shadow-lg cursor-pointer group',
        categoryColor[task.category] ?? categoryColor.WORK,
        isDone ? 'opacity-50' : '',
      ].join(' ')}
      style={{ top: `${topPx}px`, height: `${heightPx}px`, minHeight: '28px' }}
    >
      <p className={[
        'text-sm font-semibold truncate leading-tight',
        isDone ? 'line-through' : '',
      ].join(' ')}>
        {task.title}
      </p>
      {heightPx >= 44 && (
        <span className="text-[10px] opacity-70 flex items-center gap-1 mt-0.5">
          <Clock className="h-2.5 w-2.5" />
          {formatHour(h)}:{String(m).padStart(2, '0')} – {formatHour(endH)}:{String(endM).padStart(2, '0')}
        </span>
      )}
    </button>
  )
}

/* ─── Selection overlay (drag preview) ────────────────────────────── */
function SelectionOverlay({ startY, endY }: { startY: number; endY: number }) {
  const top = Math.min(startY, endY)
  const height = Math.abs(endY - startY)
  if (height < 4) return null

  const startHour = Math.floor(top / SLOT_HEIGHT)
  const startMin = Math.round(((top % SLOT_HEIGHT) / SLOT_HEIGHT) * 60 / 15) * 15
  const endPos = top + height
  const endHour = Math.floor(endPos / SLOT_HEIGHT)
  const endMin = Math.round(((endPos % SLOT_HEIGHT) / SLOT_HEIGHT) * 60 / 15) * 15

  return (
    <div
      className="absolute left-[72px] right-3 bg-primary/20 border-2 border-primary/50 rounded-lg z-20 pointer-events-none flex items-center justify-center"
      style={{ top: `${top}px`, height: `${Math.max(height, 15)}px` }}
    >
      <span className="text-xs font-bold text-primary">
        {formatHour(startHour)}:{String(startMin).padStart(2, '0')} – {formatHour(endHour)}:{String(endMin).padStart(2, '0')}
      </span>
    </div>
  )
}

/* ─── Current time indicator ──────────────────────────────────────── */
function NowIndicator() {
  const now = new Date()
  const topPx = now.getHours() * SLOT_HEIGHT + (now.getMinutes() / 60) * SLOT_HEIGHT

  return (
    <div className="absolute left-0 right-0 z-30 pointer-events-none" style={{ top: `${topPx}px` }}>
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1" />
        <div className="flex-1 h-[2px] bg-red-500/80" />
      </div>
    </div>
  )
}

/* ─── Main Day View ───────────────────────────────────────────────── */
export function CalendarDayView({
  selectedDate,
  tasks,
  onCreateFromSlot,
  onTaskClick,
}: CalendarDayViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)

  const dateStr = useMemo(() => {
    const y = selectedDate.getFullYear()
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedDate.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }, [selectedDate])

  const dayTasks = useMemo(() => {
    return tasks.filter((t) => {
      const d = t.scheduledDate ?? t.dueDate
      return d === dateStr
    })
  }, [tasks, dateStr])

  const isToday = useMemo(() => isSameDay(selectedDate, new Date()), [selectedDate])

  const snapY = useCallback((y: number): number => {
    const quarterSlot = SLOT_HEIGHT / 4
    return Math.round(y / quarterSlot) * quarterSlot
  }, [])

  const getRelativeY = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(e.clientY - rect.top + containerRef.current.scrollTop, HOURS.length * SLOT_HEIGHT))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    const y = snapY(getRelativeY(e))
    setIsDragging(true)
    setDragStart(y)
    setDragEnd(y + HALF_SLOT)
  }, [snapY, getRelativeY])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setDragEnd(snapY(getRelativeY(e)))
  }, [isDragging, snapY, getRelativeY])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const top = Math.min(dragStart, dragEnd)
    const bottom = Math.max(dragStart, dragEnd)
    if (bottom - top < SLOT_HEIGHT / 4) return

    const startHour = Math.floor(top / SLOT_HEIGHT)
    const startMin = Math.round(((top % SLOT_HEIGHT) / SLOT_HEIGHT) * 60 / 15) * 15
    const endHour = Math.floor(bottom / SLOT_HEIGHT)
    const endMin = Math.round(((bottom % SLOT_HEIGHT) / SLOT_HEIGHT) * 60 / 15) * 15

    onCreateFromSlot({
      startTime: formatTime(startHour, startMin),
      endTime: formatTime(endHour, endMin),
      date: dateStr,
    })

    setDragStart(0)
    setDragEnd(0)
  }, [isDragging, dragStart, dragEnd, dateStr, onCreateFromSlot])

  // Scroll to ~7 AM on mount
  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.scrollTop = 7 * SLOT_HEIGHT - 20
    }
  }, [])

  // Day column header (weekday + day number)
  const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const dayNum = selectedDate.getDate()

  return (
    <div className="bg-[#111124] rounded-b-3xl border border-white/5 border-t-0 overflow-hidden">
      {/* Day column header */}
      <div className="flex items-center border-b border-white/5 px-6 py-3">
        <div className="w-[60px]">
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">GMT+07</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">{weekday}</span>
          <span
            className={[
              'text-2xl font-bold w-11 h-11 flex items-center justify-center rounded-full mt-0.5',
              isToday ? 'bg-primary text-white' : 'text-white',
            ].join(' ')}
          >
            {dayNum}
          </span>
        </div>
      </div>

      {/* Timeline grid */}
      <div
        ref={(node) => {
          scrollRef(node)
          ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className="relative overflow-y-auto max-h-[600px] select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { if (isDragging) handleMouseUp() }}
        onClick={(e) => {
          if (isDragging) return
          if ((e.target as HTMLElement).closest('button')) return
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          const y = Math.max(0, e.clientY - rect.top + containerRef.current.scrollTop)
          const hour = Math.floor(y / SLOT_HEIGHT)
          const min = Math.round(((y % SLOT_HEIGHT) / SLOT_HEIGHT) * 60 / 15) * 15
          onCreateFromSlot({
            startTime: formatTime(hour, min),
            endTime: formatTime(hour + 1, min),
            date: dateStr,
          })
        }}
        style={{ cursor: isDragging ? 'ns-resize' : 'crosshair' }}
      >
        <div className="relative" style={{ height: `${HOURS.length * SLOT_HEIGHT}px` }}>
          {/* Hour rows */}
          {HOURS.map((h) => (
            <div
              key={h}
              className="absolute left-0 right-0 border-b border-white/[0.04]"
              style={{ top: `${h * SLOT_HEIGHT}px`, height: `${SLOT_HEIGHT}px` }}
            >
              <span className="absolute left-3 -top-2.5 text-[10px] font-bold text-muted-foreground tabular-nums w-12">
                {formatHour(h)}
              </span>
              {/* Half-hour dashed line */}
              <div
                className="absolute left-[72px] right-0 border-b border-dashed border-white/[0.03]"
                style={{ top: `${HALF_SLOT}px` }}
              />
            </div>
          ))}

          {/* Task blocks */}
          {dayTasks.map((task) => (
            <TaskBlock key={task.id} task={task} onClick={onTaskClick} />
          ))}

          {/* Drag selection overlay */}
          {isDragging && <SelectionOverlay startY={dragStart} endY={dragEnd} />}

          {/* Current time red line */}
          {isToday && <NowIndicator />}
        </div>
      </div>
    </div>
  )
}
