import { Trophy } from 'lucide-react'
import type { LeaderboardEntry } from '../../model/socialTypes'

const rankAccents: Record<number, string> = {
  1: 'text-amber-400 bg-amber-400/15',
  2: 'text-slate-300 bg-slate-300/15',
  3: 'text-orange-400 bg-orange-400/15',
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const accent = rankAccents[entry.rank] ?? 'text-muted-foreground bg-white/5'

  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        className={[
          'w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black',
          accent,
        ].join(' ')}
      >
        {entry.rank}
      </span>
      <span className="flex-1 text-sm font-semibold text-white truncate">{entry.name}</span>
      <span className="text-xs font-bold text-primary">{entry.points.toLocaleString()} pts</span>
    </div>
  )
}

export function LeaderboardWidget({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-3">
      <h4 className="text-white font-bold text-sm flex items-center gap-2">
        <Trophy className="h-4 w-4 text-primary" />
        Weekly Leaderboard
      </h4>

      <div className="divide-y divide-white/5">
        {entries.map((entry) => (
          <LeaderboardRow key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  )
}
