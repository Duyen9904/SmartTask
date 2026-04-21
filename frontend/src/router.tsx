import type { ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RoomListView } from './features/rooms/ui/RoomListView'
import { CallHubView } from './features/social/ui/CallHubView'
import { ChatHubView } from './features/social/ui/ChatHubView'
import { FindFriendsView } from './features/social/ui/FindFriendsView'
import { SocialHubView } from './features/social/ui/SocialHubView'
import { AIAssistantPage } from './features/ai/ui/AIAssistantPage'
import { StitchDashboardLayout } from './layouts/StitchDashboardLayout'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignupPage } from './pages/SignupPage'
import { RoomPage } from './pages/RoomPage'
import { SocialPage } from './pages/SocialPage'
import { TasksPage } from './pages/TasksPage'
const requireAuth = (element: ReactNode) => <ProtectedRoute>{element}</ProtectedRoute>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard',
    element: requireAuth(<StitchDashboardLayout />),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'tasks', element: <TasksPage /> },
      {
        path: 'social',
        element: <SocialPage />,
        children: [
          { index: true, element: <SocialHubView /> },
          { path: 'find', element: <FindFriendsView /> },
        ],
      },
      { path: 'rooms', element: <RoomListView /> },
      { path: 'rooms/:roomId', element: <RoomPage /> },
      { path: 'ai', element: <AIAssistantPage /> },
    ],
  },
  {
    path: '/chat',
    element: requireAuth(<ChatHubView />),
  },
  {
    path: '/calls',
    element: requireAuth(<CallHubView />),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
