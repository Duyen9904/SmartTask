import type {
  AiOptimizedScheduleModel,
  DashboardStatsRowModel,
  GroupChallengesModel,
  MoodCheckInModel,
  MiniCalendarModel,
  PhotoProofsWidgetModel,
  QuickAccessButtonsModel,
  SocialFeedModel,
  UpcomingDeadlinesModel,
  WeeklyPerformanceModel,
} from './dashboardTypes'

export const photoProofsMock: PhotoProofsWidgetModel = {
  title: 'Recent Photo Proofs',
  viewAllLabel: 'View All',
  addLabel: 'Add Proof',
  proofs: [
    {
      id: 'proof-1',
      title: 'Math Review Notes',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
    },
    {
      id: 'proof-2',
      title: 'Leg Day Complete',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsKtCPzzLSidJVxYY6u4LV4VZs2ymVYn9dnTZBYG92Bw166NaLz6F7gvXIByijkS1JxrXWR6--1q3AVVRC3LcFleqR01AE7DRw064tQjzf9FTL59hY6_eTNEWdsWOWU3V-xvDw-bzbiFzl1YIHgPSQHOdoczyd_63eWRAqXctoNxoqtyYOGwpfTik7I7iiN7kGJfgMHqNkEDLxmOUHnIM8CuvDl1W6KTCpJV4L4gGmKfgPnPZAFqy0vilb2L2LSIV98x4PSqb_tvg',
    },
    {
      id: 'proof-3',
      title: 'Ethics Paper Draft',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuARiNhKBnPj8_mujdiYCafWZZb8wvBfFTTNHB_UtIh4TRpJEXbIh5cO5L_8x4sFbNk5HLGEqgv-rvd9AgCAp0JiyicaNVLijfCPDXxI4scuL13nUXY252rvCAlCXLcGR-9JBq_G8IoU_6FVBA0AeslKqtoE-k3k9xkOY50bhslAdCrfuzOSByZ19YievoPLbVmfj1vjJnJT6YFlLARckqkwaKjexlWBTWoBV18wKVF2Y5dCmbNwhu7cUK4paOG5t7pGGf11istIgbRC',
    },
  ],
}

export const miniCalendarMock: MiniCalendarModel = {
  monthLabel: 'March 2026',
  weekDayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  cells: [
    { id: 'day-1', dayNumber: 1, dotTypes: [] },
    { id: 'day-2', dayNumber: 2, dotTypes: [] },
    { id: 'day-3', dayNumber: 3, dotTypes: ['urgency'] },
    { id: 'day-4', dayNumber: 4, dotTypes: [] },
    { id: 'day-5', dayNumber: 5, dotTypes: [] },
    { id: 'day-6', dayNumber: 6, dotTypes: ['completion'] },
    { id: 'day-7', dayNumber: 7, dotTypes: [] },

    { id: 'day-8', dayNumber: 8, dotTypes: [] },
    { id: 'day-9', dayNumber: 9, dotTypes: [] },
    { id: 'day-10', dayNumber: 10, dotTypes: ['urgency', 'success'] },
    { id: 'day-11', dayNumber: 11, dotTypes: [] },
    { id: 'day-12', dayNumber: 12, dotTypes: [] },
    { id: 'day-13', dayNumber: 13, dotTypes: [] },
    { id: 'day-14', dayNumber: 14, dotTypes: [] },

    { id: 'day-15', dayNumber: 15, dotTypes: [] },
    { id: 'day-16', dayNumber: 16, dotTypes: [] },
    { id: 'day-17', dayNumber: 17, dotTypes: [] },
    { id: 'day-18', dayNumber: 18, dotTypes: [] },
    { id: 'day-19', dayNumber: 19, dotTypes: ['urgency', 'success', 'completion'] },
    { id: 'day-20', dayNumber: 20, dotTypes: [] },
    { id: 'day-21', dayNumber: 21, dotTypes: [] },

    { id: 'day-22', dayNumber: 22, dotTypes: [] },
    { id: 'day-23', dayNumber: 23, dotTypes: [] },
    { id: 'day-24', dayNumber: 24, dotTypes: [] },
    { id: 'day-25', dayNumber: 25, dotTypes: [] },
    { id: 'day-26', dayNumber: 26, dotTypes: [] },
    { id: 'day-27', dayNumber: 27, dotTypes: [] },
    { id: 'day-28', dayNumber: 28, dotTypes: [] },
  ],
}

export const statsRowMock: DashboardStatsRowModel = {
  streakDaysLabel: 'Streak',
  streakValue: '14 Days',
  streakSubtext: '↑ 2 day record',
  tasksTodayLabel: 'Tasks Today',
  tasksTodayValue: '8/12',
  tasksTodayProgressPct: 67,
  productivityLabel: 'Productivity',
  productivityValue: '92/100',
  productivitySubtext: 'Top 5% this week',
  moodLabel: 'Mood',
  moodValue: 'Energized',
  moodSubtext: 'Stable',
}

