/* ─── Room ───────────────────────────────────────────────────────── */

export type Room = {
  id: string
  name: string
  subtitle: string
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
