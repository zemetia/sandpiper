import type { CollectionConfig } from 'payload';

import { isAdmin, isAdminField, isAdminOrSelf } from '../cms/access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team member', plural: 'Team' },
  auth: { tokenExpiration: 60 * 60 * 24 * 7 },
  admin: {
    group: 'Admin',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
    description: 'Admins manage everything. Editors manage pages, menu and media.',
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation !== 'create') return data;
        const { totalDocs } = await req.payload.count({ collection: 'users', req });
        return totalDocs === 0 ? { ...data, roles: ['admin'] } : data;
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, defaultValue: 'Sandpiper team' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { update: isAdminField, create: isAdminField },
      admin: { position: 'sidebar' },
    },
  ],
};
