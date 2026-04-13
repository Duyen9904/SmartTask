import { Award, Clock, Download, Flame } from 'lucide-react'
import type { ActivityFeedItem } from '../../model/socialTypes'

function FeedItemAvatar({ item }: { item: ActivityFeedItem }) {
  return (
    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/10 bg-card">
      <img alt={item.actorName} className="w-full h-full object-cover" src={item.avatarUrl} />
    </div>
  )
}

function DeepWorkItem({ item }: { item: ActivityFeedItem }) {
  return (
    <div className="flex gap-3">
      <FeedItemAvatar item={item} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-bold">{item.actorName}</span>
        </p>
        <p className="text-sm text-white/80 mt-0.5">{item.description}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  )
}

function BadgeItem({ item }: { item: ActivityFeedItem }) {
  return (
    <div className="flex gap-3">
      <FeedItemAvatar item={item} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-bold">{item.actorName}</span>
        </p>
        <p className="text-sm text-white/80 mt-0.5">{item.description}</p>
        {item.badgeName ? (
          <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-[11px] font-bold">
            <Award className="h-3 w-3" />
            {item.badgeName}
          </span>
        ) : null}
        <div className="flex items-center gap-1.5 mt-1.5">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  )
}

function GroupProgressItem({ item }: { item: ActivityFeedItem }) {
  return (
    <div className="flex gap-3">
      <FeedItemAvatar item={item} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">{item.group?.name}</span>
          <span className="text-[10px] text-muted-foreground">Group Progress</span>
        </div>
        {item.group ? (
          <>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full">
                <div
                  className="bg-[#00B894] h-full rounded-full transition-all"
                  style={{ width: `${item.group.progressPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white">{item.group.progressPct}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">"{item.group.message}"</p>
          </>
        ) : null}
        <div className="flex items-center gap-1.5 mt-1.5">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  )
}

function TemplateShareItem({ item }: { item: ActivityFeedItem }) {
  return (
    <div className="flex gap-3">
      <FeedItemAvatar item={item} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-bold">{item.actorName}</span>
          <span className="text-muted-foreground"> shared a new template</span>
        </p>
        {item.template ? (
          <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-bold text-white">{item.template.name}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[11px] text-muted-foreground">
                {item.template.taskCount} Tasks
              </span>
              <span className="flex items-center gap-1 text-[11px] text-primary">
                <Download className="h-3 w-3" />
                {item.template.downloads} Downloads
              </span>
            </div>
          </div>
        ) : null}
        <div className="flex items-center gap-1.5 mt-1.5">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  )
}

const itemRenderers: Record<
  ActivityFeedItem['type'],
  React.ComponentType<{ item: ActivityFeedItem }>
> = {
  deep_work: DeepWorkItem,
  badge: BadgeItem,
  group_progress: GroupProgressItem,
  template_share: TemplateShareItem,
}

export function ActivityFeed({ items }: { items: ActivityFeedItem[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-5">
      <h3 className="text-white font-bold flex items-center gap-2">
        <Flame className="h-4 w-4 text-primary" />
        Activity Feed
      </h3>

      <div className="space-y-5">
        {items.map((item) => {
          const Renderer = itemRenderers[item.type]
          return (
            <div key={item.id} className="pb-5 border-b border-white/5 last:border-0 last:pb-0">
              <Renderer item={item} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
