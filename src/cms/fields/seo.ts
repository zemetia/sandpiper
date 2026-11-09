import type { Tab } from 'payload';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';

/** "SEO" tab with search-result preview, auto-generate buttons and length checks. */
export const seoTab: Tab = {
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true, overrides: { localized: true } }),
    MetaDescriptionField({ hasGenerateFn: true, overrides: { localized: true } }),
    MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
};
