import {
  activityFeedMock,
  aiInsightMock,
  huddleMock,
  sharedChecklistMock,
} from '../model/roomMockData'
import type {
  ActivityFeedItem,
  AIInsight,
  HuddleInfo,
  RoomMember,
  SharedChecklistItem,
} from '../model/roomTypes'
import { RoomActivityPanel } from './components/RoomActivityPanel'
import { RoomWorkspace } from './components/RoomWorkspace'

export function TaskRoomView({
  roomName,
  subtitle,
  roomNumber,
  priority,
  deadline,
  members,
  checklist = sharedChecklistMock,
  activityFeed = activityFeedMock,
  aiInsight = aiInsightMock,
  huddle = huddleMock,
}: {
  roomName: string
  subtitle: string
  roomNumber: string
  priority: 'high' | 'medium' | 'low'
  deadline: string
  members: RoomMember[]
  checklist?: SharedChecklistItem[]
  activityFeed?: ActivityFeedItem[]
  aiInsight?: AIInsight
  huddle?: HuddleInfo
}) {
  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#0a0e14] overflow-hidden -mx-6 -my-6">
      {/* Main workspace */}
      <RoomWorkspace
        roomName={roomName}
        roomNumber={roomNumber}
        priority={priority}
        deadline={deadline}
        memberCount={members.length}
        checklist={checklist}
        aiInsight={aiInsight}
        huddle={huddle}
      />

      {/* Right activity panel */}
      <RoomActivityPanel
        activityFeed={activityFeed}
        members={members}
      />
    </div>
  )
}
