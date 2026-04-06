import { Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/landingData'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#0f1424] px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 text-center">
          <h2 id="testimonials-title" className="text-[clamp(28px,3.5vw,40px)] font-extrabold tracking-tight text-white">
            Loved by High-Achievers
          </h2>
        </div>

        <div id="testimonials-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              id={`testimonial-${i}`}
              className="rounded-xl border border-violet-500/10 bg-[#131b2e] p-8 transition-all hover:-translate-y-0.5 hover:border-violet-500/20"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-sm italic leading-[1.7] text-slate-200">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[15px] font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
