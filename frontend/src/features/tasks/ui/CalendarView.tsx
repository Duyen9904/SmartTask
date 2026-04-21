import { useState, useMemo, useCallback } from 'react'
import type { TaskSummary } from '../model/taskTypes'
import { toIsoDate } from '@/utils/date'

import { CalendarToolbar, type CalendarSubView } from './calendar/CalendarToolbar'
import { CalendarMonthView } from './calendar/CalendarMonthView'
import { CalendarWeekView } from './calendar/CalendarWeekView'
import { CalendarDayView } from './calendar/CalendarDayView'
import { CalendarYearView } from './calendar/CalendarYearView'

/* ─── Main Calendar View (Orchestrator) ──────────────────────────── */
export function CalendarView({
  tasks,
  isLoading,
  onCreateFromSlot,
  onTaskClick,
}: {
  tasks: TaskSummary[]
  isLoading?: boolean
  onCreateFromSlot: (slot: { startTime: string; endTime: string; date: string }) => void
  onTaskClick?: (task: TaskSummary) => void
}) {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [subView, setSubView] = useState<CalendarSubView>('month')

  /* ── Navigation ─────────────────────────────────────────────── */
  const handlePrev = useCallback(() => {
    setSelectedDate((d) => {
      const next = new Date(d)
      if (subView === 'day') next.setDate(next.getDate() - 1)
      else if (subView === 'week') next.setDate(next.getDate() - 7)
      else if (subView === 'month') next.setMonth(next.getMonth() - 1)
      else next.setFullYear(next.getFullYear() - 1)
      return next
    })
  }, [subView])

  const handleNext = useCallback(() => {
    setSelectedDate((d) => {
      const next = new Date(d)
      if (subView === 'day') next.setDate(next.getDate() + 1)
      else if (subView === 'week') next.setDate(next.getDate() + 7)
      else if (subView === 'month') next.setMonth(next.getMonth() + 1)
      else next.setFullYear(next.getFullYear() + 1)
      return next
    })
  }, [subView])

  const handleToday = useCallback(() => {
    setSelectedDate(new Date())
  }, [])

  /* ── Month-view callbacks ───────────────────────────────────── */
  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date)
  }, [])

  const handleCreateTaskOnDate = useCallback((date: Date) => {
    const iso = toIsoDate(date)
    onCreateFromSlot({ startTime: '09:00', endTime: '10:00', date: iso })
  }, [onCreateFromSlot])

  /* ── Year-view callbacks ────────────────────────────────────── */
  const handleYearDayClick = useCallback((date: Date) => {
    setSelectedDate(date)
    setSubView('month')
  }, [])

  const handleYearMonthClick = useCallback((date: Date) => {
    setSelectedDate(date)
    setSubView('month')
  }, [])

  /* ── Render ─────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <CalendarToolbar
        selectedDate={selectedDate}
        subView={subView}
        onSubViewChange={setSubView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />

      {/* Sub-view content */}
      {subView === 'month' && (
        <CalendarMonthView
          selectedDate={selectedDate}
          tasks={tasks}
          onDayClick={handleDayClick}
          onCreateTask={handleCreateTaskOnDate}
          onTaskClick={(task) => onTaskClick?.(task)}
        />
      )}

      {subView === 'week' && (
        <CalendarWeekView
          selectedDate={selectedDate}
          tasks={tasks}
          onCreateFromSlot={onCreateFromSlot}
          onTaskClick={onTaskClick}
        />
      )}

      {subView === 'day' && (
        <CalendarDayView
          selectedDate={selectedDate}
          tasks={tasks}
          onCreateFromSlot={onCreateFromSlot}
          onTaskClick={onTaskClick}
        />
      )}

      {subView === 'year' && (
        <CalendarYearView
          selectedDate={selectedDate}
          tasks={tasks}
          onDayClick={handleYearDayClick}
          onMonthClick={handleYearMonthClick}
        />
      )}
    </div>
  )
}
