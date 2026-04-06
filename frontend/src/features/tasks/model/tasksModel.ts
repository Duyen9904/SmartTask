import type { TaskSummary } from '../model/taskTypes'
import { priorityWeight } from '../lib/taskPriority'

export const groupTasksByStatus = (tasks: TaskSummary[]) => {
  const sorted = [...tasks].sort(
    (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority],
  )

  return sorted.reduce<Record<string, TaskSummary[]>>((acc, task) => {
    if (!acc[task.status]) acc[task.status] = []
    acc[task.status].push(task)
    return acc
  }, {})
}
