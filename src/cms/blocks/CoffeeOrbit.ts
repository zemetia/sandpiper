import type { Block } from 'payload';

import { link } from '../fields/link';

export const CoffeeOrbit: Block = {
  slug: 'coffeeOrbit',
  interfaceName: 'CoffeeOrbitBlock',
  labels: { singular: 'Coffee orbit', plural: 'Coffee orbits' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingBold',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'LAVAZZA,' },
        },
        {
          name: 'headingLight',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'poured right.' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'The cup in the middle. A cut-out PNG looks best.' },
    },
    {
      name: 'drinks',
      type: 'relationship',
      relationTo: 'menu-items',
      hasMany: true,
      maxRows: 6,
      admin: { isSortable: true, description: 'Up to six drinks placed around the ring.' },
    },
    {
      name: 'note',
      type: 'group',
      label: 'Side note card',
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { placeholder: 'Not a coffee person?' },
        },
        link({ appearances: false, required: false }),
      ],
    },
    {
      name: 'seal',
      type: 'group',
      admin: { description: 'Round seal, bottom right.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'top', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'middle', type: 'text', localized: true, admin: { width: '34%' } },
            { name: 'bottom', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
      ],
    },
  ],
};
