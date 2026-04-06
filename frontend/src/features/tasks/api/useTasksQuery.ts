import { useQuery } from '@tanstack/react-query'
import { taskService } from './tasksApi'

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (page: number, size: number) => [...taskKeys.lists(), { page, size }] as const,
  detail: (id: string) => [...taskKeys.all, 'detail', id] as const,
}

export function useTasksQuery(page = 0, size = 20) {
  return useQuery({
    queryKey: taskKeys.list(page, size),
    queryFn: () => taskService.list(page, size),
  })
}
