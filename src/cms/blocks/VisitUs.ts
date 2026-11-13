import type { Block } from 'payload';

export const VisitUs: Block = {
  slug: 'visitUs',
  interfaceName: 'VisitUsBlock',
  labels: { singular: 'Visit us (hours + location)', plural: 'Visit us' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'note',
      type: 'ui',
      admin: { components: { Field: '/cms/admin/FieldNote#SiteSettingsNote' } },
    },
  ],
};
