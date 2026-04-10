import { List, BarChart3, Columns3, CalendarDays } from 'lucide-react'

export type TaskViewMode = 'list' | 'gantt' | 'kanban' | 'calendar'

type ViewSwitcherProps = {
  activeView: TaskViewMode
  onViewChange: (view: TaskViewMode) => void
}

const views: { mode: TaskViewMode; icon: React.ElementType; label: string }[] = [
  { mode: 'list', icon: List, label: 'List' },
  { mode: 'kanban', icon: Columns3, label: 'Board' },
  { mode: 'calendar', icon: CalendarDays, label: 'Calendar' },
  { mode: 'gantt', icon: BarChart3, label: 'Gantt' },
]

export function ViewSwitcher({ activeView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
      {views.map(({ mode, icon: Icon, label }) => {
        const isActive = activeView === mode
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onViewChange(mode)}
            className={[
              'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all',
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:text-white',
            ].join(' ')}
            title={label}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
