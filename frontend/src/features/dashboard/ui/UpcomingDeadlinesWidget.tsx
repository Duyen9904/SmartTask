import { AlertTriangle, Timer } from 'lucide-react'
import type { UpcomingDeadlinesModel } from '../model/dashboardTypes'

export function UpcomingDeadlinesWidget({ model }: { model: UpcomingDeadlinesModel }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-[#FF6B6B]" />
        {model.title}
      </h3>

      <div className="space-y-4">
        {model.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{item.projectTitle}</p>
              <p className="text-xs text-[#FF6B6B]">{item.endsInText}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FF6B6B]/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[#FF6B6B]" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

