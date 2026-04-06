import { Link } from 'react-router-dom'
import { Sparkles, Globe, CheckCircle, Users } from 'lucide-react'
import { FOOTER_LINKS } from '../data/landingData'

export function LandingFooter() {
  return (
    <footer id="landing-footer" className="border-t border-violet-500/10 px-6 pb-8 pt-16">
      <div className="mx-auto max-w-[1200px]">
        {/* Top grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white">
              <Sparkles className="h-5 w-5 text-violet-400" />
              SmartTask
            </Link>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-slate-400">
              Building the future of personal and social productivity with the power of artificial intelligence.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, CheckCircle, Users].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-400/[0.08] text-slate-400 transition-all hover:bg-violet-500/15 hover:text-violet-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col, i) => (
            <div key={i}>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-violet-500/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[13px] text-slate-600">© 2024 SmartTask AI Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {['Status', 'Security', 'Cookies'].map((t) => (
              <a key={t} href="#" className="text-[13px] text-slate-600 transition-colors hover:text-slate-400">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
