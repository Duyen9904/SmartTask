import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  LandingNavbar,
  HeroSection,
  FeaturesGrid,
  HowItWorksSection,
  TestimonialsSection,
  CtaBanner,
  LandingFooter,
} from '@/features/landing'

export function LandingPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-200 font-[Inter] overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaBanner />
      <LandingFooter />
    </div>
  )
}
