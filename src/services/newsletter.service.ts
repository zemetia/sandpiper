import { apiClient } from './client';

/** Footer sign-up — handled by the `subscribers` collection's `/subscribe` endpoint. */
export const newsletterService = {
  subscribe: (email: string): Promise<{ ok: true }> =>
    apiClient.post<{ ok: true }>('/api/subscribers/subscribe', { email }),
};
