import { useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Frown,
  Lightbulb,
  Mic,
  Paperclip,
  Send,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

/* ─── Chat message types ────────────────────────────────────────── */
interface ChatMessage {
  id: string
  role: 'ai' | 'user'
  content: string
  type?: 'text' | 'schedule' | 'confirmation'
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    content:
      "Good evening, Alex! 👋 Based on your patterns, I've drafted a high-performance schedule for tomorrow. Would you like to see it?",
  },
  {
    id: '2',
    role: 'user',
    content: "Yes, show me tomorrow's plan.",
  },
  {
    id: '3',
    role: 'ai',
    content: 'schedule',
    type: 'schedule',
  },
  {
    id: '4',
    role: 'ai',
    content:
      "I've also noticed your mood tends to dip around 3 PM on Tuesdays. I've scheduled your workout then to boost your dopamine levels. Does this look good?",
  },
  {
    id: '5',
    role: 'user',
    content: 'That looks great! Apply it.',
  },
  {
    id: '6',
    role: 'ai',
    content:
      '✅ Schedule applied! Your focus mode will automatically trigger at 09:00 AM. Good luck, Alex!',
    type: 'confirmation',
  },
]

const scheduleItems = [
  { time: '09:00', task: '📐 Advanced Math', tag: 'Priority', tagColor: 'primary' },
  { time: '10:30', task: '☕ Short Break', muted: true },
  { time: '11:00', task: '👥 Team Standup' },
  { time: '13:00', task: '📖 Study Group w/ Sarah', accent: 'emerald', icon: <Users className="h-3.5 w-3.5 text-[#00b894]" /> },
  { time: '16:00', task: '💪 Daily Workout', icon: <Zap className="h-3.5 w-3.5 text-[#ff6b6b]" /> },
]

const insights = [
  {
    icon: <TrendingUp className="h-5 w-5 text-[#00d2d3] mt-0.5 shrink-0" />,
    text: (
      <>Peak productivity reached between <span className="text-white font-bold">9:00 AM - 11:30 AM</span>.</>
    ),
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-[#6c5ce7] mt-0.5 shrink-0" />,
    text: (
      <>Completed <span className="text-white font-bold">15 tasks</span> in the &apos;Study&apos; category (+20% vs last week).</>
    ),
  },
  {
    icon: <Frown className="h-5 w-5 text-[#ff6b6b] mt-0.5 shrink-0" />,
    text: <>Mood correlation: Late night work sessions lead to 40% lower efficiency the next day.</>,
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-[#00b894] mt-0.5 shrink-0" />,
    text: <>Recommendation: Morning workout increased your focus by 2.5 hours on Wednesday.</>,
  },
]

const quickActions = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Generate Schedule',
    description: 'Auto-plan your next 24 hours.',
    hoverColor: 'hover:border-[#00d2d3]/40',
    iconColor: 'text-[#00d2d3]',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Analyze Habits',
    description: 'Deep dive into focus patterns.',
    hoverColor: 'hover:border-[#6c5ce7]/40',
    iconColor: 'text-[#6c5ce7]',
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Suggest Tasks',
    description: 'AI-curated backlog tasks.',
    hoverColor: 'hover:border-[#00b894]/40',
    iconColor: 'text-[#00b894]',
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: 'Focus Mode',
    description: 'Lock distractions immediately.',
    hoverColor: 'hover:border-[#ff6b6b]/40',
    iconColor: 'text-[#ff6b6b]',
  },
]

const barHeights = ['30%', '60%', '90%', '100%', '75%', '40%', '20%', '55%', '85%', '45%']
const barColors = [
  'bg-white/10',
  'bg-[#6c5ce7]/40',
  'bg-[#6c5ce7]/80',
  'bg-[#00d2d3]',
  'bg-[#6c5ce7]/60',
  'bg-white/10',
  'bg-white/5',
  'bg-[#6c5ce7]/30',
  'bg-[#6c5ce7]/70',
  'bg-[#ff6b6b]/40',
]

