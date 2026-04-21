import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { formatWeekRange } from '@/utils/date'

export type CalendarSubView = 'day' | 'week' | 'month' | 'year'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

type CalendarToolbarProps = {
  selectedDate: Date
  subView: CalendarSubView
  onSubViewChange: (v: CalendarSubView) => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

function formatTitle(d: Date, sub: CalendarSubView): string {
  if (sub === 'day') {
    return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }
  if (sub === 'week') {
    return formatWeekRange(d)
  }
  if (sub === 'year') {
    return `${d.getFullYear()}`
  }
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

const subViews: { value: CalendarSubView; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

export function CalendarToolbar({
  selectedDate,
  subView,
  onSubViewChange,
  onPrev,
  onNext,
  onToday,
}: CalendarToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const currentLabel = subViews.find((v) => v.value === subView)?.label ?? 'Month'

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#111124] rounded-t-3xl border border-white/5 border-b-0">
      {/* Left: Today + nav arrows + title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToday}
          className="px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
        >
          Today
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-white tracking-wide ml-1">
          {formatTitle(selectedDate, subView)}
        </h2>
      </div>

      {/* Right: Dropdown view switcher */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          {currentLabel}
          <ChevronDown
            className={[
              'h-4 w-4 text-slate-400 transition-transform duration-200',
              dropdownOpen ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[140px] py-1.5 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 animate-in fade-in-0 zoom-in-95 duration-150">
            {subViews.map(({ value, label }) => {
              const isActive = subView === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onSubViewChange(value)
                    setDropdownOpen(false)
                  }}
                  className={[
                    'w-full text-left px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
