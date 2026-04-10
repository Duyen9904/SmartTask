// Mock data for tasks UI development (matches Stitch design screens)
import type { TaskPriority, TaskStatus } from './taskTypes'

/* ─── Extended task type for UI views ────────────────────────────── */
export type TaskViewItem = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: 'personal' | 'work' | 'study' | 'shared'
  dueDate?: string
  dueDateLabel?: string
  createdAt: string
  completed?: boolean
  isTemplate?: boolean
  assignees?: { id: string; name: string; avatar?: string }[]
  tags?: string[]
}

export type KanbanColumn = {
  id: string
  title: string
  status: string
  count: number
  cards: KanbanCard[]
}

export type KanbanCard = {
  id: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  priorityLabel: string
  statusLabel?: string
  assignees: { id: string; avatar?: string }[]
  dueDateLabel?: string
  isActive?: boolean
  isCompleted?: boolean
  hasProofIcon?: boolean
}

export type GanttTask = {
  id: string
  title: string
  category: string
  categoryColor: 'teal' | 'orange' | 'purple'
  startPct: number   // percentage offset from left
  widthPct: number   // percentage width of the bar
  progressPct: number
  dueDate?: string
  hasDependency?: boolean
}

export type GanttStatCard = {
  id: string
  label: string
  value: string
  unit?: string
  subtext?: string
  icon: string
  color: 'teal' | 'orange' | 'purple'
  progressPct?: number
}

/* ─── List View Mock Data ────────────────────────────────────────── */
export const taskListMock: TaskViewItem[] = [
  {
    id: 'task-1',
    title: 'Complete Math Assignment',
    status: 'DONE',
    priority: 'HIGH',
    category: 'study',
    dueDate: '2026-03-20',
    dueDateLabel: 'Mar 20',
    createdAt: '2026-03-18',
    completed: true,
    assignees: [{ id: 'u-sarah', name: 'Sarah' }],
  },
  {
    id: 'task-2',
    title: 'Prepare Team Presentation',
    description: 'Finalize Q1 projections and visual assets for the executive board review.',
    status: 'TODO',
    priority: 'HIGH',
    category: 'work',
    dueDate: '2026-03-21',
    dueDateLabel: 'Tomorrow, Mar 21',
    createdAt: '2026-03-19',
  },
  {
    id: 'task-3',
    title: 'Morning Yoga Routine',
    status: 'TODO',
    priority: 'LOW',
    category: 'personal',
    dueDateLabel: 'Today, 07:00 AM',
    createdAt: '2026-03-20',
    isTemplate: true,
  },
  {
    id: 'task-4',
    title: 'Review Code Pull Requests',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    category: 'work',
    dueDate: '2026-03-22',
    dueDateLabel: 'Mar 22',
    createdAt: '2026-03-19',
  },
  {
    id: 'task-5',
    title: 'Read Chapter 5 - Design Patterns',
    status: 'DONE',
    priority: 'MEDIUM',
    category: 'study',
    dueDate: '2026-03-19',
    dueDateLabel: 'Mar 19',
    createdAt: '2026-03-15',
    completed: true,
  },
  {
    id: 'task-6',
    title: 'Study Group Prep: Algorithms',
    description: 'Focus on Big O notation and sorting algorithms for the upcoming mock exam.',
    status: 'TODO',
    priority: 'HIGH',
    category: 'study',
    dueDate: '2026-03-21',
    dueDateLabel: 'Mar 21',
    createdAt: '2026-03-18',
    assignees: [
      { id: 'u-member1', name: 'Member 1' },
      { id: 'u-member2', name: 'Member 2' },
    ],
  },
]