/* ─── Components ────────────────────────────────────────────────── */

function AiAvatar() {
  return (
    <div className="size-10 rounded-xl bg-[#00d2d3]/20 border border-[#00d2d3]/30 flex items-center justify-center shrink-0">
      <Sparkles className="h-5 w-5 text-[#00d2d3]" />
    </div>
  )
}

function UserAvatar() {
  const { user } = useAuth()
  const initial = user?.fullName?.trim()?.[0]?.toUpperCase() ?? 'A'

  return (
    <div className="size-10 rounded-xl bg-[#6c5ce7]/20 border border-[#6c5ce7]/30 flex items-center justify-center shrink-0">
      <span className="text-sm font-bold text-[#6c5ce7]">{initial}</span>
    </div>
  )
}

function ScheduleCard() {
  return (
    <div className="bg-[#141432] border border-white/10 p-5 rounded-xl rounded-tl-none shadow-xl">
      <h4 className="text-sm font-bold text-[#00d2d3] mb-4 uppercase tracking-wider flex items-center gap-2">
        <CalendarDays className="h-4 w-4" /> Tomorrow&apos;s Optimized Schedule
      </h4>
      <div className="space-y-3">
        {scheduleItems.map((item) => (
          <div
            key={item.time}
            className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 hover:border-[#00d2d3]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#b8b8d4] w-12">{item.time}</span>
              <span className={`font-medium ${item.muted ? 'text-[#b8b8d4]' : item.accent === 'emerald' ? 'text-[#00b894]' : ''}`}>
                {item.task}
              </span>
            </div>
            {item.tag && (
              <span className="text-[10px] px-2 py-0.5 bg-[#6c5ce7]/20 text-[#6c5ce7] rounded border border-[#6c5ce7]/30">
                {item.tag}
              </span>
            )}
            {item.icon && item.icon}
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'ai') {
    return (
      <div className="flex gap-4">
        <AiAvatar />
        <div className="space-y-4 max-w-[85%]">
          {message.type === 'schedule' ? (
            <ScheduleCard />
          ) : (
            <div className={`bg-[#141432] ${message.type === 'confirmation' ? 'border-[#00b894]/30' : 'border-white/10'} border p-4 rounded-xl rounded-tl-none`}>
              <p className="text-slate-200 leading-relaxed">{message.content}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 justify-end">
      <div className="space-y-4 max-w-[85%]">
        <div className="bg-[#6c5ce7] text-white p-4 rounded-xl rounded-tr-none shadow-lg">
          <p className="leading-relaxed">{message.content}</p>
        </div>
      </div>
      <UserAvatar />
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export function AIAssistantPage() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Page Header ──────────────────────────────────────────── */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            <span className="bg-gradient-to-r from-[#6c5ce7] via-[#00d2d3] to-[#00b894] bg-clip-text text-transparent">
              AI
            </span>{' '}
            Assistant{' '}
            <span className="text-[#00d2d3] inline-block">✨</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-lg text-[#b8b8d4]">Your personal productivity companion</p>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="flex items-center gap-1.5 text-[#00b894] text-sm font-bold">
              <span className="size-2 bg-[#00b894] rounded-full animate-pulse" /> Online
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-xs font-mono text-[#b8b8d4] uppercase tracking-widest">
              GPT-4 Powered
            </span>
          </div>
        </div>
      </header>

      {/* ─── Two-Panel Layout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-start">
        {/* ─── Left: Chat Interface ──────────────────────────────── */}
        <section className="rounded-2xl flex flex-col min-h-[750px] overflow-hidden shadow-2xl bg-[#00d2d3]/5 backdrop-blur-xl border border-[#00d2d3]/20">
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {mockMessages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-white/10 bg-[#141432]/50">
            <div className="relative flex items-center">
              <div className="absolute left-4 flex items-center gap-2 text-[#b8b8d4]">
                <button type="button" className="hover:text-[#00d2d3] transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button type="button" className="hover:text-[#00d2d3] transition-colors">
                  <Mic className="h-5 w-5" />
                </button>
              </div>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-24 pr-16 focus:outline-none focus:ring-2 focus:ring-[#00d2d3]/30 focus:border-[#00d2d3]/50 transition-all text-sm text-white placeholder:text-[#b8b8d4]"
                placeholder="Ask me anything..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 size-10 bg-gradient-to-tr from-[#6c5ce7] to-[#00d2d3] rounded-xl flex items-center justify-center text-white shadow-lg hover:brightness-110 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ─── Right: Tools & Insights ───────────────────────────── */}
        <section className="space-y-8">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className={`p-5 rounded-2xl transition-all group cursor-pointer bg-[rgba(20,20,50,0.7)] backdrop-blur-xl border border-white/10 ${action.hoverColor}`}
              >
                <div className={`mb-3 ${action.iconColor} group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h4 className="font-bold mb-1">{action.title}</h4>
                <p className="text-xs text-[#b8b8d4] mb-4">{action.description}</p>
                <button
                  type="button"
                  className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Start
                </button>
              </div>
            ))}
          </div>

          {/* AI Insights Card */}
          <div className="p-6 rounded-2xl bg-[rgba(20,20,50,0.7)] backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🧠</span>
              <h3 className="text-xl font-bold">Your Insights This Week</h3>
            </div>
            <ul className="space-y-4">
              {insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3">
                  {insight.icon}
                  <p className="text-sm text-slate-300">{insight.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Productivity Flow */}
          <div className="p-6 rounded-2xl relative overflow-hidden bg-[rgba(20,20,50,0.7)] backdrop-blur-xl border border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#b8b8d4] mb-6">
              Productivity Flow
            </h4>
            <div className="flex items-end justify-between h-32 gap-2 px-2">
              {barHeights.map((height, i) => (
                <div key={i} className={`w-full ${barColors[i]} rounded-t-sm`} style={{ height }} />
              ))}
            </div>
            <div className="grid grid-cols-2 mt-6 pt-6 border-t border-white/5 gap-4">
              <div>
                <p className="text-[10px] text-[#b8b8d4] uppercase">Best Day</p>
                <p className="text-lg font-bold text-[#00d2d3]">Tuesday</p>
              </div>
              <div>
                <p className="text-[10px] text-[#b8b8d4] uppercase">Avg Tasks/Day</p>
                <p className="text-lg font-bold">8.5</p>
              </div>
            </div>
          </div>

          {/* Suggested Templates */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#b8b8d4] px-2">
              Suggested Templates
            </h4>
            <div className="p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors bg-[rgba(20,20,50,0.7)] backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-[#6c5ce7]/20 flex items-center justify-center text-[#6c5ce7] group-hover:bg-[#6c5ce7] group-hover:text-white transition-all">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Deep Work Morning Block</h5>
                  <p className="text-xs text-[#b8b8d4]">08:00 - 11:00 AM • High Focus</p>
                </div>
              </div>
              <button type="button" className="text-xs font-bold text-[#6c5ce7] hover:text-white transition-colors">
                Apply Template
              </button>
            </div>
            <div className="p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors bg-[rgba(20,20,50,0.7)] backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-[#ff6b6b]/20 flex items-center justify-center text-[#ff6b6b] group-hover:bg-[#ff6b6b] group-hover:text-white transition-all">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Afternoon Energy Boost</h5>
                  <p className="text-xs text-[#b8b8d4]">03:00 - 04:30 PM • Movement</p>
                </div>
              </div>
              <button type="button" className="text-xs font-bold text-[#ff6b6b] hover:text-white transition-colors">
                Apply Template
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6c5ce7]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00d2d3]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  )
}
