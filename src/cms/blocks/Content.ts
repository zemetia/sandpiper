import type { Block } from 'payload';

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (reading width)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    { name: 'body', type: 'richText', localized: true, required: true },
  ],
};
