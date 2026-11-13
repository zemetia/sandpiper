import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access';
import { link } from '../fields/link';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site',
    description: 'Footer blurb and links. Hours and contact come from Site settings.',
  },
  access: { read: () => true, update: isAdmin },
  fields: [
    { name: 'blurb', type: 'textarea', localized: true },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      admin: { initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#LinkRowLabel' } },
      fields: [link({ appearances: false })],
    },
  ],
};
