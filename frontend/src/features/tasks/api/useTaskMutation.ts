import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from './tasksApi'
import { taskKeys } from './useTasksQuery'
import type { CreateTaskPayload, TaskStatus, TaskSummary, UpdateTaskPayload } from '../model/taskTypes'

/** Type guard for paged query data containing a `content` array of tasks. */
function isPagedTaskData(
  data: unknown,
): data is { content: TaskSummary[]; [key: string]: unknown } {
  if (!data || typeof data !== 'object') return false
  if (!('content' in data)) return false
  // After the `in` check, TS narrows data to `object & Record<'content', unknown>`
  return Array.isArray(data.content)
}

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
    onMutate: async ({ taskId, payload }) => {
      // Cancel in-flight fetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: taskKeys.searches() })

      // Snapshot every search-query so we can rollback
      const previousQueries = queryClient.getQueriesData({ queryKey: taskKeys.searches() })

      // Optimistically patch the task inside all cached search results
      queryClient.setQueriesData({ queryKey: taskKeys.searches() }, (old: unknown) => {
        if (!isPagedTaskData(old)) return old
        return {
          ...old,
          content: old.content.map((t) =>
            t.id === taskId ? { ...t, ...payload } : t,
          ),
        }
      })

      return { previousQueries }
    },
    onError: (_err, _vars, context) => {
      // Rollback all search queries to their pre-mutation state
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data)
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.searches() })
    },
  })
}

/** Convenience mutation for quick status toggles (checkbox, kanban quick-action). */
export function useUpdateTaskStatusMutation() {
  const mutation = useUpdateTaskMutation()

  const mutateStatus = (taskId: string, status: TaskStatus) =>
    mutation.mutate({ taskId, payload: { status } })

  return { ...mutation, mutateStatus }
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
