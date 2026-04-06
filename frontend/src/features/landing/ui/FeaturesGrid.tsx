import { FEATURES } from '../data/landingData'

export function FeaturesGrid() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 text-center">
          <h2 id="features-title" className="mb-3 text-[clamp(28px,3.5vw,40px)] font-extrabold tracking-tight text-white">
            Master Your Workflow
          </h2>
          <p className="mx-auto max-w-[500px] text-base leading-relaxed text-slate-400">
            Everything you need to stop procrastinating and start achieving your wildest goals.
          </p>
        </div>

        <div id="features-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              id={`feature-${i}`}
              className="rounded-xl border border-violet-500/10 bg-[#0f1424] p-8 transition-all hover:-translate-y-0.5 hover:border-violet-500/25 hover:bg-violet-500/[0.04]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/12">
                <f.icon className="h-[22px] w-[22px] text-violet-400" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
