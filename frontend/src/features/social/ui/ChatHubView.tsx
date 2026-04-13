import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  activeContactMock,
  conversationsMock,
  messagesMock,
} from '../model/chatMockData'
import { ChatInfoSidebar } from './components/ChatInfoSidebar'
import { ConversationList } from './components/ConversationList'
import { MessageArea } from './components/MessageArea'

export function ChatHubView() {
  const [activeId, setActiveId] = useState(conversationsMock[0].id)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-[#0c0c1d] overflow-hidden">
      {/* Navigation rail */}
      <div className="w-16 shrink-0 bg-black/30 border-r border-white/5 flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => navigate('/dashboard/social')}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-extrabold text-primary">S</span>
        </div>
      </div>

      {/* Left: Conversation list */}
      <ConversationList
        conversations={conversationsMock}
        activeId={activeId}
        onSelect={setActiveId}
      />

      {/* Center: Message area */}
      <MessageArea
        messages={messagesMock}
        contactName={activeContactMock.name}
        contactAvatar={activeContactMock.avatarUrl}
        isOnline={activeContactMock.isOnline}
        isTyping={true}
      />

      {/* Right: Info sidebar */}
      <ChatInfoSidebar contact={activeContactMock} />
    </div>
  )
}
