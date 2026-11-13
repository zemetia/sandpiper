import type { Block } from 'payload';

import { link } from '../fields/link';

export const GramWall: Block = {
  slug: 'gramWall',
  interfaceName: 'GramWallBlock',
  labels: { singular: 'Instagram wall', plural: 'Instagram walls' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'handle',
          type: 'text',
          required: true,
          admin: { width: '50%', placeholder: '@sandpiper.philly' },
        },
        {
          name: 'subline',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: '1,000+ neighbors already follow along' },
        },
      ],
    },
    { ...link({ appearances: false, required: false }), label: 'Follow button' },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      maxRows: 6,
      admin: { isSortable: true, description: 'Up to six photos, shown as taped polaroids.' },
    },
  ],
};
