/* ─── Date & Time Utilities ──────────────────────────────────────── */

/** Full date-time formatter: "Apr 15, 2026, 01:30 PM" */
export const formatDateTime = (value: string | undefined): string => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/** Format an hour number (0–23) to 12-hour label: "9 AM", "12 PM", "3 PM" */
export function formatHour(h: number): string {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

/** Format hour + minute to HH:mm string: "08:30" */
export function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** Convert a Date to ISO date string: "2026-04-15" */
export function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** Build YYYY-MM-DD from separate year/month(0-indexed)/day */
export function dateKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

/** Get the Monday of the week containing `d` */
export function startOfWeek(d: Date): Date {
  const copy = new Date(d)
  const dow = copy.getDay() // 0 Sun … 6 Sat
  const diff = (dow + 6) % 7 // make Monday=0
  copy.setDate(copy.getDate() - diff)
  return copy
}

/**
 * Calculate duration in minutes between two HH:mm strings.
 * Returns a negative value if end is before start.
 */
export function timeDiffMinutes(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return (eh * 60 + em) - (sh * 60 + sm)
}

/** Format a minute-count to a readable duration: "1h 30m" */
export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  const parts: string[] = []
  if (hrs > 0) parts.push(`${hrs}h`)
  if (mins > 0) parts.push(`${mins}m`)
  return parts.join(' ') || '0m'
}

/** Check whether two Dates fall on the same calendar day */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Number of days in a given year/month (0-indexed month) */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/** Day-of-week (0=Sun) of the 1st of a given year/month */
export function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

/** Get the Sunday that starts the week containing `d` */
export function startOfWeekSun(d: Date): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() - copy.getDay())
  return copy
}

/** Get the Saturday that ends the week containing `d` */
export function endOfWeekSat(d: Date): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + (6 - copy.getDay()))
  return copy
}

/** Get all 7 days of the week (Sun–Sat) containing `d` */
export function getWeekDays(d: Date): Date[] {
  const sun = startOfWeekSun(d)
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(sun)
    day.setDate(sun.getDate() + i)
    return day
  })
}

/** Format a week range like "Apr 20 – 26, 2026" or "Mar 30 – Apr 5, 2026" */
export function formatWeekRange(d: Date): string {
  const sun = startOfWeekSun(d)
  const sat = endOfWeekSat(d)
  const monthShort = (dt: Date) =>
    dt.toLocaleDateString('en-US', { month: 'short' })

  if (sun.getMonth() === sat.getMonth()) {
    return `${monthShort(sun)} ${sun.getDate()} – ${sat.getDate()}, ${sat.getFullYear()}`
  }
  return `${monthShort(sun)} ${sun.getDate()} – ${monthShort(sat)} ${sat.getDate()}, ${sat.getFullYear()}`
}
