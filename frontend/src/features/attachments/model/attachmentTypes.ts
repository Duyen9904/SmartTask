export type RequestUploadUrlPayload = {
  fileName: string
  contentType: string
  entityType: string
  entityId: string
}

export type PresignedUrlResult = {
  objectKey: string
  uploadUrl: string
  expiresAt: string
}

export type ConfirmUploadPayload = {
  objectKey: string
  entityType: string
  entityId: string
  fileName: string
  contentType: string
  sizeBytes: number
}
