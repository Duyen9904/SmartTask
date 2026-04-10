// Aligned with backend enums:
// - backend TaskStatus: PENDING | IN_PROGRESS | COMPLETED
// - backend Priority:   LOW | MEDIUM | HIGH | CRITICAL
// - backend Category:   PERSONAL | WORK | STUDY | HEALTH | SOCIAL
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type TaskSummary = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  scheduledDate?: string
  scheduledTime?: string
  dueDate?: string
  estimatedHours?: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export type TaskCategory = 'PERSONAL' | 'WORK' | 'STUDY' | 'HEALTH' | 'SOCIAL'

export type CreateTaskPayload = {
  title: string
  description?: string
  priority?: TaskPriority
  dueDate?: string
  category?: TaskCategory
  scheduledDate?: string
  scheduledTime?: string
  estimatedHours?: string
}

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
  status?: TaskStatus
  displayOrder?: number
}

export type TaskSearchParams = {
  status?: TaskStatus
  priority?: TaskPriority
  category?: TaskCategory
  from?: string
  to?: string
  q?: string
  page?: number
  size?: number
  sort?: string
}
