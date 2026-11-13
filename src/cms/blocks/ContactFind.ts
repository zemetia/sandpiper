import type { Block } from 'payload';

import { link } from '../fields/link';
import { accentHeading, stampGroup, storyIconField } from './storyIcons';

export const ContactFind: Block = {
  slug: 'contactFind',
  interfaceName: 'ContactFindBlock',
  labels: { singular: 'Find us', plural: 'Find us blocks' },
  admin: { group: 'Contact page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Copy',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { placeholder: 'FIND US' } },
            accentHeading('Right on\n*South Street.*'),
            { name: 'body', type: 'textarea' },
            {
              name: 'facts',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Fact', plural: 'Facts' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    storyIconField({ admin: { width: '25%' } }),
                    { name: 'title', type: 'text', required: true, admin: { width: '35%' } },
                    { name: 'detail', type: 'text', admin: { width: '40%' } },
                  ],
                },
              ],
            },
            {
              name: 'useMapUrl',
              type: 'checkbox',
              defaultValue: true,
              label: 'Button opens the map link from Site settings',
            },
            {
              ...link({ appearances: false, required: false }),
              admin: {
                hideGutter: true,
                description: 'Only the label is used when the box above is ticked.',
              },
            },
          ],
        },
        {
          label: 'Photos & seal',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'mainPhoto', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                { name: 'sidePhoto', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
              ],
            },
            stampGroup('Round yellow seal over the photos.', ['SEE YOU', '7–4', 'EVERY DAY']),
          ],
        },
      ],
    },
  ],
};
