import type { Block } from 'payload';

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true },
  ],
};
