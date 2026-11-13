import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access';
import { link } from '../fields/link';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site',
    description: 'Footer blurb, links and newsletter. The Visit column comes from Site settings.',
  },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'blurb', type: 'textarea', localized: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'exploreHeading',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'Explore' },
                },
                {
                  name: 'visitHeading',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'Visit' },
                },
              ],
            },
            {
              name: 'navItems',
              type: 'array',
              maxRows: 8,
              admin: {
                initCollapsed: true,
                components: { RowLabel: '/cms/admin/RowLabel#LinkRowLabel' },
              },
              fields: [link({ appearances: false })],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'copyright',
                  type: 'text',
                  localized: true,
                  admin: {
                    width: '50%',
                    placeholder: 'Sandpiper Cafe · South Philly',
                    description: '"© <year>" is added in front.',
                  },
                },
                {
                  name: 'note',
                  type: 'text',
                  localized: true,
                  admin: { width: '50%', placeholder: 'Proudly serving Lavazza ☕' },
                },
              ],
            },
            {
              name: 'wordmark',
              type: 'text',
              admin: {
                placeholder: 'SANDPIPER',
                description: 'Giant word cropped by the bottom edge. Empty hides it.',
              },
            },
          ],
        },
        {
          label: 'Newsletter',
          fields: [
            { name: 'newsletterEnabled', type: 'checkbox', defaultValue: true, label: 'Show' },
            {
              name: 'newsletter',
              type: 'group',
              admin: { condition: (data) => Boolean(data?.['newsletterEnabled']) },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  admin: { placeholder: 'GET THE SPECIALS' },
                },
                { name: 'body', type: 'textarea', localized: true },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'placeholder',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: 'you@email.com' },
                    },
                    {
                      name: 'buttonLabel',
                      type: 'text',
                      localized: true,
                      admin: { width: '50%', placeholder: 'Sign up' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
