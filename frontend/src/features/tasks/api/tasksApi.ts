import type { CreateTaskPayload, TaskSummary } from '../model/taskTypes'
import { httpClient, requestPaged } from '@/lib/httpClient'

export const taskService = {
  list: (page = 0, size = 20) => requestPaged<TaskSummary>(`/tasks?page=${page}&size=${size}`),
  get: (taskId: string) => httpClient.get<TaskSummary>(`/tasks/${taskId}`),
  create: (payload: CreateTaskPayload) => httpClient.post<TaskSummary>('/tasks', payload),
  update: (taskId: string, payload: Partial<CreateTaskPayload>) =>
    httpClient.put<TaskSummary>(`/tasks/${taskId}`, payload),
  remove: (taskId: string) => httpClient.delete<void>(`/tasks/${taskId}`),
}
