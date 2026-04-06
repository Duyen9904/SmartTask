import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from './authApi'
import { useAppDispatch } from '@/store/hooks'
import { clearCredentials } from '@/store/authSlice'

export function useLogoutMutation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      dispatch(clearCredentials())
      queryClient.clear()
      navigate('/login', { replace: true })
    },
  })
}
