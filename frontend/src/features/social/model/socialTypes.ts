/* ─── Activity Feed ──────────────────────────────────────────────── */

export type ActivityFeedItemType = 'deep_work' | 'badge' | 'template_share' | 'group_progress'

export type ActivityFeedItem = {
  id: string
  avatarUrl: string
  actorName: string
  type: ActivityFeedItemType
  description: string
  timeAgo: string
  /** Optional badge name (e.g. "Early Risen") */
  badgeName?: string
  /** Optional template metadata */
  template?: {
    name: string
    taskCount: number
    downloads: number
  }
  /** Optional group progress metadata */
  group?: {
    name: string
    progressPct: number
    message: string
  }
}

/* ─── Online Friends ─────────────────────────────────────────────── */

export type OnlineFriend = {
  id: string
  name: string
  avatarUrl: string
  statusText: string
  isOnline: boolean
}

/* ─── Groups ─────────────────────────────────────────────────────── */

export type SocialGroup = {
  id: string
  name: string
  memberCount: number
  status: 'Active' | 'Deep Work' | 'Idle'
}

/* ─── Leaderboard ────────────────────────────────────────────────── */

export type LeaderboardEntry = {
  id: string
  name: string
  points: number
  rank: number
}

/* ─── Friend Suggestions (Find Friends) ──────────────────────────── */

export type FriendSuggestion = {
  id: string
  name: string
  bio: string
  avatarUrl: string
  mutualCount?: number
}

/* ─── Friend Requests (Find Friends) ─────────────────────────────── */

export type FriendRequest = {
  id: string
  name: string
  handle: string
  contextText: string
  avatarUrl: string
}



/* ─── Group Challenge Banner ─────────────────────────────────────── */

export type GroupChallengeBanner = {
  title: string
  participantCount: number
  ctaLabel: string
}
