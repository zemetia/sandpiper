import { Link } from '@payloadcms/ui';
import type { Payload, TypedUser } from 'payload';

import { SeedButton } from './SeedButton';

type Props = { payload: Payload; user?: TypedUser | null };

type Recent = {
  id: string | number;
  title: string;
  href: string;
  kind: string;
  status?: string | null;
  updatedAt: string;
};

const timeAgo = (iso: string): string => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

const greeting = (): string => {
  const h = new Date().getHours();
  if (h < 11) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export async function Dashboard({ payload, user }: Props) {
  const [published, drafts, items, soldOut, media, home, recentPages, recentItems] =
    await Promise.all([
      payload.count({ collection: 'pages', where: { _status: { equals: 'published' } } }),
      payload.count({ collection: 'pages', where: { _status: { equals: 'draft' } } }),
      payload.count({ collection: 'menu-items' }),
      payload.count({ collection: 'menu-items', where: { availability: { equals: 'soldOut' } } }),
      payload.count({ collection: 'media' }),
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        limit: 1,
        depth: 0,
        draft: true,
      }),
      payload.find({
        collection: 'pages',
        sort: '-updatedAt',
        limit: 4,
        depth: 0,
        draft: true,
        select: { title: true, updatedAt: true, _status: true },
      }),
      payload.find({
        collection: 'menu-items',
        sort: '-updatedAt',
        limit: 4,
        depth: 0,
        draft: true,
        select: { name: true, updatedAt: true, _status: true },
      }),
    ]);

  const homeId = home.docs[0]?.id;
  const recent: Recent[] = [
    ...recentPages.docs.map((d) => ({
      id: d.id,
      title: d.title,
      href: `/admin/collections/pages/${d.id}`,
      kind: 'Page',
      status: d._status,
      updatedAt: d.updatedAt,
    })),
    ...recentItems.docs.map((d) => ({
      id: d.id,
      title: d.name,
      href: `/admin/collections/menu-items/${d.id}`,
      kind: 'Menu item',
      status: d._status,
      updatedAt: d.updatedAt,
    })),
  ]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);

  const stats = [
    {
      label: 'Published pages',
      value: published.totalDocs,
      href: '/admin/collections/pages?where[_status][equals]=published',
    },
    {
      label: 'Drafts in progress',
      value: drafts.totalDocs,
      href: '/admin/collections/pages?where[_status][equals]=draft',
      tone: drafts.totalDocs > 0 ? 'warn' : undefined,
    },
    { label: 'Menu items', value: items.totalDocs, href: '/admin/collections/menu-items' },
    {
      label: 'Sold out today',
      value: soldOut.totalDocs,
      href: '/admin/collections/menu-items?where[availability][equals]=soldOut',
      tone: soldOut.totalDocs > 0 ? 'alert' : undefined,
    },
    { label: 'Photos', value: media.totalDocs, href: '/admin/collections/media' },
  ];

  const actions = [
    {
      label: homeId ? 'Edit homepage' : 'Create homepage',
      hint: 'Live preview',
      href: homeId ? `/admin/collections/pages/${homeId}` : '/admin/collections/pages/create',
    },
    {
      label: 'Add menu item',
      hint: 'Price, sizes, photo',
      href: '/admin/collections/menu-items/create',
    },
    { label: 'Upload photos', hint: 'Media library', href: '/admin/collections/media/create' },
    { label: 'Opening hours', hint: 'Site settings', href: '/admin/globals/site-settings' },
    { label: 'New page', hint: 'Build from blocks', href: '/admin/collections/pages/create' },
    { label: 'Navigation', hint: 'Header links', href: '/admin/globals/header' },
  ];

  const firstName =
    user && 'name' in user && typeof user.name === 'string' ? user.name.split(' ')[0] : undefined;

  return (
    <section className="sp-dash">
      <header className="sp-dash__hero">
        <div>
          <p className="sp-dash__eyebrow">Sandpiper content studio</p>
          <h1 className="sp-dash__title">
            {greeting()}
            {firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="sp-dash__lead">
            Edit pages, update the menu and publish when you are ready. Changes go live instantly.
          </p>
        </div>
        <a className="sp-dash__site" href="/" target="_blank" rel="noopener noreferrer">
          Open website ↗
        </a>
      </header>

      {published.totalDocs + drafts.totalDocs === 0 && <SeedButton />}

      <div className="sp-dash__stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="sp-stat" data-tone={s.tone}>
            <span className="sp-stat__value">{s.value}</span>
            <span className="sp-stat__label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="sp-dash__grid">
        <div className="sp-panel">
          <h2 className="sp-panel__title">Quick actions</h2>
          <div className="sp-actions">
            {actions.map((a) => (
              <Link key={a.label} href={a.href} className="sp-action">
                <span className="sp-action__label">{a.label}</span>
                <span className="sp-action__hint">{a.hint}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="sp-panel">
          <h2 className="sp-panel__title">Recently edited</h2>
          {recent.length === 0 ? (
            <p className="sp-empty">Nothing yet — start with the homepage.</p>
          ) : (
            <ul className="sp-recent">
              {recent.map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <Link href={r.href} className="sp-recent__row">
                    <span className="sp-recent__title">{r.title}</span>
                    <span className="sp-recent__meta">
                      <span className="sp-pill" data-status={r.status ?? 'published'}>
                        {r.status === 'draft' ? 'Draft' : 'Live'}
                      </span>
                      {r.kind} · {timeAgo(r.updatedAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
