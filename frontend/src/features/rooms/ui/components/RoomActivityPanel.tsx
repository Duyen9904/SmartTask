import { MessageCircle } from 'lucide-react'
import type { ActivityFeedItem, RoomMember } from '../../model/roomTypes'

export function RoomActivityPanel({
  activityFeed,
  members,
}: {
  activityFeed: ActivityFeedItem[]
  members: RoomMember[]
}) {
  const onlineMembers = members.filter((m) => m.isOnline)

  return (
    <aside className="w-72 shrink-0 bg-[#0f141a] border-l border-white/5 flex flex-col h-full overflow-y-auto">
      {/* ── Activity Feed ─────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-6 h-6 rounded-md bg-red-500/15 flex items-center justify-center">
            <span className="text-red-400 text-xs font-bold">📊</span>
          </span>
          <h3 className="text-sm font-bold text-white">Activity Feed</h3>
        </div>

        <div className="space-y-5">
          {activityFeed.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.memberAvatar}
                alt={item.memberName}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <p className="text-xs text-white leading-relaxed">
                  <span className="font-bold text-primary">{item.memberName}</span>{' '}
                  {item.description}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {item.timestamp}
                </p>

                {/* Image preview for file shares */}
                {item.imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={item.imageUrl}
                      alt="Shared content"
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active Now ────────────────────────────────────────────── */}
      <div className="mt-auto px-5 py-5 border-t border-white/5">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Active Now
        </h4>
        <div className="flex items-center">
          {onlineMembers.slice(0, 3).map((m, i) => (
            <img
              key={m.id}
              src={m.avatarUrl}
              alt={m.name}
              title={m.name}
              className="w-10 h-10 rounded-full border-[3px] border-[#0f141a] object-cover hover:scale-110 transition-transform"
              style={{ marginLeft: i > 0 ? '-10px' : 0, zIndex: 10 - i }}
            />
          ))}
          {onlineMembers.length > 3 && (
            <span
              className="w-10 h-10 rounded-full bg-white/10 border-[3px] border-[#0f141a] flex items-center justify-center text-xs font-bold text-white"
              style={{ marginLeft: '-10px' }}
            >
              +{onlineMembers.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* ── Floating Chat Button ─────────────────────────────────── */}
      <div className="px-5 pb-5 flex justify-end">
        <button className="w-12 h-12 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white shadow-lg shadow-primary/25 transition-all hover:scale-105">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>
    </aside>
  )
}
