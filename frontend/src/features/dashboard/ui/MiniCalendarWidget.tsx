import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CalendarDotType, MiniCalendarCell, MiniCalendarModel } from '../model/dashboardTypes'

const dotColorByType: Record<CalendarDotType, string> = {
  urgency: 'bg-[#FF6B6B]',
  // Stitch uses `bg-yellow-500` for this dot category.
  success: 'bg-yellow-500',
  completion: 'bg-[#00B894]',
}

function CalendarCellButton({
  cell,
  isSelected,
  onSelect,
}: {
  cell: MiniCalendarCell
  isSelected: boolean
  onSelect: () => void
}) {
  const dotTypes = cell.dotTypes ?? []

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={typeof cell.dayNumber !== 'number'}
      aria-label={typeof cell.dayNumber === 'number' ? `Day ${cell.dayNumber}` : 'Empty day'}
      className={[
        'aspect-square flex flex-col items-center justify-center rounded-lg transition-colors',
        isSelected
          ? 'bg-primary text-white ring-2 ring-primary/20 ring-offset-2 ring-offset-background font-bold'
          : 'text-white/30 hover:text-white hover:bg-white/5',
      ].join(' ')}
    >
      {typeof cell.dayNumber === 'number' ? (
        <>
          <span className="text-[10px] font-bold">{cell.dayNumber}</span>
          {dotTypes.length ? (
            <div className="flex gap-0.5 mt-1">
              {dotTypes.map((dotType) => (
                <span key={`${cell.id}-${dotType}`} className={`w-1 h-1 rounded-full ${dotColorByType[dotType]}`} />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <span className="text-[10px] text-white/20"> </span>
      )}
    </button>
  )
}

export function MiniCalendarWidget({ model }: { model: MiniCalendarModel }) {
  const defaultSelectedId = useMemo(() => {
    return model.cells.find((c) => c.dayNumber === 19)?.id ?? model.cells[0]?.id
  }, [model.cells])

  const [selectedId, setSelectedId] = useState<string | undefined>(defaultSelectedId)
  const [monthIndex, setMonthIndex] = useState(0)
  const monthLabels = ['March 2026', 'April 2026', 'May 2026']

  const displayedModel: MiniCalendarModel = useMemo(() => {
    return {
      ...model,
      monthLabel: monthLabels[monthIndex] ?? model.monthLabel,
    }
  }, [model, monthIndex, monthLabels])

  return (
    <section className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-sm">{displayedModel.monthLabel}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="p-1 rounded-md text-white/30 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMonthIndex((v) => Math.max(0, v - 1))}
            disabled={monthIndex === 0}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded-md text-white/30 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMonthIndex((v) => Math.min(monthLabels.length - 1, v + 1))}
            disabled={monthIndex === monthLabels.length - 1}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {displayedModel.weekDayLabels.map((label, idx) => (
          <span key={`${label}-${idx}`} className="text-[10px] font-bold text-muted-foreground">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {displayedModel.cells.map((cell) => (
          <CalendarCellButton
            key={cell.id}
            cell={cell}
            isSelected={cell.id === selectedId}
            onSelect={() => setSelectedId(cell.id)}
          />
        ))}
      </div>
    </section>
  )
}

