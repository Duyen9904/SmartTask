import React from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, MoreHorizontal, Plus, Camera, CheckCircle, Zap, ShieldCheck, ArrowRight } from 'lucide-react'
import type { TaskPriority, TaskStatus, TaskSummary } from '../model/taskTypes'

/* ─── Priority styling map ───────────────────────────────────────── */
const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-orange-500/5',  text: 'text-orange-400',   border: 'border-l-orange-400' },
  high:     { bg: 'bg-orange-500/10', text: 'text-orange-400',   border: 'border-l-transparent hover:border-l-primary' },
  medium:   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-l-emerald-400' },
  low:      { bg: 'bg-white/5',       text: 'text-slate-400',    border: 'border-l-slate-500/30' },
}

type KanbanCard = {
  id: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  priorityLabel: string
  statusLabel?: string
  assignees: { id: string; avatar?: string }[]
  dueDateLabel?: string
  isActive?: boolean
  isCompleted?: boolean
  hasProofIcon?: boolean
  status: TaskStatus
}

type KanbanColumn = {
  id: string
  title: string
  status: TaskStatus
  count: number
  cards: KanbanCard[]
}

function toKanbanPriority(priority: TaskPriority): KanbanCard['priority'] {
  switch (priority) {
    case 'CRITICAL':
      return 'critical'
    case 'HIGH':
      return 'high'
    case 'MEDIUM':
      return 'medium'
    case 'LOW':
    default:
      return 'low'
  }
}

function priorityLabel(priority: TaskPriority): string {
  switch (priority) {
    case 'CRITICAL':
      return 'Critical'
    case 'HIGH':
      return 'High Priority'
    case 'MEDIUM':
      return 'On Track'
    case 'LOW':
    default:
      return 'Low'
  }
}

