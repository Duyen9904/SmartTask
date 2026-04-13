import type React from 'react'
import { TrendingUp, Zap, Users } from 'lucide-react'
import type { TaskCategory, TaskSummary } from '../model/taskTypes'

/* ─── Color maps ─────────────────────────────────────────────────── */
const barColors: Record<string, { track: string; fill: string; glow: string }> = {
  teal:   { track: 'bg-emerald-900/30', fill: 'bg-emerald-400', glow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]' },
  orange: { track: 'bg-orange-900/30',  fill: 'bg-orange-400',  glow: 'shadow-[0_0_12px_rgba(251,146,60,0.4)]' },
  purple: { track: 'bg-primary/30',     fill: 'bg-primary',     glow: 'shadow-[0_0_12px_rgba(108,92,231,0.4)]' },
}

const statIcons: Record<string, React.ElementType> = {
  TrendingUp,
  Zap,
  Users,
}

const statColors: Record<string, string> = {
  teal: 'text-emerald-400',
  orange: 'text-orange-400',
  purple: 'text-primary',
}

type GanttCategory = {
  id: string
  label: string
  color: 'teal' | 'orange' | 'purple'
  taskCategory: TaskCategory
}

type GanttTask = {
  id: string
  title: string
  category: string
  categoryColor: 'teal' | 'orange' | 'purple'
  startPct: number
  widthPct: number
  progressPct: number
  dueDate?: string
  hasDependency?: boolean
}

function monthRange(d: Date) {
  const start = new Date(d.getFullYear(), d.getMonth(), 1)
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  return { start, end }
}

function clampPct(n: number) {
  return Math.max(0, Math.min(100, n))
}

function daysBetween(a: Date, b: Date) {
  const ms = 24 * 60 * 60 * 1000
  const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return Math.round((bb - aa) / ms)
}

function toProgressPct(status: TaskSummary['status']) {
  switch (status) {
    case 'COMPLETED':
      return 100
    case 'IN_PROGRESS':
      return 60
    case 'PENDING':
    default:
      return 15
  }
}

function buildGantt(tasks: TaskSummary[]) {
  const categories: GanttCategory[] = [
    { id: 'cat-work', label: 'Work', color: 'teal', taskCategory: 'WORK' },
    { id: 'cat-personal', label: 'Personal', color: 'orange', taskCategory: 'PERSONAL' },
    { id: 'cat-study', label: 'Study', color: 'purple', taskCategory: 'STUDY' },
    { id: 'cat-health', label: 'Health', color: 'teal', taskCategory: 'HEALTH' },
    { id: 'cat-social', label: 'Social', color: 'orange', taskCategory: 'SOCIAL' },
  ]

  const now = new Date()
  const { start, end } = monthRange(now)
  const totalDays = Math.max(1, daysBetween(start, end) + 1)

  const ganttTasks: GanttTask[] = tasks
    .filter((t) => t.dueDate || t.scheduledDate)
    .map((t) => {
      const dateStr = t.dueDate || t.scheduledDate
      const due = dateStr ? new Date(dateStr) : null
      const dayOffset = due ? daysBetween(start, due) : 0
      const centerPct = (dayOffset / totalDays) * 100

      const widthPct = t.status === 'COMPLETED' ? 18 : t.status === 'IN_PROGRESS' ? 22 : 20
      const startPct = clampPct(centerPct - widthPct / 2)

      const cat = categories.find((c) => c.taskCategory === t.category) ?? categories[0]

      return {
        id: t.id,
        title: t.title,
        category: cat.id,
        categoryColor: cat.color,
        startPct,
        widthPct: clampPct(widthPct),
        progressPct: toProgressPct(t.status),
        dueDate: dateStr ?? undefined,
        hasDependency: false,
      }
    })

  // Timeline labels: 4 blocks spanning the current month
  const w1Start = new Date(start)
  const w2Start = new Date(start.getFullYear(), start.getMonth(), Math.min(8, end.getDate()))
  const w3Start = new Date(start.getFullYear(), start.getMonth(), Math.min(15, end.getDate()))
  const w4Start = new Date(start.getFullYear(), start.getMonth(), Math.min(22, end.getDate()))

  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: '2-digit' })
  const timelineWeeks = [
    { id: 'w1', label: `${fmt(w1Start)} - ${fmt(new Date(w2Start.getTime() - 86400000))}`, subLabel: 'Week 1', isCurrent: false },
    { id: 'w2', label: `${fmt(w2Start)} - ${fmt(new Date(w3Start.getTime() - 86400000))}`, subLabel: 'Week 2', isCurrent: false },
    { id: 'w3', label: `${fmt(w3Start)} - ${fmt(new Date(w4Start.getTime() - 86400000))}`, subLabel: 'Week 3', isCurrent: false },
    { id: 'w4', label: `${fmt(w4Start)} - ${fmt(end)}`, subLabel: 'Week 4', isCurrent: true },
  ]

  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length
  const health = total === 0 ? 0 : Math.round((completed / total) * 1000) / 10

  type GanttStatItem = {
    id: string
    label: string
    value: string
    icon: string
    color: 'teal' | 'orange' | 'purple'
    progressPct?: number
    unit?: string
    subtext?: string
  }

  const stats: GanttStatItem[] = [
    { id: 'gs-1', label: 'Completion Rate', value: `${health}%`, icon: 'TrendingUp', color: 'teal', progressPct: health },
    { id: 'gs-2', label: 'Active Tasks', value: String(inProgress), icon: 'Zap', color: 'orange', subtext: 'Currently in progress' },
    { id: 'gs-3', label: 'Total Tasks', value: String(total), icon: 'Users', color: 'purple', subtext: 'In current view' },
  ]

  return { categories, ganttTasks, timelineWeeks, stats }
}

