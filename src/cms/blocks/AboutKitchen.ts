import type { Block } from 'payload';

import { accentHeading, stampGroup, storyIconField } from './storyIcons';

export const AboutKitchen: Block = {
  slug: 'aboutKitchen',
  interfaceName: 'AboutKitchenBlock',
  labels: { singular: 'Kitchen & bar', plural: 'Kitchen & bar blocks' },
  admin: { group: 'About page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Copy',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { placeholder: 'FROM THE KITCHEN & THE BAR' } },
            accentHeading('Prepared with care,\n*plate by plate.*'),
            { name: 'body', type: 'textarea' },
            {
              name: 'pillars',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Pillar', plural: 'Pillars' },
              admin: { description: 'Numbered rows under the body.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', required: true, admin: { width: '35%' } },
                    { name: 'description', type: 'text', admin: { width: '40%' } },
                    storyIconField({ admin: { width: '25%' } }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Photos & seal',
          fields: [
            {
              name: 'photos',
              type: 'group',
              admin: { description: 'A tall photo, a round one and a small tilted one.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'main', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                    { name: 'round', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                    { name: 'small', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                  ],
                },
              ],
            },
            stampGroup('Round yellow seal over the photos.', ['PROUDLY', 'Lavazza', 'POURING']),
          ],
        },
      ],
    },
  ],
};
