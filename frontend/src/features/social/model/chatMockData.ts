import type {
  CallParticipant,
  ChatMessage,
  ContactInfo,
  Conversation,
  InCallMessage,
  MeetingNote,
} from './chatTypes'

/* ─── Conversations ──────────────────────────────────────────────── */

export const conversationsMock: Conversation[] = [
  {
    id: 'conv-1',
    type: 'direct',
    name: 'Jordan Diaz',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
    lastMessage: 'The new UI looks incredibl...',
    lastMessageTime: '2:45 PM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'conv-2',
    type: 'direct',
    name: 'Sarah Wilson',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
    lastMessage: 'Sent a file: project_brief_v2.pdf',
    lastMessageTime: '1:12 PM',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'conv-3',
    type: 'group',
    name: 'Design Masters Group',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
    lastMessage: "Mike: Let's review the assets at 5.",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    memberCount: 12,
  },
  {
    id: 'conv-4',
    type: 'direct',
    name: 'Elena Lopez',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
    lastMessage: 'Catch up later today?',
    lastMessageTime: 'Tue',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'conv-5',
    type: 'channel',
    name: '#product-updates',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsKtCPzzLSidJVxYY6u4LV4VZs2ymVYn9dnTZBYG92Bw166NaLz6F7gvXIByijkS1JxrXWR6--1q3AVVRC3LcFleqR01AE7DRw064tQjzf9FTL59hY6_eTNEWdsWOWU3V-xvDw-bzbiFzl1YIHgPSQHOdoczyd_63eWRAqXctoNxoqtyYOGwpfTik7I7iiN7kGJfgMHqNkEDLxmOUHnIM8CuvDl1W6KTCpJV4L4gGmKfgPnPZAFqy0vilb2L2LSIV98x4PSqb_tvg',
    lastMessage: 'v2.4 shipped 🚀',
    lastMessageTime: 'Mon',
    unreadCount: 5,
    memberCount: 48,
  },
]

/* ─── Messages (for conv-1: Jordan Diaz) ─────────────────────────── */

export const messagesMock: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'jordan',
    senderName: 'Jordan Diaz',
    senderAvatarUrl: conversationsMock[0].avatarUrl,
    content:
      "Hey Alex! Have you seen the latest prototype for the Command Center? I've integrated the new glassmorphism tokens we discussed.",
    timestamp: '12:42 PM',
    isOwn: false,
  },
  {
    id: 'msg-2',
    senderId: 'me',
    senderName: 'Alex Chen',
    senderAvatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
    content:
      'Just checking it out now. The depth of the layers is incredible. The background void (#0A0A1A) really makes the electric indigo pop!',
    timestamp: '12:45 PM',
    isOwn: true,
    reactions: [{ emoji: '🔥', count: 3, reactedByMe: false }],
  },
  {
    id: 'msg-3',
    senderId: 'jordan',
    senderName: 'Jordan Diaz',
    senderAvatarUrl: conversationsMock[0].avatarUrl,
    content:
      'Glad you like it! I think the "Ethereal" vibe is exactly what the productivity space was missing. Here\'s the preview asset.',
    timestamp: '12:46 PM',
    isOwn: false,
    attachmentUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
    attachmentType: 'image',
  },
  {
    id: 'msg-4',
    senderId: 'me',
    senderName: 'Alex Chen',
    senderAvatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
    content:
      "This is stunning! The glassmorphism panels with the indigo glow are chef's kiss. Let's ship this in the next sprint 🚢",
    timestamp: '12:50 PM',
    isOwn: true,
  },
]

/* ─── Contact Info (Jordan Diaz) ─────────────────────────────────── */

export const activeContactMock: ContactInfo = {
  id: 'jordan',
  name: 'Jordan Diaz',
  title: 'Lead Systems Architect',
  team: 'CORE TEAM',
  avatarUrl: conversationsMock[0].avatarUrl,
  isOnline: true,
  sharedMedia: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApv37bXpYzYBCgPl6WVCzDOpLrcGW779xuQvlei2wHJDqQEQJHk-2s8_m9-xqiaNYI2cGrwcGoBGUdZieGIrLDpdGqWiJrggIB9RvnRSGzvvXpvwJOvGRZDYg_MwcJK5EkVUP7objkXC_vSunzKjtok-qRNgH_aOKb0YpDj6_lOYkwveRiJ-jwGtM06tfoZ_maIReLSnmQYaKciOon8ThTAN5gzxUz15TsI-bEtdsfAyOExKXatz4F4lJWmFNd1p3apBQtJ4MSqMhB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsuuB1M6jFKJsQbXeOooKE-ArDgcLgyXkC90cy8Ipi8alMRwxNi1HVnLyfppOgmIqY3nOM8mtDDdKK1qkf2r_cHC8jw-IU91nFjZneFW3gH2esaUr4lt_cHchaQV0HdxVYYAs6SC86juspjfxkSnzNbku6nRR37F3QHUEvh_ONnfYe5txZE4yi5Rt-PjZmvh76ICxC0rYCgVnp2Tb86hnueUx0SsLdBVMLDAfGznjHs-k3ASwFMj0rdwvGcMYfyFyskcMpjO_uPkZN',
  ],
  sharedFiles: [
    { id: 'sf-1', name: 'product_roadmap.pdf', size: '4.2 MB', date: 'OCT 24', icon: 'document' },
    {
      id: 'sf-2',
      name: 'q4_projections.xlsx',
      size: '1.8 MB',
      date: 'OCT 22',
      icon: 'spreadsheet',
    },
  ],
}

