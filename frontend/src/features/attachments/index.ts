// Attachments feature — public API
export { attachmentService } from './api/attachmentsApi'
export { useAttachmentUpload } from './api/useAttachmentUpload'
export { AttachmentUploadPanel } from './ui/AttachmentUploadPanel'
export type {
  RequestUploadUrlPayload,
  PresignedUrlResult,
  ConfirmUploadPayload,
} from './model/attachmentTypes'
export type { UploadState, UploadedFile } from './api/useAttachmentUpload'

