// Tasks feature — public API
export { taskService } from './api/tasksApi'
export { useTasksQuery, taskKeys } from './api/useTasksQuery'
export { TasksBoard } from './ui/TasksBoard'
export { groupTasksByStatus } from './model/tasksModel'
export type { TaskSummary, CreateTaskPayload, TaskStatus, TaskPriority } from './model/taskTypes'
