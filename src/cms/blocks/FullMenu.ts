import type { Block } from 'payload';

export const FullMenu: Block = {
  slug: 'fullMenu',
  interfaceName: 'FullMenuBlock',
  labels: { singular: 'Full menu', plural: 'Full menus' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
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
      label: 'Show sold-out items (greyed out)',
    },
  ],
};
