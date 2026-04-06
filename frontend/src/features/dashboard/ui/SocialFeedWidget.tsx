import { Users } from 'lucide-react'
import type { SocialFeedModel } from '../model/dashboardTypes'

export function SocialFeedWidget({ model }: { model: SocialFeedModel }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-4">
      <h3 className="text-white font-bold flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          {model.title}
        </span>
        <a className="text-xs text-primary font-bold hover:underline" href="#">
          {model.viewAllLabel}
        </a>
      </h3>

      <div className="space-y-4">
        {model.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 bg-card">
              <img alt={item.authorName} className="w-full h-full object-cover" src={item.avatarUrl} />
            </div>
            <div>
              <p className="text-sm text-white">
                <span className="font-bold">{item.authorName}</span> completed{' '}
                <span className="text-[#00D2D3] font-semibold">{item.actionHighlight}</span>
              </p>
              <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

