import { Hash, Search, SquarePen } from 'lucide-react'
import { useState } from 'react'
import type { Conversation, ConversationType } from '../../model/chatTypes'

const filterTabs: { label: string; value: ConversationType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Direct', value: 'direct' },
  { label: 'Groups', value: 'group' },
  { label: 'Channels', value: 'channel' },
]

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const [filter, setFilter] = useState<ConversationType | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = conversations.filter((c) => {
    if (filter !== 'all' && c.type !== filter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <aside className="w-80 shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Chats</h2>
        <button
          id="new-chat-btn"
          className="w-9 h-9 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
        >
          <SquarePen className="h-4 w-4 text-primary" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="chat-search"
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 pb-3 flex gap-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
              filter === tab.value
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={[
              'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all',
              activeId === conv.id
                ? 'bg-primary/15'
                : 'hover:bg-white/5',
            ].join(' ')}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              {conv.type === 'channel' ? (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Hash className="h-4 w-4 text-primary" />
                </div>
              ) : (
                <img
                  src={conv.avatarUrl}
                  alt={conv.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              {conv.type === 'direct' && conv.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#121222]" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white truncate">{conv.name}</span>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                  {conv.lastMessageTime}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
            </div>

            {/* Unread badge */}
            {conv.unreadCount > 0 && (
              <span className="shrink-0 min-w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white px-1.5">
                {conv.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  )
}
