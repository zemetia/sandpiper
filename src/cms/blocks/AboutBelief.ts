import type { Block } from 'payload';

import { accentHeading } from './storyIcons';

export const AboutBelief: Block = {
  slug: 'aboutBelief',
  interfaceName: 'AboutBeliefBlock',
  labels: { singular: 'Our belief', plural: 'Our belief blocks' },
  admin: { group: 'About page' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { placeholder: 'OUR BELIEF' } },
    accentHeading('Built on the belief that everyone deserves\n*something better.*'),
    { name: 'body', type: 'textarea' },
    { name: 'note', type: 'text', admin: { description: 'Handwritten note under the body.' } },
    {
      name: 'plates',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Plate', plural: 'Plates' },
      admin: { description: 'Staggered photo strip — four reads best.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '34%' } },
            { name: 'name', type: 'text', required: true, admin: { width: '33%' } },
            { name: 'tag', type: 'text', admin: { width: '33%', placeholder: 'ALL DAY' } },
          ],
        },
      ],
    },
  ],
};
