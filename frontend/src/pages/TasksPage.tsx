import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { ViewSwitcher, type TaskViewMode } from '@/features/tasks/ui/ViewSwitcher'
import { TaskListView } from '@/features/tasks/ui/TaskListView'
import { KanbanBoard } from '@/features/tasks/ui/KanbanBoard'
import { GanttChartView } from '@/features/tasks/ui/GanttChartView'
import { CalendarView } from '@/features/tasks/ui/CalendarView'
import { CreateEditTaskModal } from '@/features/tasks/ui/CreateEditTaskModal'
import { useTasksQuery } from '@/features/tasks/api/useTasksQuery'
import type { TaskCategory, TaskPriority, TaskSearchParams, TaskSummary } from '@/features/tasks/model/taskTypes'

const quickFilters = ['All Tasks', 'Today', 'This Week', 'High Priority', 'Shared'] as const
const categoryTabs = ['All Tasks', 'Personal', 'Work', 'Study', 'Shared'] as const

function toIsoDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

function startOfWeek(d: Date) {
  const copy = new Date(d)
  const dow = copy.getDay() // 0 Sun ... 6 Sat
  const diff = (dow + 6) % 7 // make Monday=0
  copy.setDate(copy.getDate() - diff)
  return copy
}

export function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeView = (searchParams.get('view') as TaskViewMode) || 'kanban'
  const [activeFilter, setActiveFilter] = React.useState('All Tasks')
  const [activeTab, setActiveTab] = React.useState('All Tasks')
  const [searchText, setSearchText] = React.useState('')
  const [modalState, setModalState] = React.useState<{
    open: boolean
    mode: 'create' | 'edit'
    task?: TaskSummary
  }>({ open: false, mode: 'create' })

  const handleViewChange = (view: TaskViewMode) => {
    setSearchParams({ view })
  }

  const queryParams: TaskSearchParams = React.useMemo(() => {
    const today = new Date()
    let from: string | undefined
    let to: string | undefined
    let priority: TaskPriority | undefined
    let category: TaskCategory | undefined

    if (activeFilter === 'Today') {
      const t = toIsoDate(today)
      from = t
      to = t
    }

    if (activeFilter === 'This Week') {
      const start = startOfWeek(today)
      const end = new Date(start)
      end.setDate(end.getDate() + 6)
      from = toIsoDate(start)
      to = toIsoDate(end)
    }

    if (activeFilter === 'High Priority') {
      priority = 'HIGH'
    }

    if (activeTab !== 'All Tasks') {
      const map: Record<string, TaskCategory> = {
        Personal: 'PERSONAL',
        Work: 'WORK',
        Study: 'STUDY',
        Shared: 'SOCIAL',
      }
      category = map[activeTab]
    }

    return {
      page: 0,
      size: 50,
      sort: 'displayOrder',
      q: searchText.trim() || undefined,
      from,
      to,
      priority,
      category,
    }
  }, [activeFilter, activeTab, searchText])

  const tasksQuery = useTasksQuery(queryParams)
  const tasks = tasksQuery.data?.content ?? []
  const totalCount = tasksQuery.data?.totalElements ?? tasks.length

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Page Header ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-black text-white tracking-tight">My Tasks</h2>
            <span className="px-2.5 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/20">
              {totalCount} tasks
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Organize your flow with AI assistance</p>
        </div>

        <div className="flex items-center gap-3">
          <ViewSwitcher activeView={activeView} onViewChange={handleViewChange} />
          <button
            type="button"
            onClick={() => setModalState({ open: true, mode: 'create' })}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>
      </div>

      {/* ─── Filters & Search (shared across all views) ──────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-primary focus:border-primary text-white placeholder:text-slate-500 outline-none transition-all"
              placeholder="Search tasks, tags, or members..."
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <button
            type="button"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm font-medium">Sort by due date</span>
          </button>
        </div>

        {/* Quick filter pills */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickFilters.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setActiveFilter(f)}
                className={[
                  'px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border',
                  activeFilter === f
                    ? 'bg-primary text-white font-bold border-primary'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/5',
                ].join(' ')}
              >
                {f === 'High Priority' && <span className="inline-block h-1.5 w-1.5 bg-red-500 rounded-full mr-1.5" />}
                {f}
              </button>
            ))}
          </div>
          <button type="button" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors pl-4 whitespace-nowrap">
            Clear completed
          </button>
        </div>
      </div>

      {/* ─── Category Tabs (shared across all views) ─────────────── */}
      <div className="flex border-b border-white/5">
        {categoryTabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              'px-6 py-3 text-sm font-medium transition-all',
              activeTab === tab
                ? 'font-bold text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-300',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Task Display Area (ONLY this part changes) ──────────── */}
      {activeView === 'list' && <TaskListView tasks={tasks} isLoading={tasksQuery.isLoading} />}
      {activeView === 'kanban' && <KanbanBoard tasks={tasks} isLoading={tasksQuery.isLoading} />}
      {activeView === 'calendar' && <CalendarView tasks={tasks} isLoading={tasksQuery.isLoading} />}
      {activeView === 'gantt' && <GanttChartView tasks={tasks} isLoading={tasksQuery.isLoading} />}

      {/* ─── Create/Edit Task Modal ─────────────────────────────── */}
      <CreateEditTaskModal
        open={modalState.open}
        mode={modalState.mode}
        initialData={modalState.task}
        onClose={() => setModalState({ open: false, mode: 'create' })}
      />
    </div>
  )
}
