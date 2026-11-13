import type { Block } from 'payload';

import { giftCardIconField } from './giftCardIcons';

export const GiftCardSteps: Block = {
  slug: 'giftCardSteps',
  interfaceName: 'GiftCardStepsBlock',
  labels: { singular: 'Gift card steps', plural: 'Gift card steps' },
  admin: { group: 'Gift cards' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '30%', placeholder: 'HOW IT WORKS' },
        },
        {
          name: 'heading',
          type: 'textarea',
          localized: true,
          admin: {
            width: '40%',
            rows: 2,
            placeholder: 'Easy as a\nshort stack.',
            description: 'Line breaks apply on phones only.',
          },
        },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: { width: '30%', placeholder: 'takes about a minute ✶' },
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { ...giftCardIconField('card'), admin: { width: '30%' } },
            { name: 'title', type: 'text', localized: true, admin: { width: '70%' } },
          ],
        },
        { name: 'description', type: 'textarea', localized: true, admin: { rows: 2 } },
      ],
    },
  ],
};
