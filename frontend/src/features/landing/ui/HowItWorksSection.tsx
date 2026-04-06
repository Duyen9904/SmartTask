import { STEPS } from '../data/landingData'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 pb-24 pt-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 text-center">
          <h2 id="steps-title" className="mb-3 text-[clamp(28px,3.5vw,40px)] font-extrabold tracking-tight text-white">
            Three Steps to Freedom
          </h2>
          <p className="mx-auto max-w-[500px] text-base leading-relaxed text-slate-400">
            Transforming your chaos into clarity is simpler than you think.
          </p>
        </div>

        <div id="steps-grid" className="grid gap-10 text-center sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={i} id={`step-${i}`}>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-500 text-xl font-extrabold text-white shadow-lg shadow-violet-500/30">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
              <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
