import type { Block } from 'payload';

import { link } from '../fields/link';
import { giftCardIconField } from './giftCardIcons';

export const GiftCardPanels: Block = {
  slug: 'giftCardPanels',
  interfaceName: 'GiftCardPanelsBlock',
  labels: { singular: 'Gift card action panels', plural: 'Gift card action panels' },
  admin: { group: 'Gift cards' },
  fields: [
    {
      name: 'panels',
      type: 'array',
      maxRows: 2,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'sunny',
              options: [
                { label: 'Yellow', value: 'sunny' },
                { label: 'White', value: 'paper' },
              ],
              admin: { width: '30%' },
            },
            { ...giftCardIconField('gift'), admin: { width: '30%' } },
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
              admin: { width: '40%', placeholder: 'FOR SOMEONE ELSE' },
            },
          ],
        },
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true, admin: { rows: 2 } },
        link({ appearances: false, required: false }),
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: {
            placeholder: 'Opens Toast in a new tab',
            description: 'Shown under the button on phones; desktop shows the link address.',
          },
        },
      ],
    },
  ],
};
