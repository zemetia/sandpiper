import type { Block } from 'payload';

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'quotes',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { components: { RowLabel: '/cms/admin/RowLabel#QuoteRowLabel' } },
      fields: [
        { name: 'quote', type: 'textarea', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'source',
              type: 'text',
              admin: { width: '50%', placeholder: 'Google review, Instagram…' },
            },
          ],
        },
      ],
    },
  ],
};
