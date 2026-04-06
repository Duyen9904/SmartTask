import { Flame, Smile, Star, Target } from 'lucide-react'
import type { DashboardStatsRowModel } from '../model/dashboardTypes'

export function StatsRow({ model }: { model: DashboardStatsRowModel }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 group hover:bg-primary/5 transition-all cursor-default">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium">{model.streakDaysLabel}</span>
          <Flame className="h-4 w-4 text-[#FF6B6B]" />
        </div>
        <div className="text-3xl font-bold text-white">{model.streakValue}</div>
        <p className="text-[#00B894] text-xs mt-2 font-semibold">{model.streakSubtext}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 group hover:bg-primary/5 transition-all cursor-default">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium">{model.tasksTodayLabel}</span>
          <Target className="h-4 w-4 text-primary" />
        </div>
        <div className="text-3xl font-bold text-white">{model.tasksTodayValue}</div>
        <div className="w-full bg-white/5 h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-primary h-full" style={{ width: `${model.tasksTodayProgressPct}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 group hover:bg-primary/5 transition-all cursor-default">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium">{model.productivityLabel}</span>
          <Star className="h-4 w-4 text-[#00D2D3]" />
        </div>
        <div className="text-3xl font-bold text-white">{model.productivityValue}</div>
        <p className="text-muted-foreground text-xs mt-2">{model.productivitySubtext}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 group hover:bg-primary/5 transition-all cursor-default border-b-2 border-[#00B894]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium">{model.moodLabel}</span>
          <Smile className="h-4 w-4 text-[#00B894]" />
        </div>
        <div className="text-3xl font-bold text-white uppercase tracking-tight">{model.moodValue}</div>
        <p className="text-[#00B894] text-xs mt-2 font-semibold">{model.moodSubtext}</p>
      </div>
    </section>
  )
}

