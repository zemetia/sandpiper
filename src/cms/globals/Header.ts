import type { GlobalConfig } from 'payload';

import { isAdmin } from '../access';
import { link } from '../fields/link';

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Site', description: 'Main navigation and the header button.' },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      admin: { initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#LinkRowLabel' } },
      fields: [link({ appearances: false })],
    },
    { ...link({ name: 'cta', required: false }), label: 'Header button' },
  ],
};
