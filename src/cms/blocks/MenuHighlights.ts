import type { Block } from 'payload';

export const MenuHighlights: Block = {
  slug: 'menuHighlights',
  interfaceName: 'MenuHighlightsBlock',
  labels: { singular: 'Menu highlights', plural: 'Menu highlights' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'featured',
      options: [
        { label: 'Items marked "Featured"', value: 'featured' },
        { label: 'From a category', value: 'category' },
        { label: 'Hand-picked', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { condition: (_, siblingData) => siblingData?.['source'] === 'category' },
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
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 24,
      admin: { condition: (_, siblingData) => siblingData?.['source'] !== 'manual', step: 1 },
    },
    {
      name: 'showMenuLink',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "See full menu" link',
    },
  ],
};
