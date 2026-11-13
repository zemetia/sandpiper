import type { Block } from 'payload';

export const ReviewThread: Block = {
  slug: 'reviewThread',
  interfaceName: 'ReviewThreadBlock',
  labels: { singular: 'Review thread', plural: 'Review threads' },
  admin: { group: 'Landing page' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      localized: true,
      admin: { rows: 2, description: 'Line breaks are kept.' },
    },
    {
      name: 'ratings',
      type: 'array',
      maxRows: 4,
      admin: { components: { RowLabel: '/cms/admin/RowLabel#RatingRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'score',
              type: 'text',
              required: true,
              admin: { width: '40%', placeholder: '4.8' },
            },
            {
              name: 'platform',
              type: 'text',
              required: true,
              admin: { width: '60%', placeholder: 'Google' },
            },
          ],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { components: { RowLabel: '/cms/admin/RowLabel#QuoteRowLabel' } },
      fields: [
        { name: 'quote', type: 'textarea', localized: true },
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'text', required: true, admin: { width: '35%' } },
            {
              name: 'source',
              type: 'text',
              admin: { width: '35%', placeholder: 'Google, Yelp…' },
            },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'paper',
              options: [
                { label: 'White', value: 'paper' },
                { label: 'Blue (hero quote)', value: 'blue' },
                { label: 'Yellow', value: 'sunny' },
              ],
              admin: { width: '30%' },
            },
          ],
        },
      ],
    },
  ],
};
