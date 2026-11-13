import type { Block } from 'payload';

import { link } from '../fields/link';

export const GiftCardHero: Block = {
  slug: 'giftCardHero',
  interfaceName: 'GiftCardHeroBlock',
  labels: { singular: 'Gift card hero', plural: 'Gift card heroes' },
  admin: { group: 'Gift cards' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: { placeholder: 'SANDPIPER eGIFT CARDS' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'line1',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'GIVE THEM', description: 'White line.' },
        },
        {
          name: 'line2',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'BREAKFAST.', description: 'Yellow line.' },
        },
      ],
    },
    { name: 'body', type: 'textarea', localized: true, admin: { rows: 3 } },
    {
      name: 'amounts',
      type: 'array',
      maxRows: 6,
      admin: {
        description:
          'Amount chips. Picking one updates the card shown on the right. Visitors pay on Toast.',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: '$50' },
            },
            {
              name: 'selected',
              type: 'checkbox',
              label: 'Selected by default',
              admin: { width: '50%', style: { alignSelf: 'flex-end' } },
            },
          ],
        },
      ],
    },
    {
      name: 'anyAmount',
      type: 'text',
      localized: true,
      admin: { placeholder: 'or any amount', description: 'Handwritten note next to the chips.' },
    },
    link({ name: 'buyLink', appearances: false, required: false }),
    link({ name: 'balanceLink', appearances: false, required: false }),
    {
      name: 'card',
      type: 'group',
      admin: { description: 'Text printed on the illustrated gift cards.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: { width: '34%', placeholder: 'eGIFT CARD' },
            },
            {
              name: 'address',
              type: 'text',
              localized: true,
              admin: { width: '33%', placeholder: '1640 SOUTH ST' },
            },
            {
              name: 'backAmount',
              type: 'text',
              admin: { width: '33%', placeholder: '$100', description: 'Amount on the back card.' },
            },
          ],
        },
      ],
    },
    {
      name: 'tag',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: { width: '50%', placeholder: 'DELIVERED BY' },
            },
            {
              name: 'value',
              type: 'text',
              localized: true,
              admin: { width: '50%', placeholder: 'email, instantly' },
            },
          ],
        },
      ],
    },
  ],
};
