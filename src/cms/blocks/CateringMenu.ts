import type { Block } from 'payload';

export const CateringMenu: Block = {
  slug: 'cateringMenu',
  interfaceName: 'CateringMenuBlock',
  labels: { singular: 'Catering menu', plural: 'Catering menus' },
  admin: { group: 'Catering page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: 'THE CATERING MENU' },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'PICK YOUR SPREAD' },
        },
      ],
    },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'categories',
      type: 'array',
      labels: { singular: 'Category', plural: 'Categories' },
      admin: {
        description:
          'Each category is a card, numbered automatically. Cards alternate white and soft yellow.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              admin: { width: '50%', placeholder: 'Breakfast Trays' },
            },
            {
              name: 'shortLabel',
              type: 'text',
              localized: true,
              admin: {
                width: '50%',
                placeholder: 'Breakfast',
                description: 'Phone jump-chip label. Falls back to the title.',
              },
            },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Item', plural: 'Items' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', localized: true, admin: { width: '40%' } },
                {
                  name: 'price',
                  type: 'text',
                  localized: true,
                  admin: { width: '20%', placeholder: '$120' },
                },
                { name: 'description', type: 'text', localized: true, admin: { width: '40%' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      localized: true,
      admin: { description: 'Small print under the cards (leaf icon).' },
    },
  ],
};
