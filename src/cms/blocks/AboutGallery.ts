import type { Block } from 'payload';

export const AboutGallery: Block = {
  slug: 'aboutGallery',
  interfaceName: 'AboutGalleryBlock',
  labels: { singular: 'Photo gallery (About)', plural: 'Photo galleries (About)' },
  admin: { group: 'About page' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { width: '30%', placeholder: 'GALLERY' } },
        { name: 'heading', type: 'text', admin: { width: '40%' } },
        {
          name: 'note',
          type: 'text',
          admin: { width: '30%', description: 'Handwritten note beside the heading.' },
        },
      ],
    },
    {
      name: 'photos',
      type: 'array',
      maxRows: 7,
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: {
        description: 'First three fill the top row, the rest the bottom row (seven reads best).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { width: '50%' },
            },
            { name: 'caption', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
};
