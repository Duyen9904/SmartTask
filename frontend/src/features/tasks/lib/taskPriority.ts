import type { TaskPriority } from '../model/taskTypes'

export const priorityWeight: Record<TaskPriority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
}
