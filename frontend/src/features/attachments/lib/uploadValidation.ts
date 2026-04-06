export const canUploadFile = (file: File) => {
  const maxBytes = 10 * 1024 * 1024
  if (file.size > maxBytes) {
    return { valid: false, message: 'File must be <= 10MB' }
  }
  return { valid: true, message: '' }
}
