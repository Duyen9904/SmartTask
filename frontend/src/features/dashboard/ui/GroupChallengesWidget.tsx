import { Trophy } from 'lucide-react'
import type { GroupChallengesModel } from '../model/dashboardTypes'

function ParticipantStack({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, 3).map((url, idx) => (
        <img
          key={`${url}-${idx}`}
          alt=""
          className="w-8 h-8 rounded-full border-2 border-[#131b2e]"
          src={url}
        />
      ))}
      {avatars.length > 3 ? (
        <div className="w-8 h-8 rounded-full bg-[#131b2e] border-2 border-white/10 flex items-center justify-center text-[10px] text-white">
          +{avatars.length - 3}
        </div>
      ) : null}
    </div>
  )
}

export function GroupChallengesWidget({ model }: { model: GroupChallengesModel }) {
  return (
    <section>
      <h3 className="text-xl font-bold text-white mb-4 px-2 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        {model.title}
      </h3>

      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
        {model.cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[340px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-bold">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.teamLabel}</p>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-1 rounded-md uppercase">
                {card.statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ParticipantStack avatars={card.participants.map((p) => p.avatarUrl)} />

              <div className="flex-1">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">{card.overallProgressLabel}</span>
                  <span className="text-white font-bold">{card.overallProgressPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full">
                  <div className="bg-[#00B894] h-full rounded-full" style={{ width: `${card.overallProgressPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="min-w-[340px] border border-dashed border-white/20 bg-white/5 backdrop-blur-xl p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center h-full py-2">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
              <span className="text-muted-foreground">+</span>
            </div>
            <p className="text-sm font-bold text-white">{model.startTile.title}</p>
            <p className="text-[10px] text-muted-foreground">{model.startTile.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

