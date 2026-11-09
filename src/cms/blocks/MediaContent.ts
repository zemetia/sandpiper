import type { Block } from 'payload';

import { linkGroup } from '../fields/link';

export const MediaContent: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Image left', value: 'left' },
            { label: 'Image right', value: 'right' },
          ],
          admin: { width: '50%' },
        },
        { name: 'eyebrow', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'body', type: 'richText', localized: true },
    linkGroup('links', 1),
  ],
};
