import type { CreateTaskPayload, TaskSearchParams, TaskSummary, UpdateTaskPayload } from '../model/taskTypes'
import { httpClient, requestPaged } from '@/lib/httpClient'

export const taskService = {
  search: (params: TaskSearchParams = {}) => {
    const qp = new URLSearchParams()
    if (params.status) qp.set('status', params.status)
    if (params.priority) qp.set('priority', params.priority)
    if (params.category) qp.set('category', params.category)
    if (params.from) qp.set('from', params.from)
    if (params.to) qp.set('to', params.to)
    if (params.q) qp.set('q', params.q)
    if (params.page != null) qp.set('page', String(params.page))
    if (params.size != null) qp.set('size', String(params.size))
    if (params.sort) qp.set('sort', params.sort)

    const suffix = qp.toString()
    return requestPaged<TaskSummary>(`/tasks${suffix ? `?${suffix}` : ''}`)
  },
  get: (taskId: string) => httpClient.get<TaskSummary>(`/tasks/${taskId}`),
  create: (payload: CreateTaskPayload) => httpClient.post<TaskSummary>('/tasks', payload),
  update: (taskId: string, payload: UpdateTaskPayload) => httpClient.put<TaskSummary>(`/tasks/${taskId}`, payload),
  remove: (taskId: string) => httpClient.delete<void>(`/tasks/${taskId}`),
  copyDay: (payload: { sourceDate: string; targetDate: string }) => 
    httpClient.post<TaskSummary[]>('/tasks/copy-day', payload),
}