/* ─── Kanban Board Mock Data  ────────────────────────────────────── */
export const kanbanColumnsMock: KanbanColumn[] = [
  {
    id: 'col-backlog',
    title: 'Backlog',
    status: 'BACKLOG',
    count: 12,
    cards: [
      {
        id: 'k-1',
        title: 'Architectural render for main lobby atrium',
        priority: 'high',
        priorityLabel: 'High Priority',
        assignees: [{ id: 'u1' }, { id: 'u2' }],
        dueDateLabel: 'Oct 24',
        hasProofIcon: true,
      },
    ],
  },
  {
    id: 'col-todo',
    title: 'To Do',
    status: 'TODO',
    count: 4,
    cards: [
      {
        id: 'k-2',
        title: 'Upload site survey photography for Phase II',
        priority: 'critical',
        priorityLabel: 'Critical',
        assignees: [{ id: 'u3' }],
        dueDateLabel: 'Today',
        hasProofIcon: true,
      },
    ],
  },
  {
    id: 'col-progress',
    title: 'In Progress',
    status: 'IN_PROGRESS',
    count: 2,
    cards: [
      {
        id: 'k-3',
        title: 'Kinetic UI motion design refinements',
        priority: 'medium',
        priorityLabel: 'On Track',
        statusLabel: 'Active',
        assignees: [{ id: 'u4' }],
        isActive: true,
      },
    ],
  },
  {
    id: 'col-review',
    title: 'Review',
    status: 'REVIEW',
    count: 1,
    cards: [
      {
        id: 'k-4',
        title: 'API Documentation for v2.0 Release',
        priority: 'low',
        priorityLabel: 'Final QA',
        statusLabel: 'Pending Approval',
        assignees: [{ id: 'u5' }],
      },
    ],
  },
  {
    id: 'col-done',
    title: 'Done',
    status: 'DONE',
    count: 48,
    cards: [
      {
        id: 'k-5',
        title: 'Sanctuary Color Palette Finalized',
        priority: 'low',
        priorityLabel: 'Completed',
        assignees: [],
        isCompleted: true,
      },
    ],
  },
]

/* ─── Gantt Chart Mock Data ──────────────────────────────────────── */
export const ganttCategories = [
  { id: 'cat-work', label: 'Work Systems', color: 'teal' as const },
  { id: 'cat-personal', label: 'Personal Growth', color: 'orange' as const },
]

export const ganttTasksMock: GanttTask[] = [
  // Work Systems
  {
    id: 'g-1',
    title: 'Architecture Phase',
    category: 'cat-work',
    categoryColor: 'teal',
    startPct: 5,
    widthPct: 40,
    progressPct: 85,
    dueDate: 'March 15, 2026',
  },
  {
    id: 'g-2',
    title: 'API Integration',
    category: 'cat-work',
    categoryColor: 'orange',
    startPct: 35,
    widthPct: 35,
    progressPct: 40,
    hasDependency: true,
  },
  {
    id: 'g-3',
    title: 'Visual Refinement',
    category: 'cat-work',
    categoryColor: 'purple',
    startPct: 60,
    widthPct: 30,
    progressPct: 15,
  },
  // Personal Growth
  {
    id: 'g-4',
    title: 'Research Sprint',
    category: 'cat-personal',
    categoryColor: 'teal',
    startPct: 10,
    widthPct: 50,
    progressPct: 98,
  },
  {
    id: 'g-5',
    title: 'System Audit',
    category: 'cat-personal',
    categoryColor: 'orange',
    startPct: 55,
    widthPct: 25,
    progressPct: 60,
  },
]

export const ganttTimelineWeeks = [
  { id: 'w1', label: 'MAR 01 - 07', subLabel: 'Week 09' },
  { id: 'w2', label: 'MAR 08 - 14', subLabel: 'Week 10' },
  { id: 'w3', label: 'MAR 15 - 21', subLabel: 'Week 11' },
  { id: 'w4', label: 'MAR 22 - 31', subLabel: 'Current Week', isCurrent: true },
]

export const ganttStatsMock: GanttStatCard[] = [
  {
    id: 'gs-1',
    label: 'Project Health',
    value: '94.2%',
    icon: 'TrendingUp',
    color: 'teal',
    progressPct: 94.2,
  },
  {
    id: 'gs-2',
    label: 'Active Velocity',
    value: '12.5',
    unit: 'tasks/wk',
    subtext: '+2.4 from last month',
    icon: 'Zap',
    color: 'orange',
  },
  {
    id: 'gs-3',
    label: 'Resource Load',
    value: '3',
    unit: 'members',
    subtext: 'Optimal capacity maintained',
    icon: 'Users',
    color: 'purple',
  },
]