export function GanttChartView({ tasks, isLoading }: { tasks: TaskSummary[]; isLoading?: boolean }) {
  const { categories, ganttTasks, timelineWeeks, stats } = buildGantt(tasks)
  return (
    <div className="flex flex-col gap-8">
      {/* ─── Gantt Visualization ────────────────────────────────── */}
      <div className="relative bg-[#111124] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Timeline Ruler */}
        <div className="flex border-b border-white/10 bg-[#1d1d34]/50 backdrop-blur-md">
          <div className="w-56 border-r border-white/10 p-5 flex items-center flex-shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Task Categories
            </span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-[900px]">
              {timelineWeeks.map((week) => (
                <div key={week.id} className="flex-1 p-5 border-r border-white/5 text-center last:border-r-0">
                  <span
                    className={[
                      'block text-xs font-bold',
                      week.isCurrent ? 'text-primary' : 'text-white',
                    ].join(' ')}
                  >
                    {week.label}
                  </span>
                  <span
                    className={[
                      'text-[10px] uppercase tracking-widest',
                      week.isCurrent ? 'text-primary' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {week.subLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gantt Body */}
        <div className="flex">
          {/* Left Sidebar (Labels) */}
          <div className="w-56 border-r border-white/10 bg-[#111124]/80 z-10 flex-shrink-0">
            {categories.map((cat) => {
              const catTasks = ganttTasks.filter((t) => t.category === cat.id)
              const colorClass = cat.color === 'teal' ? 'text-emerald-400' : 'text-orange-400'
              return (
                <div key={cat.id} className="p-5 border-b border-white/5 last:border-b-0">
                  <span className={`text-xs font-bold uppercase tracking-widest block mb-4 ${colorClass}`}>
                    {cat.label}
                  </span>
                  <ul className="space-y-6">
                    {catTasks.map((t) => (
                      <li key={t.id} className="text-sm font-medium text-white/80">
                        {t.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Right Timeline (Bars) */}
          <div
            className="flex-1 min-w-[900px] p-6 relative"
            style={{
              backgroundSize: '40px 100%',
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
            }}
          >
            {/* Current Day Indicator */}
            <div className="absolute top-0 bottom-0 left-[75%] w-px bg-primary/40 z-0 shadow-[0_0_15px_rgba(108,92,231,0.5)]">
              <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20" />
            </div>

            {/* Task Rows grouped by category */}
            {categories.map((cat, catIdx) => {
              const catTasks = ganttTasks.filter((t) => t.category === cat.id)
              return (
                <div key={cat.id} className={catIdx > 0 ? 'mt-12' : 'pt-6'}>
                  <div className="space-y-6">
                    {catTasks.map((task) => {
                      const c = barColors[task.categoryColor] ?? barColors.teal
                      return (
                        <div key={task.id} className="h-8 flex items-center">
                          <div
                            className={`relative group h-3 ${c.track} rounded-full cursor-pointer hover:h-4 transition-all duration-200`}
                            style={{ marginLeft: `${task.startPct}%`, width: `${task.widthPct}%` }}
                          >
                            <div
                              className={`absolute inset-y-0 left-0 ${c.fill} rounded-full ${c.glow}`}
                              style={{ width: `${task.progressPct}%` }}
                            />

                            {/* Tooltip */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 bg-[#23233c] p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 border border-white/10 backdrop-blur-xl">
                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-tighter ${statColors[task.categoryColor]}`}>
                                  {task.progressPct}% Complete
                                </span>
                              </div>
                              {task.dueDate && <p className="text-[10px] text-slate-400">Due: {task.dueDate}</p>}
                            </div>

                            {/* Dependency arrow */}
                            {task.hasDependency && (
                              <svg className="absolute -left-8 top-1/2 -translate-y-1/2 overflow-visible" height="40" width="32">
                                <path
                                  className="text-white/10"
                                  d="M 0,-30 L 16,-30 L 16,0 L 32,0"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {!isLoading && ganttTasks.length === 0 && (
              <div className="text-sm text-muted-foreground italic">No dated tasks to display on the timeline.</div>
            )}
            {isLoading && (
              <div className="text-sm text-muted-foreground italic">Loading tasks…</div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Floating Perspective Cards ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = statIcons[stat.icon] ?? TrendingUp
          const iconColor = statColors[stat.color] ?? 'text-primary'
          return (
            <div
              key={stat.id}
              className="bg-[#111124] p-7 rounded-3xl border border-white/5 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  {stat.label}
                </span>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>

              <div className="text-4xl font-black text-white mb-2">
                {stat.value}{' '}
                {stat.unit && <span className="text-lg font-medium text-slate-400">{stat.unit}</span>}
              </div>

              {stat.progressPct != null && (
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stat.color === 'teal' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]' : 'bg-primary'}`}
                    style={{ width: `${stat.progressPct}%` }}
                  />
                </div>
              )}

              {stat.subtext && <p className={`text-xs mt-2 ${statColors[stat.color]}`}>{stat.subtext}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
