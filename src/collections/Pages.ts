import type { CollectionConfig } from 'payload';

import { isAuthenticated, publishedOrAuthenticated } from '../cms/access';
import { pageBlocks } from '../cms/blocks';
import { seoTab } from '../cms/fields/seo';
import { slugField } from '../cms/fields/slug';
import { pagePath, previewUrl } from '../cms/preview';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    description:
      'Every public page on the site. Build pages from blocks, preview live, then publish.',
    livePreview: {
      url: ({ data, locale }) => previewUrl(pagePath(data?.['slug'] as string), locale.code),
    },
    preview: (data, { locale }) => previewUrl(pagePath(data?.['slug'] as string), locale),
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  versions: {
    drafts: { autosave: { interval: 400 } },
    maxPerDoc: 30,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(
      'title',
      'Leave empty to generate from the title. Use "home" for the homepage and "menu" for the menu page.',
    ),
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            siblingData['_status'] === 'published' && !value ? new Date() : value,
        ],
      },
    },
  ],
};
