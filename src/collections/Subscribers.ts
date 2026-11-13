import type { CollectionConfig, Endpoint } from 'payload';
import { z } from 'zod';

import { isAuthenticated } from '../cms/access';

const bodySchema = z.object({ email: z.email().max(254), locale: z.enum(['en', 'id']).optional() });

/** Public sign-up. Already-subscribed emails succeed silently so the form never leaks who is on the list. */
const subscribeEndpoint: Endpoint = {
  path: '/subscribe',
  method: 'post',
  handler: async (req) => {
    const parsed = bodySchema.safeParse(await req.json?.().catch(() => null));
    if (!parsed.success) return Response.json({ error: 'Invalid email' }, { status: 400 });

    const email = parsed.data.email.toLowerCase();
    const { totalDocs } = await req.payload.count({
      collection: 'subscribers',
      where: { email: { equals: email } },
      overrideAccess: true,
    });
    if (totalDocs === 0) {
      await req.payload.create({
        collection: 'subscribers',
        data: { email, locale: parsed.data.locale ?? 'en' },
        overrideAccess: true,
      });
    }
    return Response.json({ ok: true });
  },
};

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Subscriber', plural: 'Subscribers' },
  admin: {
    group: 'Site',
    useAsTitle: 'email',
    defaultColumns: ['email', 'locale', 'createdAt'],
    description: 'People who signed up for specials from the footer form.',
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  endpoints: [subscribeEndpoint],
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Bahasa Indonesia', value: 'id' },
      ],
    },
  ],
};
