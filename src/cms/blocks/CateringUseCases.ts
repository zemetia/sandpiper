import type { Block } from 'payload';

import { cateringIconField } from './cateringIcons';

export const CateringUseCases: Block = {
  slug: 'cateringUseCases',
  interfaceName: 'CateringUseCasesBlock',
  labels: { singular: 'Catering use cases', plural: 'Catering use cases' },
  admin: { group: 'Catering page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingBold',
          type: 'text',
          localized: true,
          admin: { width: '35%', placeholder: 'MADE FOR', description: 'Yellow, heavy.' },
        },
        {
          name: 'headingLight',
          type: 'text',
          localized: true,
          admin: {
            width: '65%',
            placeholder: 'the whole neighborhood.',
            description: 'White, light.',
          },
        },
      ],
    },
    {
      name: 'script',
      type: 'textarea',
      localized: true,
      admin: { description: 'Handwritten aside on the right (desktop only).' },
    },
    {
      name: 'cases',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Use case', plural: 'Use cases' },
      fields: [
        {
          type: 'row',
          fields: [
            cateringIconField({ admin: { width: '30%' } }),
            { name: 'title', type: 'text', localized: true, admin: { width: '70%' } },
          ],
        },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
  ],
};
