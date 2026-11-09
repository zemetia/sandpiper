import type { CollectionConfig } from 'payload';

import { anyone, isAuthenticated } from '../cms/access';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media library' },
  folders: true,
  admin: {
    group: 'Library',
    defaultColumns: ['filename', 'alt', 'filesize', 'updatedAt'],
    description: 'Photos used across pages and the menu. Set a focal point so crops look right.',
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    mimeTypes: ['image/*'],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, formatOptions: { format: 'webp' } },
      { name: 'card', width: 900, height: 675, formatOptions: { format: 'webp' } },
      { name: 'hero', width: 2000, formatOptions: { format: 'webp' } },
      { name: 'og', width: 1200, height: 630, formatOptions: { format: 'jpeg' } },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for screen readers and search engines.' },
    },
    { name: 'caption', type: 'text', localized: true },
  ],
};
