import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access';
import { link } from '../fields/link';
import { revalidateMenuGlobal } from '../hooks/revalidateMenu';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Site',
    description: 'Brand, contact details, opening hours and the announcement bar.',
  },
  hooks: { afterChange: [revalidateMenuGlobal] },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'siteName',
                  type: 'text',
                  required: true,
                  defaultValue: 'Sandpiper',
                  admin: { width: '50%' },
                },
                {
                  name: 'currency',
                  type: 'select',
                  required: true,
                  defaultValue: 'IDR',
                  options: [
                    { label: 'Rupiah (IDR)', value: 'IDR' },
                    { label: 'US Dollar (USD)', value: 'USD' },
                  ],
                  admin: { width: '50%', description: 'Used to format every menu price.' },
                },
              ],
            },
            { name: 'tagline', type: 'text', localized: true },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. The wordmark is used when empty.' },
            },
          ],
        },
        {
          label: 'Contact & location',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', admin: { width: '50%' } },
                { name: 'phone', type: 'text', admin: { width: '50%', placeholder: '+62 …' } },
              ],
            },
            {
              name: 'whatsapp',
              type: 'text',
              admin: {
                description: 'Number in international format, digits only — e.g. 6281234567890.',
              },
            },
            { name: 'address', type: 'textarea', localized: true },
            { name: 'mapUrl', type: 'text', label: 'Google Maps link' },
            {
              name: 'socials',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        'instagram',
                        'tiktok',
                        'facebook',
                        'x',
                        'youtube',
                        'gofood',
                        'grabfood',
                      ].map((v) => ({
                        label: v,
                        value: v,
                      })),
                      admin: { width: '40%' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Opening hours',
          fields: [
            {
              name: 'hours',
              type: 'array',
              labels: { singular: 'Row', plural: 'Rows' },
              admin: { components: { RowLabel: '/cms/admin/RowLabel#HoursRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'days',
                      type: 'text',
                      required: true,
                      localized: true,
                      admin: { width: '50%', placeholder: 'Mon – Fri' },
                    },
                    {
                      name: 'time',
                      type: 'text',
                      required: true,
                      admin: { width: '50%', placeholder: '07:00 – 22:00' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Announcement',
          fields: [
            { name: 'announcementEnabled', type: 'checkbox', label: 'Show announcement bar' },
            {
              name: 'announcement',
              type: 'text',
              localized: true,
              admin: { condition: (data) => Boolean(data?.['announcementEnabled']) },
            },
            {
              ...link({ name: 'announcementLink', appearances: false, required: false }),
              admin: { condition: (data) => Boolean(data?.['announcementEnabled']) },
            },
          ],
        },
      ],
    },
  ],
};
