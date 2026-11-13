import type { CollectionConfig, Endpoint } from 'payload';

import { isAuthenticated } from '../cms/access';
import { cateringRequestSchema } from '../lib/validations/catering';

/** Public quote form on /catering. A filled honeypot (`website`) is accepted and silently dropped. */
const submitEndpoint: Endpoint = {
  path: '/submit',
  method: 'post',
  handler: async (req) => {
    const body: unknown = await req.json?.().catch(() => null);
    if (body && typeof body === 'object' && 'website' in body && body.website) {
      return Response.json({ ok: true });
    }
    const parsed = cateringRequestSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: 'Invalid request' }, { status: 400 });
    const { eventDate, email, ...rest } = parsed.data;

    await req.payload.create({
      collection: 'catering-requests',
      data: {
        ...rest,
        email: email.toLowerCase(),
        // Noon UTC keeps the calendar day stable in every admin timezone.
        ...(eventDate ? { eventDate: `${eventDate}T12:00:00.000Z` } : {}),
        status: 'new',
      },
      overrideAccess: true,
    });
    return Response.json({ ok: true });
  },
};

export const CateringRequests: CollectionConfig = {
  slug: 'catering-requests',
  labels: { singular: 'Catering request', plural: 'Catering requests' },
  admin: {
    group: 'Site',
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventDate', 'headcount', 'fulfillment', 'status', 'createdAt'],
    description: 'Quote requests sent from the catering page form.',
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
    {
      type: 'row',
      fields: [
        {
          name: 'eventDate',
          type: 'date',
          admin: { width: '33%', date: { pickerAppearance: 'dayOnly' } },
        },
        { name: 'headcount', type: 'number', min: 1, admin: { width: '33%' } },
        { name: 'budget', type: 'text', admin: { width: '33%', description: 'Per person.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'occasion', type: 'text', admin: { width: '50%' } },
        {
          name: 'fulfillment',
          type: 'select',
          defaultValue: 'pickup',
          options: [
            { label: 'Pickup', value: 'pickup' },
            { label: 'Delivery', value: 'delivery' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'notes', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Booked', value: 'booked' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Bahasa Indonesia', value: 'id' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
};
