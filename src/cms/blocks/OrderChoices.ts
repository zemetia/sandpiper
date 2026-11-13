import type { Block, Field } from 'payload';

import { link } from '../fields/link';

const cardHead: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'title', type: 'text', admin: { width: '50%' } },
      {
        name: 'tag',
        type: 'text',
        admin: { width: '50%', description: 'Outlined pill, top right.' },
      },
    ],
  },
  { name: 'body', type: 'textarea', admin: { rows: 2 } },
];

export const OrderChoices: Block = {
  slug: 'orderChoices',
  interfaceName: 'OrderChoicesBlock',
  labels: { singular: 'Order choices', plural: 'Order choices' },
  admin: { group: 'Order page' },
  fields: [
    {
      name: 'pickup',
      type: 'group',
      admin: { description: 'White card. Pickup orders are placed on Toast.' },
      fields: [
        ...cardHead,
        {
          name: 'steps',
          type: 'array',
          maxRows: 5,
          admin: { initCollapsed: true },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        link({ name: 'link', appearances: false, required: false }),
        { name: 'note', type: 'text', admin: { placeholder: 'Opens Toast in a new tab' } },
      ],
    },
    {
      name: 'delivery',
      type: 'group',
      admin: { description: 'Blue card with one row per delivery app.' },
      fields: [
        ...cardHead,
        {
          name: 'apps',
          type: 'array',
          maxRows: 5,
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'app',
                  type: 'select',
                  required: true,
                  defaultValue: 'doordash',
                  options: [
                    { label: 'DoorDash', value: 'doordash' },
                    { label: 'Uber Eats', value: 'ubereats' },
                    { label: 'Grubhub', value: 'grubhub' },
                  ],
                  admin: { width: '34%', description: 'Picks the logo tile.' },
                },
                { name: 'name', type: 'text', required: true, admin: { width: '33%' } },
                {
                  name: 'promoCode',
                  type: 'text',
                  admin: { width: '33%', description: 'Optional. Shown with a copy button.' },
                },
              ],
            },
            { name: 'description', type: 'text' },
            { name: 'url', type: 'text', label: 'Store URL', required: true },
          ],
        },
        { name: 'note', type: 'text' },
      ],
    },
  ],
};
