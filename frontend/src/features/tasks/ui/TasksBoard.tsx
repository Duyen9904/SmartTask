import { useTasksQuery } from '../api/useTasksQuery'
import { groupTasksByStatus } from '../model/tasksModel'

export function TasksBoard() {
  const { data, isLoading, error } = useTasksQuery()

  if (isLoading) return <p>Loading tasks...</p>
  if (error) return <p className="error">Could not load tasks.</p>

  const grouped = groupTasksByStatus(data?.content ?? [])
  const statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

  return (
    <div className="tasks-board">
      {statuses.map((status) => (
        <section key={status} className="column">
          <h3>{status.replace('_', ' ')}</h3>
          <ul>
            {(grouped[status] ?? []).map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                <p>{task.description || 'No description'}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
