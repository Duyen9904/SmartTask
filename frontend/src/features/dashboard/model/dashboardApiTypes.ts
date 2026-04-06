import type { CalendarDotType } from './dashboardTypes'

// These DTOs are placeholders for the future “data wiring” step.
// UI-first milestone: no API calls are made.

export type PhotoProofDto = {
  id: string
  title: string
  // In the real implementation this would be produced by `attachments` download-url flow.
  imageUrl: string
}

export type CalendarDotDto = CalendarDotType

export type MiniCalendarDayDto = {
  dayNumber: number
  dotTypes: CalendarDotDto[]
}

