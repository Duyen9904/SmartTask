import { Smile } from 'lucide-react'
import type { MoodCheckInModel } from '../model/dashboardTypes'

export function MoodCheckInWidget({ model }: { model: MoodCheckInModel }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Smile className="h-4 w-4 text-[#00B894]" />
        {model.title}
      </h3>

      <div className="flex justify-between items-center mb-6">
        {model.emojiOptions.map((opt, idx) => (
          <button
            key={opt.id}
            type="button"
            className={[
              'text-3xl transition-all transform hover:scale-110',
              idx === model.emojiOptions.length - 1 ? 'hover:scale-125 drop-shadow-lg' : '',
              idx === 0 || idx === 1 || idx === 2 || idx === 3 ? 'grayscale hover:grayscale-0' : '',
            ].join(' ')}
            aria-label={opt.emoji}
          >
            {opt.emoji}
          </button>
        ))}
      </div>

      <button type="button" className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all">
        {model.logLabel}
      </button>
    </section>
  )
}

