import type { Block } from 'payload';

import { linkGroup } from '../fields/link';
import { cateringIconField } from './cateringIcons';

export const CateringHero: Block = {
  slug: 'cateringHero',
  interfaceName: 'CateringHeroBlock',
  labels: { singular: 'Catering hero', plural: 'Catering heroes' },
  admin: { group: 'Catering page' },
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
              localized: true,
              admin: { placeholder: 'CATERING · SOUTH PHILLY' },
            },
            {
              name: 'heading',
              type: 'textarea',
              localized: true,
              admin: { description: 'Giant headline. Each line break starts a new line.' },
            },
            { name: 'body', type: 'textarea', localized: true },
            linkGroup('links', 2),
            {
              name: 'facts',
              type: 'array',
              maxRows: 3,
              labels: { singular: 'Fact', plural: 'Facts' },
              admin: { description: 'Small icon facts under the buttons, e.g. "48 HRS · notice".' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    cateringIconField({ admin: { width: '30%' } }),
                    {
                      name: 'value',
                      type: 'text',
                      localized: true,
                      admin: { width: '30%', placeholder: '48 HRS' },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      admin: { width: '40%', placeholder: 'notice' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Photos & stamp',
          fields: [
            {
              name: 'photos',
              type: 'group',
              admin: {
                description: 'Three round photos: a big plate, a smaller one and a little cup.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'main', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                    { name: 'side', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                    { name: 'small', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
                  ],
                },
              ],
            },
            {
              name: 'stamp',
              type: 'group',
              admin: { description: 'Round blue stamp over the big photo.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: 'TRAYS SERVE' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: '10+' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'note',
              type: 'text',
              localized: true,
              admin: {
                description: 'Handwritten note under the photos.',
                placeholder: 'boxed up by 8am',
              },
            },
          ],
        },
      ],
    },
  ],
};
