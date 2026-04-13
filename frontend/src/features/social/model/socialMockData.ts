import type {
  ActivityFeedItem,
  FriendRequest,
  FriendSuggestion,
  GroupChallengeBanner,
  LeaderboardEntry,
  OnlineFriend,
  SocialGroup,
} from './socialTypes'

/* ─── Activity Feed ──────────────────────────────────────────────── */

export const activityFeedMock: ActivityFeedItem[] = [
  {
    id: 'af-1',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
    actorName: 'Sarah Chen',
    type: 'deep_work',
    description:
      'Just finished 4 hours of Deep Work! Focused on the UI overhaul for the client project. 🚀',
    timeAgo: '2 hours ago',
  },
  {
    id: 'af-2',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqMFaUgmEdKcrSOgTgXLvDQBPi8gXLjL9wYFnSfTQeZX7pqn6JUcHi9Sr-2aXykBjamrrzQCe7gJH7Q3nUYoGQKoi2XL2tiMiweUbBtiTEo76ELop9PCMBCXU1_a_SEx84R4TPds6zHyGkw1WlvLBvspJKw1LJ0-mpccMGVOmWdq5VTqbwpudgxsWRFL4KizuZfZvsEVG8hR9Zv_PlPrpUTO1PD7KqVQ7AmAiEmvoJ9mGyRYhf-KWTwLClw9AUelI6NeZNVY2TEKJu',
    actorName: 'Mike Rodriguez',
    type: 'badge',
    description:
      'Earned the "Early Risen" badge for completing 5 tasks before 8:00 AM this week!',
    timeAgo: '4 hours ago',
    badgeName: 'Early Risen',
  },
  {
    id: 'af-3',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
    actorName: 'Study Buddies',
    type: 'group_progress',
    description: 'Group Progress • 85% Weekly Goal',
    timeAgo: '5 hours ago',
    group: {
      name: 'Study Buddies',
      progressPct: 85,
      message:
        "We're almost at our weekly study goal, team! Keep the momentum up for the final sprint.",
    },
  },
  {
    id: 'af-4',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
    actorName: 'Emma Wilson',
    type: 'template_share',
    description: 'Shared a new template',
    timeAgo: '1 hour ago',
    template: {
      name: 'Ultimate Morning Routine',
      taskCount: 7,
      downloads: 420,
    },
  },
]

/* ─── Online Friends ─────────────────────────────────────────────── */

export const onlineFriendsMock: OnlineFriend[] = [
  {
    id: 'of-1',
    name: 'David Park',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
    statusText: 'Designing UI Kit...',
    isOnline: true,
  },
  {
    id: 'of-2',
    name: 'Alex Rivera',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
    statusText: 'Deep Work Session',
    isOnline: true,
  },
  {
    id: 'of-3',
    name: 'Jason Lee',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsKtCPzzLSidJVxYY6u4LV4VZs2ymVYn9dnTZBYG92Bw166NaLz6F7gvXIByijkS1JxrXWR6--1q3AVVRC3LcFleqR01AE7DRw064tQjzf9FTL59hY6_eTNEWdsWOWU3V-xvDw-bzbiFzl1YIHgPSQHOdoczyd_63eWRAqXctoNxoqtyYOGwpfTik7I7iiN7kGJfgMHqNkEDLxmOUHnIM8CuvDl1W6KTCpJV4L4gGmKfgPnPZAFqy0vilb2L2LSIV98x4PSqb_tvg',
    statusText: 'Offline',
    isOnline: false,
  },
]

/* ─── Groups ─────────────────────────────────────────────────────── */

export const groupsMock: SocialGroup[] = [
  { id: 'g-1', name: 'Study Buddies', memberCount: 24, status: 'Active' },
  { id: 'g-2', name: 'Wellness Warriors', memberCount: 156, status: 'Active' },
  { id: 'g-3', name: 'Dev Team Alpha', memberCount: 8, status: 'Deep Work' },
]

/* ─── Leaderboard ────────────────────────────────────────────────── */

export const leaderboardMock: LeaderboardEntry[] = [
  { id: 'lb-1', name: 'Sarah Chen', points: 12450, rank: 1 },
  { id: 'lb-2', name: 'David Park', points: 11200, rank: 2 },
  { id: 'lb-3', name: 'Mike R.', points: 9800, rank: 3 },
]

/* ─── Group Challenge Banner ─────────────────────────────────────── */

export const groupChallengeBannerMock: GroupChallengeBanner = {
  title: '21-Day Focus Sprint',
  participantCount: 1200,
  ctaLabel: 'Join Challenge',
}

/* ─── Friend Suggestions ─────────────────────────────────────────── */

export const friendSuggestionsMock: FriendSuggestion[] = [
  {
    id: 'fs-1',
    name: 'Elena Vance',
    bio: 'Productivity architect focused on Deep Work and creative flow systems.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
    mutualCount: 8,
  },
  {
    id: 'fs-2',
    name: 'Marcus Chen',
    bio: 'Early riser from San Francisco. Loves Time Blocking and fitness tracking.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqMFaUgmEdKcrSOgTgXLvDQBPi8gXLjL9wYFnSfTQeZX7pqn6JUcHi9Sr-2aXykBjamrrzQCe7gJH7Q3nUYoGQKoi2XL2tiMiweUbBtiTEo76ELop9PCMBCXU1_a_SEx84R4TPds6zHyGkw1WlvLBvspJKw1LJ0-mpccMGVOmWdq5VTqbwpudgxsWRFL4KizuZfZvsEVG8hR9Zv_PlPrpUTO1PD7KqVQ7AmAiEmvoJ9mGyRYhf-KWTwLClw9AUelI6NeZNVY2TEKJu',
    mutualCount: 3,
  },
  {
    id: 'fs-3',
    name: 'Sarah Jenkins',
    bio: '"The best way to predict the future is to create it. Looking for sprint partners in AI ethics."',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
    mutualCount: 12,
  },
]

/* ─── Friend Requests ────────────────────────────────────────────── */

export const friendRequestsMock: FriendRequest[] = [
  {
    id: 'fr-1',
    name: 'David Miller',
    handle: '@david_pro',
    contextText: '5 mutuals',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
  },
  {
    id: 'fr-2',
    name: 'Aria Song',
    handle: '@ariasounds',
    contextText: 'Shared Circle: Notion Masters',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
  },
  {
    id: 'fr-3',
    name: 'Jordan Blake',
    handle: '@j_blake',
    contextText: 'Recently nearby',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
  },
]

