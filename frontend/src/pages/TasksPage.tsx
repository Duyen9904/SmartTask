import { AttachmentUploadPanel } from '@/features/attachments'
import { TasksBoard } from '@/features/tasks'
import { PageTitle } from '@/components/PageTitle'

export function TasksPage() {
  return (
    <div>
      <PageTitle title="Tasks" subtitle="Track status, priorities, and task attachments." />
      <TasksBoard />
      <AttachmentUploadPanel />
    </div>
  )
}
