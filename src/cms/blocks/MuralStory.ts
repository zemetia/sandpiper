import type { Block } from 'payload';

import { link } from '../fields/link';

export const MuralStory: Block = {
  slug: 'muralStory',
  interfaceName: 'MuralStoryBlock',
  labels: { singular: 'Mural story', plural: 'Mural stories' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingBold',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'Drawn by hand,' },
        },
        {
          name: 'headingLight',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'made by hand.' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Wide mural photo — runs edge to edge.' },
    },
    {
      name: 'callouts',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Magnifier', plural: 'Magnifiers' },
      admin: { components: { RowLabel: '/cms/admin/RowLabel#CaptionRowLabel' } },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    { name: 'body', type: 'textarea', localized: true, label: 'Speech bubble text' },
    link({ appearances: false, required: false }),
  ],
};
