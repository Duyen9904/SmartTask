import { useState } from 'react'
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Lightbulb,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { useTasksQuery } from '../../tasks'
import type { TaskSummary } from '../../tasks'

/* ─── Suggested plan when user has no tasks ──────────────────────── */
const aiSuggestions = [
  {
    id: 'sug-1',
    timeLabel: '08:00 AM',
    title: 'Morning Planning – Review priorities',
    tag: 'Planning',
    tagColor: 'text-sky-400 bg-sky-400/15',
  },
  {
    id: 'sug-2',
    timeLabel: '09:30 AM',
    title: 'Deep Work – Focus on your highest priority',
    tag: 'Focus',
    tagColor: 'text-amber-400 bg-amber-400/15',
  },
  {
    id: 'sug-3',
    timeLabel: '12:00 PM',
    title: 'Break & Recharge – Step away from the desk',
    tag: 'Wellness',
    tagColor: 'text-emerald-400 bg-emerald-400/15',
  },
  {
    id: 'sug-4',
    timeLabel: '01:30 PM',
    title: 'Catch up on emails & messages',
    tag: 'Admin',
    tagColor: 'text-violet-400 bg-violet-400/15',
  },
  {
    id: 'sug-5',
    timeLabel: '03:00 PM',
    title: 'Wrap up tasks and prepare for tomorrow',
    tag: 'Review',
    tagColor: 'text-rose-400 bg-rose-400/15',
  },
]

/* ─── Priority badge colors ──────────────────────────────────────── */
const priorityStyle: Record<string, { container: string; text: string }> = {
  HIGH: { container: 'bg-[#FF6B6B]/15', text: 'text-[#FF6B6B]' },
  MEDIUM: { container: 'bg-amber-500/15', text: 'text-amber-400' },
  LOW: { container: 'bg-emerald-500/15', text: 'text-emerald-400' },
}

/* ─── Single task row ────────────────────────────────────────────── */
function TaskRow({ task }: { task: TaskSummary }) {
  const style = priorityStyle[task.priority] ?? priorityStyle.LOW
  const isDone = task.status === 'DONE'

  return (
    <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.04] transition-colors">
      {/* status icon */}
      <span className="shrink-0">
        {isDone ? (
          <CheckCircle2 className="h-[18px] w-[18px] text-emerald-400" />
        ) : (
          <Circle className="h-[18px] w-[18px] text-white/25 group-hover:text-primary transition-colors" />
        )}
      </span>

      {/* title + priority */}
      <div className="flex-1 min-w-0">
        <p
          className={[
            'text-sm font-semibold truncate',
            isDone ? 'line-through text-white/40' : 'text-white',
          ].join(' ')}
        >
          {task.title}
        </p>
      </div>

      <span
        className={[
          'shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider',
          style.container,
          style.text,
        ].join(' ')}
      >
        {task.priority}
      </span>
    </div>
  )
}

/* ─── Suggested row (for AI generated plan) ──────────────────────── */
function SuggestionRow({
  suggestion,
}: {
  suggestion: (typeof aiSuggestions)[number]
}) {
  return (
    <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.04] transition-colors">
      <span className="shrink-0 text-xs text-muted-foreground font-bold min-w-[60px]">
        {suggestion.timeLabel}
      </span>

      <Lightbulb className="h-4 w-4 shrink-0 text-primary/60" />

      <p className="text-sm font-semibold text-white/80 flex-1 truncate">
        {suggestion.title}
      </p>

      <span
        className={[
          'shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold',
          suggestion.tagColor,
        ].join(' ')}
      >
        {suggestion.tag}
      </span>
    </div>
  )
}

/* ─── Main Widget ────────────────────────────────────────────────── */
export function SuggestPlanTodayWidget() {
  const today = new Date().toISOString().slice(0, 10)
  const { data, isLoading, refetch, isFetching } = useTasksQuery({
    from: today,
    to: today,
    size: 20,
    sort: 'priority',
  })

  const [showSuggestions, setShowSuggestions] = useState(false)

  const tasks: TaskSummary[] = data?.content ?? []
  const hasTasks = tasks.length > 0

  const displaySuggestions = !hasTasks || showSuggestions

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {displaySuggestions ? (
            <Sparkles className="h-4 w-4 text-primary" />
          ) : (
            <CalendarCheck className="h-4 w-4 text-primary" />
          )}
          {displaySuggestions ? "Today's Suggested Plan" : "Today's Plan"}
        </h2>

        <div className="flex items-center gap-2">
          {hasTasks && (
            <button
              type="button"
              onClick={() => setShowSuggestions((prev) => !prev)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3 w-3" />
              {showSuggestions ? 'My Tasks' : 'Suggest'}
            </button>
          )}

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-primary/30 disabled:opacity-50"
          >
            <RefreshCw
              className={[
                'h-3.5 w-3.5',
                isFetching ? 'animate-spin' : '',
              ].join(' ')}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground">
              Loading your plan…
            </p>
          </div>
        ) : displaySuggestions ? (
          /* ── AI Suggested plan ── */
          <div>
            {!hasTasks && (
              <div className="px-5 pt-4 pb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <p className="text-xs text-muted-foreground">
                  No tasks scheduled — here's a suggested plan to get you
                  started
                </p>
              </div>
            )}
            <div className="divide-y divide-white/5">
              {aiSuggestions.map((s) => (
                <SuggestionRow key={s.id} suggestion={s} />
              ))}
            </div>
          </div>
        ) : (
          /* ── User's actual tasks ── */
          <div className="divide-y divide-white/5">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
