/* ─── Conversations ──────────────────────────────────────────────── */

export type ConversationType = 'direct' | 'group' | 'channel'

export type Conversation = {
  id: string
  type: ConversationType
  name: string
  avatarUrl: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline?: boolean
  memberCount?: number
}

/* ─── Messages ───────────────────────────────────────────────────── */

export type ChatMessage = {
  id: string
  senderId: string
  senderName: string
  senderAvatarUrl: string
  content: string
  timestamp: string
  isOwn: boolean
  reactions?: MessageReaction[]
  attachmentUrl?: string
  attachmentType?: 'image' | 'file'
}

export type MessageReaction = {
  emoji: string
  count: number
  reactedByMe: boolean
}

/* ─── Contact Info ───────────────────────────────────────────────── */

export type ContactInfo = {
  id: string
  name: string
  title: string
  team: string
  avatarUrl: string
  isOnline: boolean
  sharedMedia: string[]
  sharedFiles: SharedFile[]
}

export type SharedFile = {
  id: string
  name: string
  size: string
  date: string
  icon: 'document' | 'spreadsheet' | 'presentation'
}

/* ─── Call Participants ──────────────────────────────────────────── */

export type CallParticipant = {
  id: string
  name: string
  avatarUrl: string
  isMuted: boolean
  isCameraOff: boolean
  isSpeaking: boolean
}

export type MeetingNote = {
  id: string
  timestamp: string
  content: string
  isAiGenerated: boolean
}

export type InCallMessage = {
  id: string
  senderName: string
  content: string
  timestamp: string
  isAi?: boolean
}
