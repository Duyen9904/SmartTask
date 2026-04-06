import { CheckSquare, CircleCheck, MoreVertical, RefreshCw, Sparkles } from 'lucide-react'
import type { AiOptimizedScheduleModel, AiScheduleTimelineBlockModel } from '../model/dashboardTypes'

function TimelineBlock({ block }: { block: AiScheduleTimelineBlockModel }) {
  const isCompletion = block.variant === 'completionCircle' || block.completed
  const showLineThrough = Boolean(block.completed)
  const badgeTone = block.badgeTone

  const badgeStyles: Record<
    AiScheduleTimelineBlockModel['badgeTone'],
    { container: string; text: string; border?: string }
  > = {
    urgency: { container: 'bg-[#FF6B6B]/20', text: 'text-[#FF6B6B]' },
    medium: { container: 'bg-yellow-500/20', text: 'text-yellow-500' },
    health: { container: 'bg-[#00B894]/20', text: 'text-[#00B894]' },
    social: { container: 'bg-primary/20', text: 'text-primary' },
  }

  const iconStyles = isCompletion
    ? 'w-5 h-5 rounded-full bg-[#00B894] flex items-center justify-center text-white'
    : 'w-5 h-5 rounded border border-white/20 flex items-center justify-center text-transparent group-hover:border-primary cursor-pointer'

  return (
    <div
      className={[
        'p-4 flex gap-6 items-start hover:bg-white/5 transition-colors group',
        badgeTone === 'medium' ? 'bg-primary/5' : '',
      ].join(' ')}
    >
      <span
        className={[
          'text-muted-foreground font-bold text-sm min-w-[60px] pt-1',
          badgeTone === 'medium' ? 'text-primary' : '',
        ].join(' ')}
      >
        {block.timeLabel}
      </span>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={iconStyles}>
            {isCompletion ? (
              <CircleCheck className="h-3.5 w-3.5" />
            ) : (
              <CheckSquare className="h-3.5 w-3.5 text-transparent group-hover:text-white" />
            )}
          </div>

          <div>
            <p className={showLineThrough ? 'text-white/50 font-semibold line-through' : 'text-white font-semibold'}>
              {block.title}
            </p>
            <span
              className={[
                'px-2 py-0.5 rounded text-[10px] font-bold',
                badgeStyles[badgeTone].container,
                badgeStyles[badgeTone].text,
                badgeTone === 'medium' ? 'uppercase tracking-wider' : '',
              ].join(' ')}
            >
              {block.badgeText}
            </span>
          </div>
        </div>

        <MoreVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
      </div>
    </div>
  )
}

export function AiOptimizedScheduleWidget({ model }: { model: AiOptimizedScheduleModel }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          {model.title}
        </h2>
        <button
          type="button"
          className="bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-primary/30"
        >
          <RefreshCw className="h-4 w-4" />
          {model.regenerateLabel}
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="divide-y divide-white/5">
          {model.blocks.map((block) => (
            <TimelineBlock key={block.id} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}

