import type { CateringRequestInput } from '@/lib/validations/catering';

import { apiClient } from './client';

/** Catering quote form — handled by the `catering-requests` collection's `/submit` endpoint. */
export const cateringService = {
  requestQuote: (data: CateringRequestInput & { website?: string }): Promise<{ ok: true }> =>
    apiClient.post<{ ok: true }>('/api/catering-requests/submit', data),
};
