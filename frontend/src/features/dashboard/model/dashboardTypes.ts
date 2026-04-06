export type CalendarDotType = 'urgency' | 'success' | 'completion'

export type PhotoProof = {
  id: string
  title: string
  imageUrl: string
}

export type MiniCalendarCell = {
  id: string
  dayNumber?: number
  dotTypes: CalendarDotType[]
}

export type MiniCalendarModel = {
  monthLabel: string
  weekDayLabels: string[] // length 7
  cells: MiniCalendarCell[] // expected length 28 (4 weeks x 7 days)
}

export type PhotoProofsWidgetModel = {
  title: string
  viewAllLabel: string
  addLabel: string
  proofs: PhotoProof[]
}

export type DashboardStatsRowModel = {
  streakDaysLabel: string
  streakValue: string
  streakSubtext: string
  tasksTodayLabel: string
  tasksTodayValue: string
  tasksTodayProgressPct: number
  productivityLabel: string
  productivityValue: string
  productivitySubtext: string
  moodLabel: string
  moodValue: string
  moodSubtext: string
}

export type QuickAccessButtonIcon = 'calendar' | 'chart' | 'board'

export type QuickAccessButtonsModel = {
  buttons: Array<{
    id: string
    icon: QuickAccessButtonIcon
    label: string
    count: string
    emoji: string
  }>
}

export type AiScheduleTimelineBadgeTone = 'urgency' | 'medium' | 'health' | 'social'

export type AiScheduleTimelineBlockModel = {
  id: string
  timeLabel: string
  title: string
  badgeText: string
  badgeTone: AiScheduleTimelineBadgeTone
  variant: 'emptySquare' | 'completionCircle'
  completed?: boolean
}

export type AiOptimizedScheduleModel = {
  title: string
  regenerateLabel: string
  blocks: AiScheduleTimelineBlockModel[]
}

export type MoodCheckInModel = {
  title: string
  emojiOptions: Array<{ id: string; emoji: string }>
  logLabel: string
}

export type SocialFeedModel = {
  title: string
  viewAllLabel: string
  items: Array<{
    id: string
    avatarUrl: string
    authorName: string
    message: string
    actionHighlight: string
    timeAgo: string
  }>
}

export type UpcomingDeadlinesModel = {
  title: string
  items: Array<{
    id: string
    projectTitle: string
    endsInText: string
  }>
}

export type WeeklyPerformanceDayModel = {
  id: string
  label: string
  focusPct: number
  adminPct: number
  isToday?: boolean
  isFuture?: boolean
}

export type WeeklyPerformanceModel = {
  title: string
  subtitle: string
  filterLabel: string
  legend: Array<{ id: string; label: string; variant: 'primary' | 'admin' }>
  days: WeeklyPerformanceDayModel[]
}

export type GroupChallengeParticipantModel = {
  id: string
  avatarUrl: string
  extraCount?: number
}

export type GroupChallengeCardModel = {
  id: string
  title: string
  teamLabel: string
  statusLabel: string
  participants: GroupChallengeParticipantModel[]
  overallProgressLabel: string
  overallProgressPct: number
}

export type GroupChallengesModel = {
  title: string
  cards: GroupChallengeCardModel[]
  startTile: {
    title: string
    description: string
  }
}

