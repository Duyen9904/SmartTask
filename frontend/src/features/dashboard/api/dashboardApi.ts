import type { PhotoProofDto } from '../model/dashboardApiTypes'

// UI-first placeholder service.
// When backend endpoints are ready, replace these stubs with `httpClient` calls.
export const dashboardService = {
  // Expected to be sourced from the attachments subsystem (photo proofs).
  // Placeholder endpoint:
  //   GET /dashboard/photo-proofs/recent
  async listRecentPhotoProofs(): Promise<PhotoProofDto[]> {
    return []
  },
}

