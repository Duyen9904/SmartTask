import { Users } from 'lucide-react'
import type { OnlineFriend } from '../../model/socialTypes'

function FriendRow({ friend }: { friend: OnlineFriend }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-card">
          <img alt={friend.name} className="w-full h-full object-cover" src={friend.avatarUrl} />
        </div>
        <span
          className={[
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#131b2e]',
            friend.isOnline ? 'bg-[#00B894]' : 'bg-muted-foreground/50',
          ].join(' ')}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{friend.name}</p>
        <p className="text-xs text-muted-foreground truncate">{friend.statusText}</p>
      </div>
    </div>
  )
}

export function FriendsSidebar({ friends }: { friends: OnlineFriend[] }) {
  const onlineCount = friends.filter((f) => f.isOnline).length

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-3">
      <h4 className="text-white font-bold text-sm flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Friends
        </span>
        <span className="text-[11px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-md">
          {onlineCount} Online
        </span>
      </h4>

      <div className="divide-y divide-white/5">
        {friends.map((friend) => (
          <FriendRow key={friend.id} friend={friend} />
        ))}
      </div>
    </section>
  )
}
