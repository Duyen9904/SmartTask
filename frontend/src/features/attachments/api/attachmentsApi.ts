import type {
  ConfirmUploadPayload,
  PresignedUrlResult,
  RequestUploadUrlPayload,
} from '../model/attachmentTypes'
import { httpClient } from '@/lib/httpClient'

export const attachmentService = {
  requestUploadUrl: (payload: RequestUploadUrlPayload) =>
    httpClient.post<PresignedUrlResult>('/attachments/upload-url', payload),
  confirmUpload: (payload: ConfirmUploadPayload) =>
    httpClient.post<void>('/attachments/confirm', payload),
  getDownloadUrl: (attachmentId: string) =>
    httpClient.get<{ downloadUrl: string }>(`/attachments/${attachmentId}/download-url`),
}
