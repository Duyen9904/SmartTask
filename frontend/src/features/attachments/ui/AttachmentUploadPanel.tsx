import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { canUploadFile } from '../lib/uploadValidation'
import { attachmentService } from '../api/attachmentsApi'
export function AttachmentUploadPanel() {
  const [status, setStatus] = useState('')

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const validation = canUploadFile(file)
    if (!validation.valid) {
      setStatus(validation.message)
      return
    }

    setStatus('Requesting upload URL...')
    try {
      const upload = await attachmentService.requestUploadUrl({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        entityType: 'TASK',
        entityId: 'placeholder-task-id',
      })

      await fetch(upload.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      })

      await attachmentService.confirmUpload({
        objectKey: upload.objectKey,
        entityType: 'TASK',
        entityId: 'placeholder-task-id',
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        sizeBytes: file.size,
      })

      setStatus('Upload completed.')
    } catch {
      setStatus('Upload failed.')
    }
  }

  return (
    <section className="card">
      <h3>Attachment Upload</h3>
      <input type="file" onChange={onSelectFile} />
      <p>{status}</p>
    </section>
  )
}
