import { Sparkles, UserPlus } from 'lucide-react'
import type { FriendSuggestion } from '../../model/socialTypes'

export function PeopleSuggestionCard({ person }: { person: FriendSuggestion }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-white/10 bg-card">
          <img alt={person.name} className="w-full h-full object-cover" src={person.avatarUrl} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-white font-bold text-sm truncate">{person.name}</h4>
            <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/15 px-1.5 py-0.5 rounded-md">
              <Sparkles className="h-3 w-3" />
              AI Suggested
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{person.bio}</p>
          {person.mutualCount ? (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              {person.mutualCount} mutual friends
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="w-full py-2 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
      >
        <UserPlus className="h-3.5 w-3.5" />
        Add Friend
      </button>
    </div>
  )
}
