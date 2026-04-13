import { Zap } from 'lucide-react'
import type { GroupChallengeBanner } from '../../model/socialTypes'

export function GroupChallengesBanner({ banner }: { banner: GroupChallengeBanner }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-xl p-6">
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="text-white font-bold">Group Challenges</h4>
            <p className="text-sm text-muted-foreground">
              Join {banner.participantCount.toLocaleString()}+ users in the "{banner.title}" starting
              tomorrow.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          {banner.ctaLabel}
        </button>
      </div>
    </section>
  )
}
