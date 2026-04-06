import type { ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { StitchDashboardLayout } from './layouts/StitchDashboardLayout'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignupPage } from './pages/SignupPage'
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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
