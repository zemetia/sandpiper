import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { MenuItems } from './collections/MenuItems';
import { Pages } from './collections/Pages';
import { Subscribers } from './collections/Subscribers';
import { Users } from './collections/Users';
import { Footer } from './cms/globals/Footer';
import { Header } from './cms/globals/Header';
import { SiteSettings } from './cms/globals/SiteSettings';
import { pagePath } from './cms/preview';
import { seedEndpoint } from './cms/seed';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const siteUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000';

type SeoDoc = {
  title?: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: unknown;
};

export default buildConfig({
  serverURL: siteUrl,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    theme: 'all',
    meta: {
      titleSuffix: ' · Sandpiper CMS',
      description: 'Sandpiper content studio',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/sandpiper-mark.svg' }],
    },
    components: {
      graphics: { Logo: '/cms/admin/Brand#Logo', Icon: '/cms/admin/Brand#Icon' },
      beforeDashboard: ['/cms/admin/Dashboard#Dashboard'],
      beforeNavLinks: ['/cms/admin/NavBrand#NavBrand'],
      afterNavLinks: ['/cms/admin/ViewSiteLink#ViewSiteLink'],
      actions: ['/cms/admin/HeaderActions#HeaderActions'],
    },
    avatar: { Component: '/cms/admin/Avatar#Avatar' },
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, MenuItems, Categories, Media, Subscribers, Users],
  globals: [SiteSettings, Header, Footer],
  endpoints: [seedEndpoint],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Bahasa Indonesia', code: 'id' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      // The site appends " · Sandpiper" via its title template — don't repeat the brand here.
      generateTitle: ({ doc }: { doc: SeoDoc }) => doc.title ?? doc.name ?? 'Sandpiper',
      generateDescription: ({ doc }: { doc: SeoDoc }) => doc.description ?? '',
      generateImage: ({ doc }: { doc: SeoDoc }) => {
        const img = doc.image;
        if (typeof img === 'object' && img && 'id' in img) return img.id as number;
        return typeof img === 'number' ? img : '';
      },
      generateURL: ({ doc, locale }: { doc: SeoDoc; locale?: string }) =>
        `${siteUrl}/${locale ?? 'en'}${pagePath(doc.slug)}`,
    }),
  ],
  sharp,
  editor: lexicalEditor(),
  secret: process.env['PAYLOAD_SECRET'] || 'super-secret-payload-key-change-in-production',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env['DATABASE_URI'] || '' },
  }),
});
