import type { Block } from 'payload';

export const PlateParade: Block = {
  slug: 'plateParade',
  interfaceName: 'PlateParadeBlock',
  labels: { singular: 'Plate parade', plural: 'Plate parades' },
  admin: { group: 'Landing page' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '40%', placeholder: 'Plate parade' },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          admin: { width: '60%', placeholder: 'FAN FAVES' },
        },
      ],
    },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'featured',
      options: [
        { label: 'Items marked "Featured"', value: 'featured' },
        { label: 'Hand-picked', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'menu-items',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.['source'] === 'manual',
        isSortable: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'limit',
          type: 'number',
          defaultValue: 6,
          min: 2,
          max: 12,
          admin: {
            width: '50%',
            step: 1,
            condition: (_, siblingData) => siblingData?.['source'] !== 'manual',
          },
        },
        {
          name: 'dragLabel',
          type: 'text',
          localized: true,
          admin: { width: '50%', placeholder: 'Drag', description: 'Round cursor badge.' },
        },
      ],
    },
  ],
};
