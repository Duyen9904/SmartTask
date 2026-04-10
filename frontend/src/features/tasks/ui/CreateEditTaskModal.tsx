import React from 'react'
import { Dialog } from 'radix-ui'
import { X, Sparkles, Trash2 } from 'lucide-react'
import { TaskForm } from './TaskForm'
import { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../api/useTaskMutation'
import type { TaskSummary, CreateTaskPayload } from '../model/taskTypes'

type CreateEditTaskModalProps = {
  open: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  initialData?: TaskSummary
}

export function CreateEditTaskModal({
  open,
  onClose,
  mode,
  initialData,
}: CreateEditTaskModalProps) {
  const createMutation = useCreateTaskMutation()
  const updateMutation = useUpdateTaskMutation()
  const deleteMutation = useDeleteTaskMutation()
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false)

  const isCreate = mode === 'create'
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = (payload: CreateTaskPayload) => {
    if (isCreate) {
      createMutation.mutate(payload, {
        onSuccess: () => onClose(),
      })
    } else if (initialData) {
      updateMutation.mutate(
        { taskId: initialData.id, payload },
        { onSuccess: () => onClose() },
      )
    }
  }

  const handleDelete = () => {
    if (!initialData) return
    deleteMutation.mutate(initialData.id, {
      onSuccess: () => {
        setShowDeleteConfirm(false)
        onClose()
      },
    })
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setShowDeleteConfirm(false)
      onClose()
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* ─── Overlay ──────────────────────────────────────────── */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* ─── Dialog Panel ─────────────────────────────────────── */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[560px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-[#111124] shadow-2xl shadow-primary/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* ─── Header ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  {isCreate ? 'Create New Task' : 'Edit Task'}
                </Dialog.Title>
                <Dialog.Description className="text-xs text-slate-400 mt-0.5">
                  {isCreate
                    ? 'Define your objective and set the velocity.'
                    : 'Update task details and priority.'}
                </Dialog.Description>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Delete button (edit mode only) */}
              {!isCreate && initialData && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* ─── Body ───────────────────────────────────────────── */}
          <div className="px-6 py-5">
            {showDeleteConfirm ? (
              <DeleteConfirmation
                taskTitle={initialData?.title ?? ''}
                isDeleting={deleteMutation.isPending}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteConfirm(false)}
              />
            ) : (
              <TaskForm
                initialData={
                  initialData
                    ? {
                        title: initialData.title,
                        description: initialData.description,
                        priority: initialData.priority,
                        dueDate: initialData.dueDate,
                        category: initialData.category,
                      }
                    : undefined
                }
                onSubmit={handleSubmit}
                onCancel={onClose}
                isSubmitting={isSubmitting}
                submitLabel={isCreate ? 'Create Task' : 'Save Changes'}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/* ─── Delete Confirmation ─────────────────────────────────────────── */
function DeleteConfirmation({
  taskTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  taskTitle: string
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
        <Trash2 className="h-7 w-7 text-red-400" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-white">Delete Task?</h3>
        <p className="text-sm text-slate-400 max-w-xs">
          Are you sure you want to delete <span className="text-white font-medium">"{taskTitle}"</span>? This action cannot be undone.
        </p>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 text-red-400 text-sm font-bold rounded-xl hover:bg-red-500/30 transition-all disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <span className="h-4 w-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete Task'
          )}
        </button>
      </div>
    </div>
  )
}
