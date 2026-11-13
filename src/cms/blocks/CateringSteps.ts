import type { Block } from 'payload';

export const CateringSteps: Block = {
  slug: 'cateringSteps',
  interfaceName: 'CateringStepsBlock',
  labels: { singular: 'Catering steps', plural: 'Catering steps' },
  admin: { group: 'Catering page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: 'HOW IT WORKS' },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'Three steps to a full table.' },
        },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Step', plural: 'Steps' },
      admin: {
        description: 'Numbered automatically. Tilted cards on desktop, a timeline on phones.',
      },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
  ],
};
