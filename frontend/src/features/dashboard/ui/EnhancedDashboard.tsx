import { Calendar } from 'lucide-react'
import { SuggestPlanTodayWidget } from './SuggestPlanTodayWidget'
import { MoodCheckInWidget } from './MoodCheckInWidget'
import { PhotoProofsWidget } from './PhotoProofsWidget'
import { SocialFeedWidget } from './SocialFeedWidget'
import { UpcomingDeadlinesWidget } from './UpcomingDeadlinesWidget'
import { WeeklyProgressWidget } from './WeeklyProgressWidget'
import {
  moodCheckInMock,
  photoProofsMock,
  socialFeedMock,
  upcomingDeadlinesMock,
  weeklyPerformanceMock,
} from '../model/dashboardMockData'

export function EnhancedDashboard() {
  return (
    <div className="space-y-6">
      {/* ─── Hero Card ─────────────────────────────────────────── */}
      <section className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Greeting */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Good Evening,<br />Alex.
            </h1>
            <p className="text-muted-foreground text-sm mt-3 max-w-md leading-relaxed">
              You've cleared 85% of your high-impact targets. The AI suggests a focused session on{' '}
              <span className="text-primary font-semibold">Nexus Branding</span> before sunset.
            </p>
          </div>

          {/* Inline stats — Tasks Today only */}
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Tasks Today</p>
              <p className="text-3xl font-black text-white">
                12 <span className="text-sm text-muted-foreground font-normal">/6</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3-Column Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left column: Suggest Plan Today */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <SuggestPlanTodayWidget />
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
          >
            <Calendar className="h-4 w-4" />
            Full Calendar
          </button>
        </div>

        {/* Center column: Weekly Performance + Mood Check-in */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <WeeklyProgressWidget model={weeklyPerformanceMock} />
          <MoodCheckInWidget model={moodCheckInMock} />
        </div>

        {/* Right column: Deadlines + Proofs + Social */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <UpcomingDeadlinesWidget model={upcomingDeadlinesMock} />
          <PhotoProofsWidget {...photoProofsMock} />
          <SocialFeedWidget model={socialFeedMock} />
        </div>
      </div>
    </div>
  )
}
