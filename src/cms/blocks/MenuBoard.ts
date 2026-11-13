import type { Block } from 'payload';

import { link } from '../fields/link';

export const MenuBoard: Block = {
  slug: 'menuBoard',
  interfaceName: 'MenuBoardBlock',
  labels: { singular: 'Menu board', plural: 'Menu boards' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: 'The menu · all day' },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'PICK YOUR PLATE' },
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      maxRows: 5,
      admin: {
        isSortable: true,
        description:
          'Shown as the big tabs. The plate photo is the category photo, or the first item with a photo.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'limit',
          type: 'number',
          defaultValue: 5,
          min: 1,
          max: 10,
          admin: { width: '50%', step: 1, description: 'Items per category.' },
        },
        {
          name: 'stickerLabel',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
            placeholder: 'FAN FAVE',
            description: 'Sticker on the plate — names the featured item in that category.',
          },
        },
      ],
    },
    { ...link({ name: 'menuLink', appearances: false, required: false }), label: 'Full menu link' },
  ],
};
