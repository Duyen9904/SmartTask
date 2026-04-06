export type ApiError = {
  field?: string
  message: string
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
  errors?: ApiError[]
  timestamp: string
}

export type PagedApiResponse<T> = {
  success: boolean
  message: string
  content: T[]
  page: number
  size: number
  totalPages: number
  totalElements: number
  timestamp: string
}

export type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string
}
