import type { Block } from 'payload';

import { linkGroup } from '../fields/link';

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split — text beside image', value: 'split' },
        { label: 'Full bleed — text over image', value: 'fullBleed' },
        { label: 'Minimal — text only', value: 'minimal' },
      ],
    },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, siblingData) => siblingData?.['variant'] !== 'minimal' },
    },
    linkGroup('links', 2),
  ],
};
