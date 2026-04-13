import { NavLink } from 'react-router-dom'
import { Rss, UserPlus } from 'lucide-react'

const tabs = [
  { to: '/dashboard/social', label: 'Feed', icon: Rss, end: true },
  { to: '/dashboard/social/find', label: 'Find Friends', icon: UserPlus, end: false },
] as const

export function SocialTabSwitcher() {
  return (
    <nav className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl w-fit">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            [
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
              isActive
                ? 'bg-primary/20 text-white'
                : 'text-muted-foreground hover:text-white hover:bg-white/5',
            ].join(' ')
          }
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

