import { Sparkles, UserPlus } from 'lucide-react'
import {
  friendRequestsMock,
  friendSuggestionsMock,
} from '../model/socialMockData'
import { FriendRequestCard } from './components/FriendRequestCard'
import { PeopleSuggestionCard } from './components/PeopleSuggestionCard'

export function FindFriendsView() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-transparent to-transparent backdrop-blur-xl p-8">
        <h2 className="text-2xl font-extrabold text-white">Expand Your Network</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Find collaborators, friends, and productivity partners in the digital nebula.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            People You May Know
            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-md">
              AI Suggested
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {friendSuggestionsMock.map((person) => (
              <PeopleSuggestionCard key={person.id} person={person} />
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Friend Requests */}
          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              Friend Requests
            </h4>
            <div className="divide-y divide-white/5">
              {friendRequestsMock.map((req) => (
                <FriendRequestCard key={req.id} request={req} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
