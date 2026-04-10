import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from './tasksApi'
import { taskKeys } from './useTasksQuery'
import type { CreateTaskPayload, UpdateTaskPayload } from '../model/taskTypes'

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.searches() })
    },
  })
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: UpdateTaskPayload }) =>
      taskService.update(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.searches() })
    },
  })
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId: string) => taskService.remove(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.searches() })
    },
  })
}
