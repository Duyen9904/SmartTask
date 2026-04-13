import { UsersRound } from 'lucide-react'
import type { SocialGroup } from '../../model/socialTypes'

const statusColors: Record<SocialGroup['status'], string> = {
  Active: 'bg-[#00B894]/15 text-[#00B894]',
  'Deep Work': 'bg-primary/15 text-primary',
  Idle: 'bg-white/10 text-muted-foreground',
}

function GroupRow({ group }: { group: SocialGroup }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <UsersRound className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{group.name}</p>
          <p className="text-[11px] text-muted-foreground">{group.memberCount} Members</p>
        </div>
      </div>
      <span
        className={[
          'text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0',
          statusColors[group.status],
        ].join(' ')}
      >
        {group.status}
      </span>
    </div>
  )
}

export function GroupsList({ groups }: { groups: SocialGroup[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col gap-3">
      <h4 className="text-white font-bold text-sm flex items-center gap-2">
        <UsersRound className="h-4 w-4 text-primary" />
        My Groups
      </h4>

      <div className="divide-y divide-white/5">
        {groups.map((group) => (
          <GroupRow key={group.id} group={group} />
        ))}
      </div>
    </section>
  )
}
