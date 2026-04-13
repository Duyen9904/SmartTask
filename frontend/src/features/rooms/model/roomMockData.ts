import type { Room, RoomMember, RoomTask } from './roomTypes'

/* ─── Members ────────────────────────────────────────────────────── */

const memberAlex: RoomMember = {
  id: 'm-1',
  name: 'Alex Chen',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
  role: 'admin',
  isOnline: true,
}

const memberJordan: RoomMember = {
  id: 'm-2',
  name: 'Jordan Diaz',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
  role: 'member',
  isOnline: true,
}

const memberSarah: RoomMember = {
  id: 'm-3',
  name: 'Sarah Wilson',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
  role: 'member',
  isOnline: true,
}

const memberElena: RoomMember = {
  id: 'm-4',
  name: 'Elena Lopez',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
  role: 'member',
  isOnline: false,
}

const memberMarcus: RoomMember = {
  id: 'm-5',
  name: 'Marcus Thorne',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsKtCPzzLSidJVxYY6u4LV4VZs2ymVYn9dnTZBYG92Bw166NaLz6F7gvXIByijkS1JxrXWR6--1q3AVVRC3LcFleqR01AE7DRw064tQjzf9FTL59hY6_eTNEWdsWOWU3V-xvDw-bzbiFzl1YIHgPSQHOdoczyd_63eWRAqXctoNxoqtyYOGwpfTik7I7iiN7kGJfgMHqNkEDLxmOUHnIM8CuvDl1W6KTCpJV4L4gGmKfgPnPZAFqy0vilb2L2LSIV98x4PSqb_tvg',
  role: 'member',
  isOnline: true,
}

const allMembers = [memberAlex, memberJordan, memberSarah, memberElena, memberMarcus]

/* ─── Rooms ──────────────────────────────────────────────────────── */

export const roomsMock: Room[] = [
  {
    id: 'sprint-24',
    name: 'Sprint 24 — Design System',
    subtitle: 'Situation Room',
    members: allMembers,
    activeMemberIds: ['m-1', 'm-2', 'm-3', 'm-5'],
    taskCounts: { todo: 3, inProgress: 1, done: 2 },
    lastActivity: '2m ago',
  },
  {
    id: 'onboarding-v2',
    name: 'Onboarding Flow V2',
    subtitle: 'Product Sprint',
    members: [memberAlex, memberSarah, memberElena],
    activeMemberIds: ['m-1', 'm-3'],
    taskCounts: { todo: 5, inProgress: 3, done: 8 },
    lastActivity: '15m ago',
  },
  {
    id: 'q4-planning',
    name: 'Q4 Revenue Planning',
    subtitle: 'Strategy Room',
    members: [memberAlex, memberJordan, memberMarcus],
    activeMemberIds: ['m-5'],
    taskCounts: { todo: 7, inProgress: 2, done: 1 },
    lastActivity: '1h ago',
  },
]

/* ─── Tasks for "Sprint 24" ──────────────────────────────────────── */

export const roomTasksMock: RoomTask[] = [
  {
    id: 'rt-1',
    title: 'Finalize Core Color Tokens & Contrast Ratios',
    status: 'todo',
    priority: 'high',
    assignee: memberAlex,
    dueDate: 'Oct 12',
    subtasks: [
      { id: 'st-1', label: 'Define surface tier 1-5', done: true },
      { id: 'st-2', label: 'Check mobile contrast', done: true },
      { id: 'st-3', label: 'Primary dim variation', done: true },
      { id: 'st-4', label: 'Documentation update', done: false },
      { id: 'st-5', label: 'Share with dev team', done: false },
    ],
    comments: [
      {
        id: 'c-1',
        author: memberJordan,
        content:
          'Looks like the surface-bright token is slightly too light in dark mode.',
        timestamp: '10m ago',
      },
    ],
  },
  {
    id: 'rt-2',
    title: 'Design Typography Scale for Display Units',
    status: 'todo',
    priority: 'high',
    assignee: memberJordan,
    subtasks: [],
    comments: [],
    editingBy: 'Jordan',
  },
  {
    id: 'rt-3',
    title: 'Build Glassmorphism Utility Classes',
    status: 'todo',
    priority: 'medium',
    assignee: memberSarah,
    dueDate: 'Oct 15',
    subtasks: [
      { id: 'st-6', label: 'Backdrop blur tokens', done: true },
      { id: 'st-7', label: 'Opacity utilities', done: false },
      { id: 'st-8', label: 'Glass panel component', done: false },
    ],
    comments: [],
  },
  {
    id: 'rt-4',
    title: 'Component Audit: Forms and Inputs',
    status: 'in_progress',
    priority: 'medium',
    assignee: memberMarcus,
    subtasks: [],
    comments: [
      {
        id: 'c-2',
        author: memberAlex,
        content: 'Can we add focus glow effects? The current border-only approach feels flat.',
        timestamp: '1h ago',
      },
      {
        id: 'c-3',
        author: memberMarcus,
        content: 'Agreed. I\'ll prototype the ambient glow for input focus states.',
        timestamp: '45m ago',
      },
    ],
  },
  {
    id: 'rt-5',
    title: 'Define Spacing Scale & Grid Tokens',
    status: 'done',
    priority: 'low',
    assignee: memberElena,
    subtasks: [
      { id: 'st-9', label: '8px grid baseline', done: true },
      { id: 'st-10', label: 'Spacing scale 1-16', done: true },
    ],
    comments: [],
  },
  {
    id: 'rt-6',
    title: 'Create Shadow & Elevation Token Set',
    status: 'done',
    priority: 'medium',
    assignee: memberJordan,
    subtasks: [],
    comments: [],
  },
]
