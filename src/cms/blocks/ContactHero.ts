import type { Block } from 'payload';

import { linkGroup } from '../fields/link';
import { accentHeading, stampGroup } from './storyIcons';

export const ContactHero: Block = {
  slug: 'contactHero',
  interfaceName: 'ContactHeroBlock',
  labels: { singular: 'Contact hero', plural: 'Contact heroes' },
  admin: { group: 'Contact page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Copy',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { placeholder: 'CONTACT US · 1640 SOUTH ST' } },
            accentHeading('Say hi to\n*the bird.*'),
            { name: 'body', type: 'textarea' },
            {
              name: 'showCall',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show a "call" button with the phone number from Site settings',
            },
            linkGroup('links', 1),
          ],
        },
        {
          label: 'Hours card',
          fields: [
            {
              name: 'hours',
              type: 'group',
              admin: {
                description: 'White card on the right. Leave the big text empty to hide it.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      admin: { width: '50%', placeholder: 'OPEN EVERY DAY' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      admin: { width: '50%', placeholder: '7am – 4pm' },
                    },
                  ],
                },
                {
                  name: 'rows',
                  type: 'array',
                  maxRows: 4,
                  labels: { singular: 'Row', plural: 'Rows' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                        { name: 'value', type: 'text', admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Photo & stamp',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'photo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                {
                  name: 'caption',
                  type: 'text',
                  admin: { width: '50%', description: 'Handwritten polaroid caption.' },
                },
              ],
            },
            stampGroup('Round blue stamp beside the card.', ['WE REPLY', 'FAST', 'WITHIN A DAY']),
          ],
        },
      ],
    },
  ],
};