/* ─── Calendar View Mock Data ────────────────────────────────────── */
export type CalendarTask = {
  id: string
  title: string
  description?: string
  date: string   // YYYY-MM-DD
  timeLabel?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  subtasks?: { done: number; total: number }
}

export const calendarTasksMock: CalendarTask[] = [
  // Today – April 9
  {
    id: 'cal-1',
    title: 'Review Design Sprint',
    description: 'Evaluate the finalized wireframes for the new AI-powered analytics dashboard. Check for color contrast and accessibility compliance with the design system.',
    date: '2026-04-09',
    timeLabel: '09:00 AM – 10:30 AM',
    status: 'TODO',
    priority: 'HIGH',
    subtasks: { done: 2, total: 3 },
  },
  {
    id: 'cal-2',
    title: 'AI Assistant Sync',
    date: '2026-04-09',
    timeLabel: '01:00 PM – 02:00 PM',
    status: 'TODO',
    priority: 'MEDIUM',
  },
  {
    id: 'cal-3',
    title: 'Morning Gym Session',
    date: '2026-04-09',
    timeLabel: 'Completed 07:45 AM',
    status: 'DONE',
    priority: 'LOW',
  },
  // Apr 7
  {
    id: 'cal-4',
    title: 'Sprint Planning',
    date: '2026-04-07',
    timeLabel: '10:00 AM – 11:00 AM',
    status: 'DONE',
    priority: 'HIGH',
  },
  {
    id: 'cal-5',
    title: 'Code Review: Auth Module',
    date: '2026-04-07',
    timeLabel: '02:00 PM – 03:00 PM',
    status: 'DONE',
    priority: 'MEDIUM',
  },
  // Apr 10
  {
    id: 'cal-6',
    title: 'Client Presentation Prep',
    description: 'Finalize Q2 prototype walkthrough deck.',
    date: '2026-04-10',
    timeLabel: '09:00 AM – 11:00 AM',
    status: 'TODO',
    priority: 'URGENT',
    subtasks: { done: 1, total: 5 },
  },
  // Apr 11
  {
    id: 'cal-7',
    title: 'Client Presentation',
    date: '2026-04-11',
    timeLabel: '10:00 AM – 12:00 PM',
    status: 'TODO',
    priority: 'URGENT',
  },
  {
    id: 'cal-8',
    title: 'Team Retrospective',
    date: '2026-04-11',
    timeLabel: '03:00 PM – 04:00 PM',
    status: 'TODO',
    priority: 'MEDIUM',
  },
  // Apr 14
  {
    id: 'cal-9',
    title: 'Deploy v2.0 to Staging',
    date: '2026-04-14',
    timeLabel: '08:00 AM',
    status: 'TODO',
    priority: 'HIGH',
    subtasks: { done: 0, total: 4 },
  },
  // Apr 15
  {
    id: 'cal-10',
    title: 'Yoga & Meditation',
    date: '2026-04-15',
    timeLabel: '06:30 AM',
    status: 'TODO',
    priority: 'LOW',
  },
  {
    id: 'cal-11',
    title: 'API Performance Audit',
    description: 'Run load tests and identify bottlenecks in the payment gateway.',
    date: '2026-04-15',
    timeLabel: '11:00 AM – 01:00 PM',
    status: 'TODO',
    priority: 'HIGH',
  },
  // Apr 3 (past)
  {
    id: 'cal-12',
    title: 'Weekly Standup',
    date: '2026-04-03',
    timeLabel: '09:00 AM',
    status: 'DONE',
    priority: 'MEDIUM',
  },
  // Apr 18
  {
    id: 'cal-13',
    title: 'Design System Documentation',
    date: '2026-04-18',
    timeLabel: '10:00 AM – 04:00 PM',
    status: 'TODO',
    priority: 'MEDIUM',
    subtasks: { done: 3, total: 8 },
  },
  // Apr 22
  {
    id: 'cal-14',
    title: 'Quarterly Report',
    date: '2026-04-22',
    timeLabel: '09:00 AM – 12:00 PM',
    status: 'TODO',
    priority: 'HIGH',
  },
]
