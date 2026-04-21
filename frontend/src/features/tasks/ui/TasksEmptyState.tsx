import { CalendarOff, Plus, Sparkles, Wand2 } from 'lucide-react'

/* ── Quick-start suggestion chips ─────────────────────────────────── */
const quickSuggestions = [
  { id: 'qs-1', emoji: '📝', label: 'Morning planning session' },
  { id: 'qs-2', emoji: '💪', label: 'Exercise routine' },
  { id: 'qs-3', emoji: '📚', label: 'Study block' },
  { id: 'qs-4', emoji: '🧹', label: 'Organize workspace' },
]

type TasksEmptyStateProps = {
  onCreateTask: () => void
  onAIGenerate: () => void
  /** Optionally pre-fill a quick suggestion into the creation flow */
  onQuickSuggestion?: (label: string) => void
}

export function TasksEmptyState({
  onCreateTask,
  onAIGenerate,
  onQuickSuggestion,
}: TasksEmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-16 lg:py-24">
      <div className="relative w-full max-w-[540px]">
        {/* ── Ambient glow behind the card ───────────────────────── */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-[40px] opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(107,91,230,0.35) 0%, transparent 70%)',
          }}
        />

        {/* ── Card ───────────────────────────────────────────────── */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center shadow-2xl shadow-primary/5">
          {/* Icon cluster */}
          <div className="mx-auto mb-6 relative w-20 h-20">
            {/* outer glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
            {/* icon container */}
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/20">
              <CalendarOff className="h-9 w-9 text-primary" />
            </div>
            {/* sparkle accents */}
            <Sparkles className="absolute -top-1.5 -right-1.5 h-4 w-4 text-primary/60 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-2 h-3 w-3 text-primary/40 animate-pulse [animation-delay:0.5s]" />
          </div>

          {/* Text */}
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">
            No tasks for today
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto mb-8">
            Your schedule is clear! Start by creating a task manually or let AI
            plan your entire day with smart suggestions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={onCreateTask}
              className="flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-[#6f5fea] to-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:opacity-95 transition-all w-full sm:w-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </button>

            <button
              type="button"
              onClick={onAIGenerate}
              className="flex items-center gap-2.5 px-7 py-3 border border-primary/30 text-primary text-sm font-bold rounded-xl hover:bg-primary/10 transition-all w-full sm:w-auto justify-center group"
            >
              <Wand2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              AI Generate Plan
            </button>
          </div>

          {/* Quick Suggestions */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground mb-3">
              Quick suggestions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickSuggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onQuickSuggestion?.(s.label)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.07] text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  <span>{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
