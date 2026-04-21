/* ─── Room ───────────────────────────────────────────────────────── */

export type Room = {
  id: string
  name: string
  subtitle: string
  roomNumber: string
  priority: 'high' | 'medium' | 'low'
  deadline: string
  members: RoomMember[]
  activeMemberIds: string[]
  taskCounts: { todo: number; inProgress: number; done: number }
  lastActivity: string
}

export type RoomMember = {
  id: string
  name: string
  avatarUrl: string
  role: 'admin' | 'member'
  isOnline: boolean
}

/* ─── Shared Checklist ───────────────────────────────────────────── */

export type ChecklistItemStatus = 'unchecked' | 'in_progress' | 'completed'

export type SharedChecklistItem = {
  id: string
  title: string
  status: ChecklistItemStatus
  assignee?: string
  estimatedTime?: string
  completedBy?: string
  completedAgo?: string
  waitingFor?: string
  waitingReason?: string
  hasAiSuggestion?: boolean
}

/* ─── Activity Feed ──────────────────────────────────────────────── */

export type ActivityType = 'task_completed' | 'file_shared' | 'member_joined'

export type ActivityFeedItem = {
  id: string
  type: ActivityType
  memberName: string
  memberAvatar: string
  description: string
  timestamp: string
  imageUrl?: string
}

/* ─── AI Insight & Huddle ────────────────────────────────────────── */

export type AIInsight = {
  progressText: string
  recommendation: string
}

export type HuddleInfo = {
  title: string
  timeRemaining: string
  topic: string
}

/* ─── Tasks ──────────────────────────────────────────────────────── */

export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'

export type RoomTask = {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: RoomMember
  dueDate?: string
  subtasks: Subtask[]
  comments: TaskComment[]
  editingBy?: string
}

export type Subtask = {
  id: string
  label: string
  done: boolean
}

export type TaskComment = {
  id: string
  author: RoomMember
  content: string
  timestamp: string
}

/* ─── Room Nav Sections ──────────────────────────────────────────── */

export type RoomSection =
  | 'task-board'
  | 'shared-notes'
  | 'goals'
  | 'resources'
  | 'room-chat'