function formatDueDateLabel(dueDate?: string): string | undefined {
  if (!dueDate) return undefined
  const d = new Date(dueDate)
  if (Number.isNaN(d.getTime())) return dueDate
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function buildKanbanColumns(tasks: TaskSummary[]): KanbanColumn[] {
  const byStatus: Record<TaskStatus, TaskSummary[]> = {
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  }

  for (const t of tasks) {
    byStatus[t.status]?.push(t)
  }

  // Sort within each column by displayOrder
  for (const status of Object.keys(byStatus) as TaskStatus[]) {
    byStatus[status].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }

  const mkCol = (status: TaskStatus, title: string): KanbanColumn => {
    const cards: KanbanCard[] = byStatus[status].map((t) => ({
      id: t.id,
      title: t.title,
      priority: toKanbanPriority(t.priority),
      priorityLabel: priorityLabel(t.priority),
      assignees: [],
      dueDateLabel: formatDueDateLabel(t.dueDate),
      isCompleted: status === 'COMPLETED',
      isActive: status === 'IN_PROGRESS',
      hasProofIcon: false,
      statusLabel: status === 'IN_PROGRESS' ? 'Active' : undefined,
      status,
    }))

    return {
      id: `col-${status}`,
      title,
      status,
      count: cards.length,
      cards,
    }
  }

  return [
    mkCol('PENDING', 'To Do'),
    mkCol('IN_PROGRESS', 'In Progress'),
    mkCol('COMPLETED', 'Done'),
  ]
}

/* ─── Status quick-action targets ────────────────────────────────── */
const nextStatusMap: Record<TaskStatus, { label: string; target: TaskStatus }> = {
  PENDING:     { label: 'Start',    target: 'IN_PROGRESS' },
  IN_PROGRESS: { label: 'Complete', target: 'COMPLETED' },
  COMPLETED:   { label: 'Reopen',   target: 'PENDING' },
}

/* ─── Sortable Task Card ─────────────────────────────────────────── */
function SortableTaskCard({
  card,
  onQuickStatusChange,
}: {
  card: KanbanCard
  onQuickStatusChange?: (taskId: string, newStatus: TaskStatus) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { status: card.status } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCardComponent card={card} onQuickStatusChange={onQuickStatusChange} />
    </div>
  )
}

/* ─── Task Card ──────────────────────────────────────────────────── */
function TaskCardComponent({
  card,
  isDragOverlay,
  onQuickStatusChange,
}: {
  card: KanbanCard
  isDragOverlay?: boolean
  onQuickStatusChange?: (taskId: string, newStatus: TaskStatus) => void
}) {
  const p = priorityColors[card.priority] ?? priorityColors.low
  const next = nextStatusMap[card.status]

  if (card.isCompleted) {
    return (
      <div className={[
        'bg-[#111124] p-6 rounded-2xl border-l-2 border-emerald-500/30 shadow-sm opacity-60 grayscale-[0.5]',
        isDragOverlay ? 'ring-2 ring-primary/40 shadow-2xl scale-105' : '',
      ].join(' ')}>
        <h4 className="text-lg font-bold leading-tight mb-4 line-through text-slate-500">{card.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Completed</span>
          <div className="flex items-center gap-2">
            {onQuickStatusChange && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onQuickStatusChange(card.id, next.target) }}
                className="text-[10px] font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowRight className="h-3 w-3" />
                {next.label}
              </button>
            )}
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={[
        'p-6 rounded-2xl border-l-2 shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group',
        card.isActive
          ? 'bg-[#1d1d34] border-l-4 border-l-emerald-400 shadow-2xl scale-[1.03] ring-1 ring-primary/20'
          : `bg-[#111124] ${p.border} hover:bg-[#1d1d34] hover:scale-[1.02]`,
        isDragOverlay ? 'ring-2 ring-primary/40 shadow-2xl scale-105 rotate-2' : '',
      ].join(' ')}
    >
      {/* Top row: priority badge + icons */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold tracking-widest uppercase ${p.text} ${p.bg} px-2 py-1 rounded`}>
          {card.priorityLabel}
        </span>
        <div className="flex items-center gap-2">
          {card.statusLabel === 'Pending Approval' && (
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          )}
          {card.hasProofIcon && (
            <Camera className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>

      {/* Title */}
      <h4
        className={[
          'text-lg font-bold leading-tight mb-4',
          card.isActive ? 'text-primary' : 'text-white',
        ].join(' ')}
      >
        {card.title}
      </h4>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        {card.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {card.assignees.map((a) => (
              <div
                key={a.id}
                className="w-7 h-7 rounded-full bg-primary/20 border-2 border-[#111124] flex items-center justify-center text-[9px] font-bold text-white"
              >
                {a.id.slice(-2).toUpperCase()}
              </div>
            ))}
          </div>
        )}

        {card.dueDateLabel && (
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {card.dueDateLabel}
          </div>
        )}

        {card.statusLabel === 'Active' && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
            <Zap className="h-3.5 w-3.5" />
            Active
          </div>
        )}

        {card.statusLabel === 'Pending Approval' && (
          <div className="text-slate-400 text-[11px] font-medium">Pending Approval</div>
        )}

        {/* Quick status change button */}
        {onQuickStatusChange && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onQuickStatusChange(card.id, next.target) }}
            className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-slate-500 hover:text-primary transition-all flex items-center gap-1 ml-auto"
          >
            <ArrowRight className="h-3 w-3" />
            {next.label}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Column ───────────────────────────────────────────────────────────── */
function KanbanColumnComponent({
  column,
  onQuickStatusChange,
}: {
  column: KanbanColumn
  onQuickStatusChange?: (taskId: string, newStatus: TaskStatus) => void
}) {
  const isDone = column.status === 'COMPLETED'

  // Register this column as a droppable zone so cards can be dropped here
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { status: column.status },
  })

  return (
    <div className="flex-1 flex flex-col min-w-[280px]">
      {/* Column header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
          {column.title}
          <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-medium">{column.count}</span>
        </h3>
        <button type="button" className="text-slate-500 cursor-pointer hover:text-white transition-colors">
          {column.status === 'PENDING' ? <Plus className="h-5 w-5" /> : <MoreHorizontal className="h-5 w-5" />}
        </button>
      </div>

      {/* Cards — droppable area */}
      <SortableContext items={column.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={[
            'flex-1 space-y-4 overflow-y-auto pr-2 rounded-2xl transition-all duration-200 p-2 -m-2 min-h-[120px]',
            isDone ? 'opacity-60 grayscale-[0.3]' : '',
            isOver ? 'bg-primary/5 ring-2 ring-primary/20' : '',
          ].join(' ')}
        >
          {column.cards.map((card) => (
            <SortableTaskCard key={card.id} card={card} onQuickStatusChange={onQuickStatusChange} />
          ))}

          {/* Empty column placeholder */}
          {column.cards.length === 0 && (
            <div className={[
              'border-2 border-dashed rounded-2xl h-32 flex items-center justify-center text-slate-500 italic text-sm transition-all',
              isOver ? 'border-primary/40 bg-primary/5 text-primary' : 'border-white/10',
            ].join(' ')}>
              {isOver ? 'Drop here' : 'No tasks'}
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

/* ─── Main Kanban Board ──────────────────────────────────────────── */
type KanbanBoardProps = {
  tasks: TaskSummary[]
  isLoading?: boolean
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void
  onDisplayOrderChange?: (taskId: string, newStatus: TaskStatus, newDisplayOrder: number) => void
  onEdit?: (task: TaskSummary) => void
}

export function KanbanBoard({ tasks, isLoading, onStatusChange, onDisplayOrderChange }: KanbanBoardProps) {
  const columns = buildKanbanColumns(tasks)
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null)

  // Find the dragged card data for the DragOverlay
  const activeCard = React.useMemo(() => {
    if (!activeCardId) return null
    for (const col of columns) {
      const found = col.cards.find((c) => c.id === activeCardId)
      if (found) return found
    }
    return null
  }, [activeCardId, columns])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  /** Find which column a card or column droppable belongs to */
  const findColumnStatus = (id: string): TaskStatus | null => {
    // Check if it's a column ID
    for (const col of columns) {
      if (col.id === id) return col.status
    }
    // Check if it's a card ID — find its parent column
    for (const col of columns) {
      if (col.cards.some((c) => c.id === id)) return col.status
    }
    return null
  }

  /** Type guard: extract status from the sortable data payload */
  const getStatusFromData = (data: Record<string, unknown> | undefined): TaskStatus | null => {
    if (!data || typeof data.status !== 'string') return null
    const s = data.status
    if (s === 'PENDING' || s === 'IN_PROGRESS' || s === 'COMPLETED') return s
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null)

    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    // What status did the card start in?
    const sourceStatus = getStatusFromData(active.data.current)
    // Where was it dropped?
    const destStatus = findColumnStatus(overId)

    if (!sourceStatus || !destStatus) return

    if (sourceStatus !== destStatus) {
      // Cross-column: change status
      // Calculate displayOrder for the destination column
      const destColumn = columns.find((c) => c.status === destStatus)
      const lastOrder = destColumn?.cards.length
        ? Math.max(...destColumn.cards.map((_, i) => (i + 1) * 100))
        : 0
      const newDisplayOrder = lastOrder + 100

      if (onDisplayOrderChange) {
        onDisplayOrderChange(activeId, destStatus, newDisplayOrder)
      } else if (onStatusChange) {
        onStatusChange(activeId, destStatus)
      }
    }
    // Within same column reordering — we could compute new displayOrder
    // but for now the cross-column move is the primary use case
  }

  const handleDragCancel = () => {
    setActiveCardId(null)
  }

  const handleQuickStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(taskId, newStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
        {isLoading ? (
          <div className="text-sm text-muted-foreground italic">Loading tasks…</div>
        ) : columns.every((c) => c.count === 0) ? (
          <div className="text-sm text-muted-foreground italic">No tasks found.</div>
        ) : (
          columns.map((col) => (
            <KanbanColumnComponent
              key={col.id}
              column={col}
              onQuickStatusChange={handleQuickStatusChange}
            />
          ))
        )}
      </div>

      {/* Drag Overlay — the ghost card that follows the cursor */}
      <DragOverlay>
        {activeCard ? <TaskCardComponent card={activeCard} isDragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
