import type { QuickAccessButtonsModel } from '../model/dashboardTypes'

export function QuickAccessButtons({ model }: { model: QuickAccessButtonsModel }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {model.buttons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          className="rounded-xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 flex items-center justify-between hover:bg-primary/10 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform">{btn.emoji}</span>
            <span className="text-white font-bold">{btn.label}</span>
          </div>
          <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded">{btn.count}</span>
        </button>
      ))}
    </section>
  )
}

