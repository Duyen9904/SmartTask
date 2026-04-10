import { useQuery } from '@tanstack/react-query'
import { taskService } from './tasksApi'
import type { TaskSearchParams } from '../model/taskTypes'

export const taskKeys = {
  all: ['tasks'] as const,
  searches: () => [...taskKeys.all, 'search'] as const,
  search: (params: TaskSearchParams) => [...taskKeys.searches(), params] as const,
  detail: (id: string) => [...taskKeys.all, 'detail', id] as const,
}

export function useTasksQuery(params: TaskSearchParams = {}) {
  const normalized: TaskSearchParams = {
    page: params.page ?? 0,
    size: params.size ?? 20,
    sort: params.sort ?? 'displayOrder',
    status: params.status,
    priority: params.priority,
    category: params.category,
    from: params.from,
    to: params.to,
    q: params.q,
  }

  return useQuery({
    queryKey: taskKeys.search(normalized),
    queryFn: () => taskService.search(normalized),
    staleTime: 15_000,
  })
}
