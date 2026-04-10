import type { TaskPriority } from '../model/taskTypes'

const priorities: { value: TaskPriority; label: string; dot: string; activeBg: string; activeText: string }[] = [
  { value: 'LOW',    label: 'Low',    dot: 'bg-slate-400',   activeBg: 'bg-slate-500/20',   activeText: 'text-slate-300' },
  { value: 'MEDIUM', label: 'Medium', dot: 'bg-amber-400',   activeBg: 'bg-amber-500/20',   activeText: 'text-amber-400' },
  { value: 'HIGH',   label: 'High',   dot: 'bg-red-400',     activeBg: 'bg-red-500/20',     activeText: 'text-red-400' },
  { value: 'CRITICAL', label: 'Critical', dot: 'bg-red-500',     activeBg: 'bg-red-500/30',     activeText: 'text-red-500' },
]

type PrioritySelectorProps = {
  value: TaskPriority
  onChange: (priority: TaskPriority) => void
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Task priority">
      {priorities.map((p) => {
        const isActive = value === p.value
        return (
          <button
            key={p.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(p.value)}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border',
              isActive
                ? `${p.activeBg} ${p.activeText} border-current/20 shadow-lg`
                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white',
            ].join(' ')}
          >
            <span className={`h-2 w-2 rounded-full ${p.dot} ${isActive ? 'animate-pulse' : ''}`} />
            {p.label}
          </button>
        )
      })}
    </div>
  )
}
