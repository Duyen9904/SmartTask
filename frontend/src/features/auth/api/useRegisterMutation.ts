import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from './authApi'
import { normalizeAuthSession } from '../lib/sessionMapper'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials } from '@/store/authSlice'
import type { RegisterPayload } from '../model/authTypes'

export function useRegisterMutation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (session) => {
      dispatch(setCredentials(normalizeAuthSession(session)))
      navigate('/dashboard', { replace: true })
    },
  })
}
