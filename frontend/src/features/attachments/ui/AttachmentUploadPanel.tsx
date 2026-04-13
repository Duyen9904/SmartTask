import React, { type ChangeEvent } from 'react'
import { Upload, FileCheck, AlertCircle, X, Paperclip } from 'lucide-react'
import { useAttachmentUpload } from '../api/useAttachmentUpload'

type AttachmentUploadPanelProps = {
  taskId: string
  /** Optional label override */
  label?: string
}

export function AttachmentUploadPanel({ taskId, label = 'Proof / Attachments' }: AttachmentUploadPanelProps) {
  const { state, error, progress, uploadedFiles, upload, isUploading, reset } = useAttachmentUpload('TASK', taskId)
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    upload(file)
  }

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    handleFile(file)
    // Reset the input so same file can be re-uploaded
    event.target.value = ''
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  const statusLabel: Record<string, string> = {
    requesting: 'Requesting upload URL...',
    uploading: 'Uploading file...',
    confirming: 'Confirming upload...',
    done: 'Upload completed!',
  }

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
        <Paperclip className="h-3.5 w-3.5" />
        {label}
      </h4>

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={[
          'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all',
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-white/10 hover:border-primary/30 hover:bg-white/[0.02]',
          isUploading ? 'pointer-events-none opacity-60' : '',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={onSelectFile}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip"
        />

        <Upload className={[
          'h-8 w-8 mx-auto mb-2 transition-colors',
          isDragOver ? 'text-primary' : 'text-slate-500',
        ].join(' ')} />

        <p className="text-sm text-slate-400">
          {isDragOver
            ? <span className="text-primary font-bold">Drop file here</span>
            : <>
                <span className="text-white font-medium">Click to upload</span> or drag and drop
              </>
          }
        </p>
        <p className="text-[10px] text-slate-500 mt-1">Max 10MB · Images, PDF, Documents</p>
      </div>

      {/* Progress bar */}
      {isUploading && (
        <div className="space-y-1.5">
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">{statusLabel[state] ?? 'Processing...'}</p>
        </div>
      )}

      {/* Success message */}
      {state === 'done' && (
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
          <FileCheck className="h-3.5 w-3.5" />
          Upload completed!
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between gap-2 bg-red-500/10 text-red-400 text-xs font-medium rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </div>
          <button type="button" onClick={reset} className="hover:text-white transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-1.5">
          {uploadedFiles.map((f) => (
            <div
              key={f.objectKey}
              className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 text-xs text-slate-300"
            >
              <FileCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate flex-1">{f.fileName}</span>
              <span className="text-slate-500 flex-shrink-0">{(f.sizeBytes / 1024).toFixed(0)} KB</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
