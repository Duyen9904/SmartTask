import { MoreVertical, Phone, Pin, Search, Send, Smile, Video, Plus } from 'lucide-react'
import type { ChatMessage } from '../../model/chatTypes'

export function MessageArea({
  messages,
  contactName,
  contactAvatar,
  isOnline,
  isTyping,
}: {
  messages: ChatMessage[]
  contactName: string
  contactAvatar: string
  isOnline: boolean
  isTyping: boolean
}) {
  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/10 px-5 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <img src={contactAvatar} alt={contactName} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h3 className="text-sm font-bold text-white">{contactName}</h3>
            <span className={`text-[11px] font-medium ${isOnline ? 'text-emerald-400' : 'text-muted-foreground'}`}>
              {isOnline ? '● Online' : '○ Offline'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, Pin, Search, MoreVertical].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Date separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Today</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
          >
            {!msg.isOwn && (
              <img
                src={msg.senderAvatarUrl}
                alt={msg.senderName}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
              />
            )}

            <div className={`max-w-md space-y-1 ${msg.isOwn ? 'items-end' : ''}`}>
              <div
                className={[
                  'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                  msg.isOwn
                    ? 'bg-primary/80 text-white rounded-br-md'
                    : 'bg-white/5 text-white/90 border border-white/10 rounded-bl-md',
                ].join(' ')}
              >
                {msg.content}
              </div>

              {/* Attachment */}
              {msg.attachmentUrl && msg.attachmentType === 'image' && (
                <img
                  src={msg.attachmentUrl}
                  alt="Shared attachment"
                  className="rounded-xl max-w-xs border border-white/10 mt-1"
                />
              )}

              {/* Reactions */}
              {msg.reactions && msg.reactions.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.reactions.map((r, i) => (
                    <span
                      key={i}
                      className={[
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border',
                        r.reactedByMe
                          ? 'bg-primary/20 border-primary/40 text-white'
                          : 'bg-white/5 border-white/10 text-muted-foreground',
                      ].join(' ')}
                    >
                      {r.emoji} {r.count}
                    </span>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div className={`flex items-center gap-1.5 ${msg.isOwn ? 'justify-end' : ''}`}>
                <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                {msg.isOwn && (
                  <span className="text-[10px] text-muted-foreground">· READ</span>
                )}
              </div>
            </div>

            {msg.isOwn && (
              <img
                src={msg.senderAvatarUrl}
                alt={msg.senderName}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
              />
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-xs uppercase tracking-wider">{contactName} is typing...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-white/10 px-4 py-3 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
            <Plus className="h-5 w-5" />
          </button>
          <input
            id="chat-message-input"
            type="text"
            placeholder={'AI Command: "Summarize today\'s chat"...'}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
            <Smile className="h-5 w-5" />
          </button>
          <button
            id="chat-send-btn"
            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors shadow-lg shadow-primary/25"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