export const quickAccessButtonsMock: QuickAccessButtonsModel = {
  buttons: [
    {
      id: 'qa-calendar',
      icon: 'calendar',
      label: 'Calendar View',
      count: '12',
      emoji: '📅',
    },
    {
      id: 'qa-gantt',
      icon: 'chart',
      label: 'Gantt Chart',
      count: '8',
      emoji: '📊',
    },
    {
      id: 'qa-board',
      icon: 'board',
      label: 'Board',
      count: '15',
      emoji: '🗂️',
    },
  ],
}

export const aiOptimizedScheduleMock: AiOptimizedScheduleModel = {
  title: 'AI Optimized Schedule',
  regenerateLabel: 'Regenerate Schedule',
  blocks: [
    {
      id: 'ai-1',
      timeLabel: '08:00 AM',
      title: 'Study Math: Calculus Review',
      badgeText: 'HIGH PRIORITY',
      badgeTone: 'urgency',
      variant: 'emptySquare',
    },
    {
      id: 'ai-2',
      timeLabel: '10:30 AM',
      title: 'Team Standup (Remote)',
      badgeText: 'Medium',
      badgeTone: 'medium',
      variant: 'completionCircle',
      completed: true,
    },
    {
      id: 'ai-3',
      timeLabel: '01:00 PM',
      title: 'Assignment Draft: Ethics Paper',
      badgeText: 'HIGH PRIORITY',
      badgeTone: 'urgency',
      variant: 'emptySquare',
    },
  ],
}

export const moodCheckInMock: MoodCheckInModel = {
  title: 'Mood Check-in',
  emojiOptions: [
    { id: 'm1', emoji: '😫' },
    { id: 'm2', emoji: '😕' },
    { id: 'm3', emoji: '😐' },
    { id: 'm4', emoji: '😊' },
    { id: 'm5', emoji: '🤩' },
  ],
  logLabel: 'Log Mood',
}

export const socialFeedMock: SocialFeedModel = {
  title: 'Social Activity',
  viewAllLabel: 'View All',
  items: [
    {
      id: 's1',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
      authorName: 'Sarah',
      message: 'completed Weekly Goal',
      actionHighlight: 'Weekly Goal',
      timeAgo: '2 hours ago',
    },
  ],
}

export const upcomingDeadlinesMock: UpcomingDeadlinesModel = {
  title: 'Upcoming Deadlines',
  items: [
    {
      id: 'd1',
      projectTitle: 'Project Proposal',
      endsInText: 'Ends in 4h 20m',
    },
  ],
}

export const weeklyPerformanceMock: WeeklyPerformanceModel = {
  title: 'Weekly Performance',
  subtitle: 'Data aggregated from all workspaces',
  filterLabel: 'LAST 7 DAYS',
  legend: [
    { id: 'l1', label: 'Focus Hours', variant: 'primary' },
    { id: 'l2', label: 'Admin', variant: 'admin' },
  ],
  days: [
    { id: 'mon', label: 'Mon', focusPct: 45, adminPct: 20 },
    { id: 'tue', label: 'Tue', focusPct: 65, adminPct: 30 },
    { id: 'wed', label: 'Wed', focusPct: 55, adminPct: 25 },
    { id: 'thu', label: 'Thu', focusPct: 90, adminPct: 35, isToday: true },
    { id: 'fri', label: 'Fri', focusPct: 30, adminPct: 15, isFuture: true },
    { id: 'sat', label: 'Sat', focusPct: 20, adminPct: 10, isFuture: true },
    { id: 'sun', label: 'Sun', focusPct: 15, adminPct: 8, isFuture: true },
  ],
}

export const groupChallengesMock: GroupChallengesModel = {
  title: 'Group Challenges',
  cards: [
    {
      id: 'gc1',
      title: '7-Day Productivity Sprint',
      teamLabel: 'Team #GrowthMindset',
      statusLabel: 'ACTIVE',
      participants: [
        {
          id: 'p1',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqMFaUgmEdKcrSOgTgXLvDQBPi8gXLjL9wYFnSfTQeZX7pqn6JUcHi9Sr-2aXykBjamrrzQCe7gJH7Q3nUYoGQKoi2XL2tiMiweUbBtiTEo76ELop9PCMBCXU1_a_SEx84R4TPds6zHyGkw1WlvLBvspJKw1LJ0-mpccMGVOmWdq5VTqbwpudgxsWRFL4KizuZfZvsEVG8hR9Zv_PlPrpUTO1PD7KqVQ7AmAiEmvoJ9mGyRYhf-KWTwLClw9AUelI6NeZNVY2TEKJu',
          extraCount: 0,
        },
        {
          id: 'p2',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
          extraCount: 0,
        },
      ],
      overallProgressLabel: 'Overall Progress',
      overallProgressPct: 78,
    },
    {
      id: 'gc2',
      title: 'Morning Routine Club',
      teamLabel: '5AM Collective',
      statusLabel: 'STREAKING',
      participants: [
        {
          id: 'p3',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
        },
        {
          id: 'p4',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
        },
      ],
      overallProgressLabel: 'Overall Progress',
      overallProgressPct: 42,
    },
  ],
  startTile: {
    title: 'Start a Challenge',
    description: 'Compete with friends & earn XP',
  },
}

