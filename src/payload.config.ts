import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { s3Storage } from '@payloadcms/storage-s3';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { CateringRequests } from './collections/CateringRequests';
import { ContactMessages } from './collections/ContactMessages';
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
import { appUrl } from './config/app-url';
import { payloadSecret } from './cms/secret';
import { seedEndpoint } from './cms/seed';
import { migrations } from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const siteUrl = appUrl ?? 'http://localhost:3000';
// DATABASE_URL / POSTGRES_URL are what Vercel's Neon integration sets.
const databaseUrl =
  process.env['DATABASE_URI'] || process.env['DATABASE_URL'] || process.env['POSTGRES_URL'] || '';
// Hosted Postgres (Neon) refuses plaintext connections, even without `sslmode` in the URL.
const isLocalDatabase = /@(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//.test(databaseUrl);
// MinIO turns on only once every S3_* value is set; a half-filled env keeps local storage.
const s3Env = {
  endpoint: process.env['S3_ENDPOINT'],
  bucket: process.env['S3_BUCKET'],
  accessKeyId: process.env['S3_ACCESS_KEY_ID'],
  secretAccessKey: process.env['S3_SECRET_ACCESS_KEY'],
};
const hasS3 = Object.values(s3Env).every(Boolean);

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
      icons: [
        { rel: 'icon', sizes: '48x48', url: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', url: '/sandpiper-mark.svg' },
        { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
      ],
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
  collections: [
    Pages,
    MenuItems,
    Categories,
    Media,
    Subscribers,
    CateringRequests,
    ContactMessages,
    Users,
  ],
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
    // Vercel's filesystem is read-only, so production media lives in MinIO (S3-compatible).
    // Without the S3_* env (local dev) uploads stay in ./media. Files are served through
    // /api/media/file/…, so the bucket can stay private.
    s3Storage({
      enabled: hasS3,
      collections: { media: true },
      bucket: s3Env.bucket ?? '',
      config: {
        endpoint: s3Env.endpoint,
        region: process.env['S3_REGION'] || 'us-east-1',
        forcePathStyle: true, // MinIO serves buckets by path, not subdomain
        credentials: {
          accessKeyId: s3Env.accessKeyId ?? '',
          secretAccessKey: s3Env.secretAccessKey ?? '',
        },
      },
    }),
    seoPlugin({
      // The site appends " · Sandpiper" via its title template — don't repeat the brand here.
      generateTitle: ({ doc }: { doc: SeoDoc }) => doc.title ?? doc.name ?? 'Sandpiper',
      generateDescription: ({ doc }: { doc: SeoDoc }) => doc.description ?? '',
      generateImage: ({ doc }: { doc: SeoDoc }) => {
        const img = doc.image;
        if (typeof img === 'object' && img && 'id' in img) return img.id as number;
        return typeof img === 'number' ? img : '';
      },
      generateURL: ({ doc }: { doc: SeoDoc }) => `${siteUrl}${pagePath(doc.slug) || '/'}`,
    }),
  ],
  sharp,
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl, ...(isLocalDatabase ? {} : { ssl: true }) },
    // Dev pushes the schema on the fly; production (Vercel build + functions) runs these instead.
    prodMigrations: migrations,
  }),
});
