import { useState, useCallback } from 'react'
import { attachmentService } from './attachmentsApi'
import { canUploadFile } from '../lib/uploadValidation'

export type UploadState = 'idle' | 'requesting' | 'uploading' | 'confirming' | 'done' | 'error'

export type UploadedFile = {
  fileName: string
  objectKey: string
  contentType: string
  sizeBytes: number
}

export function useAttachmentUpload(entityType: string, entityId: string) {
  const [state, setState] = useState<UploadState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [progress, setProgress] = useState(0)

  const upload = useCallback(async (file: File) => {
    const validation = canUploadFile(file)
    if (!validation.valid) {
      setError(validation.message)
      setState('error')
      return null
    }

    try {
      setError(null)
      setProgress(0)

      // Step 1: Request presigned URL
      setState('requesting')
      const contentType = file.type || 'application/octet-stream'
      const result = await attachmentService.requestUploadUrl({
        fileName: file.name,
        contentType,
        entityType,
        entityId,
      })
      setProgress(25)

      // Step 2: Upload to presigned URL
      setState('uploading')
      await fetch(result.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      })
      setProgress(75)

      // Step 3: Confirm upload
      setState('confirming')
      await attachmentService.confirmUpload({
        objectKey: result.objectKey,
        entityType,
        entityId,
        fileName: file.name,
        contentType,
        sizeBytes: file.size,
      })
      setProgress(100)

      const uploaded: UploadedFile = {
        fileName: file.name,
        objectKey: result.objectKey,
        contentType,
        sizeBytes: file.size,
      }

      setUploadedFiles((prev) => [...prev, uploaded])
      setState('done')

      // Reset to idle after a short delay
      setTimeout(() => {
        setState('idle')
        setProgress(0)
      }, 2000)

      return uploaded
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setState('error')
      setProgress(0)
      return null
    }
  }, [entityType, entityId])

  const reset = useCallback(() => {
    setState('idle')
    setError(null)
    setProgress(0)
  }, [])

  return {
    state,
    error,
    progress,
    uploadedFiles,
    upload,
    reset,
    isUploading: state === 'requesting' || state === 'uploading' || state === 'confirming',
  }
}
