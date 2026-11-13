import type { Block } from 'payload';

export const Ribbons: Block = {
  slug: 'ribbons',
  interfaceName: 'RibbonsBlock',
  labels: { singular: 'Crossed ribbons', plural: 'Crossed ribbons' },
  admin: { group: 'Landing page' },
  fields: [
    {
      name: 'topWords',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'Yellow ribbon words',
      admin: { description: 'Scrolls left. Press Enter after each word.' },
    },
    {
      name: 'bottomWords',
      type: 'text',
      hasMany: true,
      localized: true,
      label: 'Ink ribbon words',
      admin: { description: 'Scrolls right, crossing the yellow ribbon.' },
    },
  ],
};
