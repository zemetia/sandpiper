import type { CollectionConfig } from 'payload';

import { isAuthenticated, publishedOrAuthenticated } from '../cms/access';
import { menuHooks } from '../cms/hooks/revalidateMenu';
import { seoTab } from '../cms/fields/seo';
import { slugField } from '../cms/fields/slug';
import { previewUrl } from '../cms/preview';

export const DIETARY_TAGS = [
  { label: 'Signature', value: 'signature' },
  { label: 'New', value: 'new' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Gluten-free', value: 'glutenFree' },
  { label: 'Dairy-free', value: 'dairyFree' },
  { label: 'Spicy', value: 'spicy' },
  { label: 'Contains nuts', value: 'nuts' },
] as const;

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  labels: { singular: 'Menu item', plural: 'Menu items' },
  orderable: true,
  admin: {
    group: 'Menu',
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'category', 'price', 'availability', 'featured', '_status'],
    listSearchableFields: ['name', 'slug'],
    groupBy: true,
    description:
      'Your product catalogue. Prices, sizes and availability update on the site the moment you publish.',
    preview: () => previewUrl('/menu'),
  },
  hooks: menuHooks,
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            { name: 'description', type: 'textarea', localized: true },
            {
              name: 'tags',
              type: 'select',
              hasMany: true,
              options: [...DIETARY_TAGS],
              admin: { description: 'Shown as badges on the menu and used for filtering.' },
            },
          ],
        },
        {
          label: 'Pricing',
          description: 'Base price, optional "was" price and size/option variants.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: { width: '50%', step: 500 },
                },
                {
                  name: 'compareAtPrice',
                  type: 'number',
                  min: 0,
                  label: 'Compare-at price',
                  admin: {
                    width: '50%',
                    step: 500,
                    description: 'Optional original price, shown struck through.',
                  },
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              labels: { singular: 'Variant', plural: 'Variants' },
              admin: {
                description:
                  'e.g. Regular / Large, Hot / Iced. Price is the full price for that option.',
                components: { RowLabel: '/cms/admin/RowLabel#VariantRowLabel' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                      admin: { width: '60%' },
                    },
                    {
                      name: 'price',
                      type: 'number',
                      required: true,
                      min: 0,
                      admin: { width: '40%', step: 500 },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
          ],
        },
        seoTab,
      ],
    },
    slugField('name'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Sold out today', value: 'soldOut' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'badge',
      type: 'text',
      maxLength: 12,
      admin: {
        position: 'sidebar',
        placeholder: 'FAVE',
        description: 'Short pink label next to the price on the menu, e.g. FAVE, NEW, HOT, LOCAL.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on homepage',
      admin: { position: 'sidebar' },
    },
  ],
};
