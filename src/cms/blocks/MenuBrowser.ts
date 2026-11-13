import type { Block } from 'payload';

import { link } from '../fields/link';

const time = (name: string, placeholder: string, description: string) => ({
  name,
  type: 'text' as const,
  admin: { width: '50%', placeholder, description },
  validate: (v: string | null | undefined) =>
    !v || /^([01]\d|2[0-3]):[0-5]\d$/.test(v) || 'Use 24-hour HH:MM, e.g. 07:00',
});

export const MenuBrowser: Block = {
  slug: 'menuBrowser',
  interfaceName: 'MenuBrowserBlock',
  labels: { singular: 'Menu browser', plural: 'Menu browsers' },
  admin: { group: 'Menu page' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            { name: 'title', type: 'text', admin: { placeholder: 'Menu' } },
            {
              type: 'row',
              fields: [
                time('opensAt', '07:00', 'Philadelphia time. Drives the OPEN NOW / CLOSED pill.'),
                time('closesAt', '16:00', 'Leave both empty to hide the pill.'),
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'hoursLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: '7:00 AM – 4:00 PM daily' },
                },
                {
                  name: 'address',
                  type: 'text',
                  admin: {
                    width: '50%',
                    placeholder: '1640 South St, Philadelphia',
                    description: 'Falls back to the Site settings address.',
                  },
                },
              ],
            },
            {
              name: 'metaShort',
              type: 'text',
              admin: {
                placeholder: '7AM – 4PM · 1640 South St',
                description: 'Phone version of hours + address on one line.',
              },
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
              admin: { placeholder: 'Search the menu' },
            },
          ],
        },
        {
          label: 'Ordering',
          description:
            'The Pickup / Delivery switch picks where the + button on every dish leads. Remove both links to hide the switch and the + buttons.',
          fields: [
            {
              name: 'pickup',
              type: 'group',
              fields: [link({ appearances: false, required: false })],
            },
            {
              name: 'delivery',
              type: 'group',
              fields: [link({ appearances: false, required: false })],
            },
          ],
        },
        {
          label: 'Menu',
          fields: [
            {
              name: 'categoriesLabel',
              type: 'text',
              admin: { placeholder: 'CATEGORIES', description: 'Sidebar heading (desktop).' },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              admin: { description: 'Leave empty to show every category in its configured order.' },
            },
            {
              name: 'showSoldOut',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show sold-out items (faded, no + button)',
            },
          ],
        },
      ],
    },
  ],
};
