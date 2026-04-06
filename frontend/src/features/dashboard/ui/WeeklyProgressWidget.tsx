import { ChevronDown } from 'lucide-react'
import type { WeeklyPerformanceModel } from '../model/dashboardTypes'

export function WeeklyProgressWidget({ model }: { model: WeeklyPerformanceModel }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-white">{model.title}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{model.subtitle}</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider hover:text-white transition-colors px-2 py-1 rounded-md bg-white/5"
        >
          {model.filterLabel}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-44 flex items-end justify-between gap-3 mt-6 px-1">
        {model.days.map((day) => {
          const opacity = day.isFuture ? 'opacity-30' : ''
          const glowClass = day.isToday ? 'shadow-[0_0_16px_rgba(124,58,237,0.4)]' : ''

          return (
            <div
              key={day.id}
              className={`flex-1 flex flex-col items-center gap-2 group cursor-pointer ${opacity}`}
            >
              {/* Dual bars wrapper */}
              <div className="w-full flex items-end justify-center gap-[3px] h-full">
                {/* Focus bar */}
                <div
                  className={`flex-1 rounded-t-md bg-primary transition-all group-hover:brightness-125 ${glowClass}`}
                  style={{ height: `${day.focusPct}%` }}
                />
                {/* Admin bar */}
                <div
                  className="flex-1 rounded-t-md bg-white/10 transition-all group-hover:bg-white/20"
                  style={{ height: `${day.adminPct}%` }}
                />
              </div>

              {/* Day label */}
              <span
                className={[
                  'text-[10px] font-bold uppercase tracking-wide',
                  day.isToday
                    ? 'text-primary'
                    : day.isFuture
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground',
                ].join(' ')}
              >
                {day.label}
                {day.isToday && (
                  <span className="block w-1 h-1 rounded-full bg-primary mx-auto mt-1" />
                )}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-white/5">
        {model.legend.map((l) => (
          <div key={l.id} className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            <span
              className={`w-2.5 h-2.5 rounded-sm ${l.variant === 'primary' ? 'bg-primary' : 'bg-white/15'}`}
            />
            {l.label}
          </div>
        ))}
      </div>
    </section>
  )
}
