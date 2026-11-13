import type { Block } from 'payload';

import { linkGroup } from '../fields/link';
import { accentHeading } from './storyIcons';

export const AboutClosing: Block = {
  slug: 'aboutClosing',
  interfaceName: 'AboutClosingBlock',
  labels: { singular: 'Warm welcome', plural: 'Warm welcomes' },
  admin: { group: 'About page' },
  fields: [
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'Short paragraph above the statement.' },
    },
    accentHeading('Good food, great coffee,\nand a warm welcome —\n*that’s Sandpiper Cafe.*'),
    linkGroup('links', 2),
    { name: 'note', type: 'text', admin: { description: 'Handwritten sign-off at the bottom.' } },
  ],
};
