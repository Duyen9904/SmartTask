import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function LandingNavbar() {
  return (
    <nav
      id="landing-navbar"
      className="fixed inset-x-0 top-0 z-50 border-b border-violet-500/10 bg-[#0a0e1a]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link
          to="/"
          id="landing-logo"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <Sparkles className="h-5 w-5 text-violet-400" />
          SmartTask
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Pricing
          </a>
          <Link to="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Sign In
          </Link>
        </div>

        <Link to="/signup">
          <Button
            id="nav-get-started"
            className="h-9 cursor-pointer rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 px-4 text-[13px] font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:-translate-y-px"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
