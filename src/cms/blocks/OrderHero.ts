import type { Block } from 'payload';

import { link } from '../fields/link';

export const OrderHero: Block = {
  slug: 'orderHero',
  interfaceName: 'OrderHeroBlock',
  labels: { singular: 'Order hero', plural: 'Order heroes' },
  admin: { group: 'Order page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: { width: '50%', placeholder: 'ORDER NOW · 1640 SOUTH STREET, PHILADELPHIA' },
        },
        {
          name: 'eyebrowShort',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'ORDER NOW · 1640 SOUTH ST',
            description: 'Phone version. Falls back to the eyebrow.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'line1',
          type: 'text',
          admin: { width: '50%', placeholder: 'Hungry?', description: 'Ink line.' },
        },
        {
          name: 'line2',
          type: 'text',
          admin: { width: '50%', placeholder: 'Pick your way.', description: 'Blue line.' },
        },
      ],
    },
    { name: 'body', type: 'textarea', admin: { rows: 3 } },
    {
      name: 'toggle',
      type: 'group',
      admin: {
        description:
          'Phone only: a Pickup / Delivery switch that jumps to the matching card of the "Order choices" block below.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'pickup',
              type: 'text',
              admin: { width: '50%', placeholder: 'PICKUP' },
            },
            {
              name: 'delivery',
              type: 'text',
              admin: { width: '50%', placeholder: 'DELIVERY' },
            },
          ],
        },
      ],
    },
    link({ name: 'menuLink', appearances: false, required: false }),
  ],
};
