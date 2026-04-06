import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from './authApi'
import { normalizeAuthSession } from '../lib/sessionMapper'
import { useAppDispatch } from '@/store/hooks'
import { setCredentials } from '@/store/authSlice'
import type { LoginPayload } from '../model/authTypes'

export function useLoginMutation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (session) => {
      dispatch(setCredentials(normalizeAuthSession(session)))
      navigate('/dashboard', { replace: true })
    },
  })
}
