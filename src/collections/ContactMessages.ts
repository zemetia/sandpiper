import type { CollectionConfig, Endpoint } from 'payload';

import { isAuthenticated } from '../cms/access';
import { contactMessageSchema } from '../lib/validations/contact';

/** Public form on /contact. A filled honeypot (`website`) is accepted and silently dropped. */
const submitEndpoint: Endpoint = {
  path: '/submit',
  method: 'post',
  handler: async (req) => {
    const body: unknown = await req.json?.().catch(() => null);
    if (body && typeof body === 'object' && 'website' in body && body.website) {
      return Response.json({ ok: true });
    }
    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: 'Invalid request' }, { status: 400 });

    await req.payload.create({
      collection: 'contact-messages',
      data: { ...parsed.data, email: parsed.data.email.toLowerCase(), status: 'new' },
      overrideAccess: true,
    });
    return Response.json({ ok: true });
  },
};

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: { singular: 'Contact message', plural: 'Contact messages' },
  admin: {
    group: 'Site',
    useAsTitle: 'name',
    defaultColumns: ['name', 'topic', 'email', 'status', 'createdAt'],
    description: 'Messages sent from the contact page form.',
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  endpoints: [submitEndpoint],
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '33%' } },
        { name: 'phone', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'topic', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
};
