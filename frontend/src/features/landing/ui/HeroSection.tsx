import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="landing-hero" className="relative overflow-hidden px-6 pb-20 pt-36 text-center md:pt-40">
      {/* Animated blurred orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 left-[20%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.12] blur-[100px] animate-[auth-orb-float_14s_ease-in-out_infinite_alternate]" />
        <div className="absolute -bottom-10 right-[15%] h-[300px] w-[300px] rounded-full bg-indigo-500/[0.08] blur-[100px] animate-[auth-orb-float_10s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute left-1/2 top-[40%] h-[200px] w-[200px] rounded-full bg-indigo-400/[0.06] blur-[80px] animate-[auth-orb-float_8s_ease-in-out_infinite_alternate]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, white 1px, transparent 1px), linear-gradient(225deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Badge */}
        <div
          id="hero-badge"
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-400"
        >
          <Zap className="h-3.5 w-3.5" />
          AI-Powered Productivity Platform
        </div>

        {/* Title */}
        <h1
          id="hero-title"
          className="mb-5 text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
        >
          Plan Smarter.
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
            Achieve Together.
          </span>
        </h1>

        {/* Subtitle */}
        <p id="hero-subtitle" className="mx-auto mb-9 max-w-[560px] text-[17px] leading-relaxed text-slate-400">
          AI-powered task management with social accountability. Experience the next generation of productivity
          designed for the modern team.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/signup">
            <Button
              id="hero-cta-primary"
              className="h-12 cursor-pointer rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 px-7 text-[15px] font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-violet-500/45 hover:-translate-y-px"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button
            id="hero-cta-secondary"
            variant="outline"
            className="h-12 cursor-pointer rounded-lg border-slate-500/25 bg-transparent px-7 text-[15px] font-semibold text-slate-200 transition-all hover:border-slate-500/40 hover:bg-slate-500/[0.08]"
          >
            <Play className="mr-2 h-3.5 w-3.5 fill-current" />
            Watch Demo
          </Button>
        </div>

        {/* ---- Dashboard Preview ---- */}
        <div id="hero-preview" className="group relative mx-auto mb-14 max-w-[860px]">
          {/* Glow behind card */}
          <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(107,91,230,0.12)_0%,transparent_70%)]" />

          <div className="relative overflow-hidden rounded-2xl border border-violet-500/10 bg-[#131b2e] shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(107,91,230,0.06)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-violet-500/10 bg-black/25 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center font-mono text-[11px] text-slate-600">
                app.smarttask.ai/dashboard
              </div>
            </div>

            {/* Body */}
            <div className="grid min-h-[320px] grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_200px]">
              {/* Sidebar */}
              <div className="hidden flex-col gap-2 border-r border-violet-500/10 p-4 sm:flex">
                <div className="h-8 rounded-md border border-violet-500/25 bg-violet-500/15" />
                <div className="h-8 rounded-md bg-slate-400/[0.06]" />
                <div className="h-8 rounded-md bg-slate-400/[0.06]" />
                <div className="h-8 rounded-md bg-slate-400/[0.06]" />
                <div className="h-8 rounded-md bg-slate-400/[0.06]" />
              </div>

              {/* Main content area */}
              <div className="flex flex-col gap-2.5 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-3.5 w-[140px] rounded bg-white/15" />
                  <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-[10px] font-semibold text-violet-400">
                    In Progress
                  </span>
                </div>
                <div className="h-2.5 w-full rounded bg-slate-400/[0.08]" />
                <div className="h-2.5 w-[55%] rounded bg-slate-400/[0.08]" />
                <div className="h-2.5 w-full rounded bg-slate-400/[0.08]" />
                <div className="h-2.5 w-[75%] rounded bg-slate-400/[0.08]" />
                <div className="h-2.5 w-full rounded bg-slate-400/[0.08]" />
                <div className="h-2.5 w-[55%] rounded bg-slate-400/[0.08]" />
              </div>

              {/* Right panel with chart */}
              <div className="hidden border-l border-violet-500/10 p-5 lg:block">
                <div className="mb-5 h-3 w-20 rounded bg-white/12" />
                <div className="flex h-[140px] items-end gap-2">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-violet-400 opacity-60 transition-opacity group-hover:opacity-85"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div id="hero-social-proof" className="text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.1em] text-slate-600">
            Trusted by 50,000+ productive people
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10">
            {['Vercel', 'Linear', 'Notion', 'Figma', 'Stripe'].map((name) => (
              <span key={name} className="text-base font-bold tracking-wide text-slate-400/30">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
