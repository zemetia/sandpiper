import type { ContactMessageInput } from '@/lib/validations/contact';

import { apiClient } from './client';

/** Contact page form — handled by the `contact-messages` collection's `/submit` endpoint. */
export const contactService = {
  send: (data: ContactMessageInput & { website?: string }): Promise<{ ok: true }> =>
    apiClient.post<{ ok: true }>('/api/contact-messages/submit', data),
};
