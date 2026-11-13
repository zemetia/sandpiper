import type { CollectionConfig } from 'payload';

import { anyone, isAuthenticated } from '../cms/access';
import { menuHooks } from '../cms/hooks/revalidateMenu';
import { slugField } from '../cms/fields/slug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Category', plural: 'Categories' },
  orderable: true,
  admin: {
    group: 'Menu',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    description: 'Menu sections. Drag rows in the list view to change the order on the website.',
  },
  hooks: menuHooks,
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Plate photo for this category on the homepage menu board.' },
    },
    slugField('name'),
  ],
};
