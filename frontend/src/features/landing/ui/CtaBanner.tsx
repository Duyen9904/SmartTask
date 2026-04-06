import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'

export function CtaBanner() {
  return (
    <section id="landing-cta" className="px-6 pb-20 pt-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-500 px-6 py-16 text-center md:px-10">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-1/2 right-[-20%] h-[400px] w-[400px] rounded-full bg-white/[0.08] blur-[80px]" />
          {/* Shield icon */}
          <div className="absolute right-8 top-6 opacity-15">
            <Shield className="h-20 w-20 text-white" />
          </div>

          <h2 id="cta-title" className="relative z-10 mb-3 text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight text-white">
            Ready to Transform Your Productivity?
          </h2>
          <p className="relative z-10 mx-auto mb-8 max-w-[480px] text-base text-white/80">
            Join 50,000+ others who are achieving more every single day. No credit card required.
          </p>

          <div className="relative z-10 mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup">
              <Button
                id="cta-primary"
                className="h-12 cursor-pointer rounded-lg bg-white px-7 text-[15px] font-semibold text-violet-700 shadow-lg shadow-black/15 transition-all hover:bg-white/90 hover:shadow-black/20 hover:-translate-y-px"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              id="cta-secondary"
              variant="outline"
              className="h-12 cursor-pointer rounded-lg border-white/25 bg-transparent px-7 text-[15px] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/[0.08]"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="relative z-10 text-[13px] text-white/60">No credit card required · Free 14-day trial</p>
        </div>
      </div>
    </section>
  )
}
