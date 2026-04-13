import { MicOff } from 'lucide-react'
import type { CallParticipant } from '../../model/chatTypes'

export function VideoGrid({ participants }: { participants: CallParticipant[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 flex-1 p-2">
      {participants.map((p) => (
        <div
          key={p.id}
          className={[
            'relative rounded-xl overflow-hidden bg-surface-container group',
            p.isSpeaking
              ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
              : 'ring-1 ring-white/10',
          ].join(' ')}
        >
          {/* Avatar as video placeholder */}
          <img
            src={p.avatarUrl}
            alt={p.name}
            className="w-full h-full object-cover"
          />

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{p.name}</span>
              {p.isMuted && <MicOff className="h-3.5 w-3.5 text-red-400" />}
              {p.isSpeaking && (
                <span className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${6 + i * 3}px`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
