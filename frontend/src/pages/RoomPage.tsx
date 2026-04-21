import { useParams, Navigate } from 'react-router-dom'
import { roomsMock } from '../features/rooms/model/roomMockData'
import { TaskRoomView } from '../features/rooms/ui/TaskRoomView'

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const room = roomsMock.find((r) => r.id === roomId)

  if (!room) return <Navigate to="/rooms" replace />

  return (
    <TaskRoomView
      roomName={room.name}
      subtitle={room.subtitle}
      roomNumber={room.roomNumber}
      priority={room.priority}
      deadline={room.deadline}
      members={room.members}
    />
  )
}
