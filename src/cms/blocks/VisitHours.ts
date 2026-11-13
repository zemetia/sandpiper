import type { Block } from 'payload';

export const VisitHours: Block = {
  slug: 'visitHours',
  interfaceName: 'VisitHoursBlock',
  labels: { singular: 'Visit (big hours)', plural: 'Visit (big hours)' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'bigText',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: '7–4', description: 'Giant yellow numerals.' },
        },
        {
          name: 'script',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'every single day ✶' },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
      admin: { description: 'Ticket title. Empty = first line of the Site settings address.' },
    },
    {
      name: 'details',
      type: 'text',
      localized: true,
      admin: { placeholder: '267-858-6183 · dine in · takeout' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'directionsLabel',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
            placeholder: 'Directions',
            description: 'Links to the Google Maps link in Site settings.',
          },
        },
        {
          name: 'streetLabel',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'SOUTH ST', description: 'Street name on the map.' },
        },
      ],
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. Leave empty for the illustrated street map.' },
    },
  ],
};
