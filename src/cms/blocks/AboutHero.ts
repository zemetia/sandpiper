import type { Block } from 'payload';

import { accentHeading, stampGroup } from './storyIcons';

export const AboutHero: Block = {
  slug: 'aboutHero',
  interfaceName: 'AboutHeroBlock',
  labels: { singular: 'About hero', plural: 'About heroes' },
  admin: { group: 'About page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Copy',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              admin: { placeholder: 'ABOUT US · RITTENHOUSE SQUARE, PHILADELPHIA' },
            },
            accentHeading('Welcome to\n*Sandpiper*\nCafe!'),
            { name: 'body', type: 'textarea' },
            {
              name: 'tags',
              type: 'text',
              hasMany: true,
              admin: { description: 'Outlined pills under the intro. Press Enter after each.' },
            },
          ],
        },
        {
          label: 'Photos & stamp',
          fields: [
            {
              name: 'polaroids',
              type: 'array',
              maxRows: 2,
              labels: { singular: 'Polaroid', plural: 'Polaroids' },
              admin: { description: 'Two tilted polaroids with a handwritten caption.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                    { name: 'caption', type: 'text', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            stampGroup('Round blue stamp between the polaroids.', [
              'FAMILY',
              'OWNED',
              '& OPERATED',
            ]),
          ],
        },
      ],
    },
  ],
};
