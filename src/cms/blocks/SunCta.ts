import type { Block } from 'payload';

import { link } from '../fields/link';

export const SunCta: Block = {
  slug: 'sunCta',
  interfaceName: 'SunCtaBlock',
  labels: { singular: 'Sun-up call to action', plural: 'Sun-up calls to action' },
  admin: { group: 'Landing page' },
  fields: [
    {
      name: 'sideText',
      type: 'textarea',
      localized: true,
      admin: { rows: 2, placeholder: 'Order ahead, pick up at 1640 South St.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: 'HUNGRY?' },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'Skip the line.' },
        },
      ],
    },
    link({ appearances: false, required: false }),
    {
      name: 'stamp',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: { width: '50%', placeholder: 'READY IN' },
            },
            {
              name: 'value',
              type: 'text',
              localized: true,
              admin: { width: '50%', placeholder: '~15 min' },
            },
          ],
        },
      ],
    },
  ],
};
