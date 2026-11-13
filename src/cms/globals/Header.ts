import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access';
import { link } from '../fields/link';

export const NAV_ICONS = [
  { label: 'Home', value: 'home' },
  { label: 'Shopping bag', value: 'bag' },
  { label: 'Cloche (catering)', value: 'cloche' },
  { label: 'Gift', value: 'gift' },
  { label: 'Info', value: 'info' },
  { label: 'Mail', value: 'mail' },
  { label: 'Menu book', value: 'menu' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Map pin', value: 'pin' },
] as const;

const textRows = (name: string, label: string, description: string, maxRows: number) => ({
  name,
  label,
  type: 'array' as const,
  maxRows,
  admin: {
    description,
    initCollapsed: true,
    components: { RowLabel: '/cms/admin/RowLabel#TextRowLabel' },
  },
  fields: [{ name: 'text', type: 'text' as const, required: true, localized: true }],
});

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Site',
    description: 'Top info bar, main navigation, the scrolling ticker and the mobile menu.',
  },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              maxRows: 8,
              admin: {
                description:
                  'On desktop the first half sits left of the logo and the rest on the right.',
                initCollapsed: true,
                components: { RowLabel: '/cms/admin/RowLabel#NavItemRowLabel' },
              },
              fields: [
                link({ appearances: false }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      options: [...NAV_ICONS],
                      admin: { width: '50%', description: 'Shown in the mobile menu.' },
                    },
                    {
                      name: 'badge',
                      type: 'text',
                      localized: true,
                      admin: {
                        width: '50%',
                        placeholder: '~15 MIN',
                        description: 'Small pink tag in the mobile menu.',
                      },
                    },
                  ],
                },
              ],
            },
            { ...link({ name: 'cta', required: false }), label: 'Header button' },
            {
              name: 'ctaBadge',
              type: 'text',
              localized: true,
              admin: {
                placeholder: '~15 MIN',
                description:
                  'The header button is also listed second in the mobile menu, with this tag.',
              },
            },
          ],
        },
        {
          label: 'Info bar & ticker',
          fields: [
            textRows(
              'infoBar',
              'Info bar',
              'The thin blue strip above the navigation (desktop). Every other item is yellow.',
              5,
            ),
            textRows(
              'ticker',
              'Ticker',
              'Scrolling facts under the navigation, separated by ★.',
              8,
            ),
          ],
        },
        {
          label: 'Mobile menu',
          fields: [
            {
              name: 'contactHeading',
              type: 'text',
              localized: true,
              admin: {
                placeholder: 'Come say hi',
                description: 'Address, hours and phone come from Site settings.',
              },
            },
            {
              name: 'promo',
              type: 'group',
              label: 'Promo card',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      localized: true,
                      admin: { width: '40%', placeholder: 'HUNGRY?' },
                    },
                    {
                      name: 'heading',
                      type: 'text',
                      localized: true,
                      admin: { width: '60%', placeholder: 'Skip the line. Ready in ~15 min.' },
                    },
                  ],
                },
                link({ appearances: false, required: false }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