/* ─── Call Participants ──────────────────────────────────────────── */

export const callParticipantsMock: CallParticipant[] = [
  {
    id: 'cp-1',
    name: 'Alex Rivera',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7lzgmHHnk80yG8s_fcBI0uzG5MwATgRNJ5dt2c6WZ-kHHTkVhi-e7P-ieui4pGbcv6E8kIUMPuAWvY9jHxXjorqhgH5ZEl2N6teLyeDFrB56W3Qz2fqAOjXkYj748G2dVkWjcbJ_PhKFDZWk_qOREYhF9kwMbBlxm-SkfAhqnEQ2Ogx0Ch12JKelfLYEzTeVhpMqF0sDOloIibEnjH_biftsD3pbmuDwSfsTf_iaGtLBMcc0OFMt6p-k2S62Bj7nyXL61SJ3YESBt',
    isMuted: false,
    isCameraOff: false,
    isSpeaking: true,
  },
  {
    id: 'cp-2',
    name: 'Sarah Chen',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7p2PtVztcNcHiUKe4AO9WgOLy1ZLAb8Tpz98XmMjObgDyuLD8RKqzN3PNJJZT0xusYQrdHnPoDq566E_Uj2Fl-Hks4rGKGlacEC3TCyuzBIyHDNMifM8uxksiit2DlYU4fe6tYYCnDb1DyZu3deKeJwuSypYo7W4gPR1U9wiKH5jKq0hByoMpwt0sosiY2hvO5UlO79X159_KIqVydrahL6H39goL-NuLlrPOB3OtNo4MgfRHmfpoleqihlL0uoERpg8nO_bCQnfm',
    isMuted: true,
    isCameraOff: false,
    isSpeaking: false,
  },
  {
    id: 'cp-3',
    name: 'Marcus Thorne',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPH7CY1h-cItmt0U0i2wnZRMNOEvqH-dRRQadkiew3o7x6yGw57fUBhmrHYTBlnBCeObqZHLeZ4IiGeNqub9_Iz8AxrtD0gbiFErsM71fInWEsL0dDLlBqz3_ues_PSmRikElBWXGsbV23rqms2Vrm1OE0DNW2NcCM3Zr29WuAAjI_b6k6kcODkLQhMjX17iXIYju4UOYVIR5APJ3JuFtDuqjppAPQgx6Z5SObmhKciluuXp58vkDJd0uhsmQEsQly-X7kGQXm9aI',
    isMuted: true,
    isCameraOff: false,
    isSpeaking: false,
  },
  {
    id: 'cp-4',
    name: 'Jordan Kim',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsKtCPzzLSidJVxYY6u4LV4VZs2ymVYn9dnTZBYG92Bw166NaLz6F7gvXIByijkS1JxrXWR6--1q3AVVRC3LcFleqR01AE7DRw064tQjzf9FTL59hY6_eTNEWdsWOWU3V-xvDw-bzbiFzl1YIHgPSQHOdoczyd_63eWRAqXctoNxoqtyYOGwpfTik7I7iiN7kGJfgMHqNkEDLxmOUHnIM8CuvDl1W6KTCpJV4L4gGmKfgPnPZAFqy0vilb2L2LSIV98x4PSqb_tvg',
    isMuted: false,
    isCameraOff: false,
    isSpeaking: false,
  },
]

/* ─── In-Call Chat Messages ──────────────────────────────────────── */

export const inCallMessagesMock: InCallMessage[] = [
  {
    id: 'icm-1',
    senderName: 'Sarah Chen',
    content:
      "Can everyone see the updated backlog in SmartTask? I've moved the UI polish tasks.",
    timestamp: '10:14 AM',
  },
  {
    id: 'icm-2',
    senderName: 'AI Assistant',
    content:
      "Key Insight: Sarah mentioned UI polish tasks. I've highlighted these in your sidebar.",
    timestamp: '10:15 AM',
    isAi: true,
  },
  {
    id: 'icm-3',
    senderName: 'Alex Rivera',
    content: 'Checking now. Looks good to me!',
    timestamp: '10:16 AM',
  },
]

/* ─── AI Meeting Notes ───────────────────────────────────────────── */

export const meetingNotesMock: MeetingNote[] = [
  {
    id: 'mn-1',
    timestamp: '10:05 AM',
    content: 'Sprint Planning meeting started. 4 participants joined.',
    isAiGenerated: true,
  },
  {
    id: 'mn-2',
    timestamp: '10:12 AM',
    content: 'Sarah presented Q4 backlog. 12 tasks need UI polish before release.',
    isAiGenerated: true,
  },
  {
    id: 'mn-3',
    timestamp: '10:18 AM',
    content:
      'Action Item: Alex to review glassmorphism tokens by EOD Wednesday.',
    isAiGenerated: true,
  },
  {
    id: 'mn-4',
    timestamp: '10:25 AM',
    content: 'Marcus proposed new onboarding flow. Team agreed to prototype next week.',
    isAiGenerated: true,
  },
]
