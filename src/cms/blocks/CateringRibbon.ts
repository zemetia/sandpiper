import type { Block } from 'payload';

export const CateringRibbon: Block = {
  slug: 'cateringRibbon',
  interfaceName: 'CateringRibbonBlock',
  labels: { singular: 'Catering ribbon', plural: 'Catering ribbons' },
  admin: { group: 'Catering page' },
  fields: [
    {
      name: 'words',
      type: 'text',
      hasMany: true,
      localized: true,
      admin: { description: 'Scrolling ink strip. Press Enter after each phrase.' },
    },
  ],
};
