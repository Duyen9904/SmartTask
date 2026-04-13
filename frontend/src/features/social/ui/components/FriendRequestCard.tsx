import { Check, X } from 'lucide-react'
import type { FriendRequest } from '../../model/socialTypes'

export function FriendRequestCard({ request }: { request: FriendRequest }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 bg-card">
        <img alt={request.name} className="w-full h-full object-cover" src={request.avatarUrl} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{request.name}</p>
        <p className="text-[11px] text-muted-foreground truncate">
          {request.handle} • {request.contextText}
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary flex items-center justify-center transition-colors"
          title="Accept"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground flex items-center justify-center transition-colors"
          title="Decline"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
