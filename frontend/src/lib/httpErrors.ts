import type { ApiError } from '@/lib/apiTypes'

export class HttpError extends Error {
  readonly status: number
  readonly details?: ApiError[]

  constructor(message: string, status: number, details?: ApiError[]) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.details = details
  }
}
