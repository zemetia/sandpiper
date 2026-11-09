import type { Endpoint, Payload, PayloadRequest } from 'payload';

import { categories, menuItems, richText } from './content';

const ref = (id: number | string, label: string, appearance?: 'primary' | 'outline' | 'link') => ({
  link: {
    type: 'reference' as const,
    reference: id as number,
    label,
    ...(appearance ? { appearance } : {}),
  },
});

export async function seed(payload: Payload, req: PayloadRequest) {
  // Pin the locale on every call: the Local API writes `locale` back onto the shared `req`,
  // so one `locale: 'id'` update would otherwise make every later write Indonesian.
  const base = {
    req,
    locale: 'en',
    overrideAccess: true,
    context: { disableRevalidate: true },
  } as const;

  // Users created before roles existed have none — promote them so nobody is locked out.
  const roleless = await payload.find({
    ...base,
    collection: 'users',
    where: { roles: { exists: false } },
    limit: 100,
  });
  for (const u of roleless.docs) {
    await payload.update({ ...base, collection: 'users', id: u.id, data: { roles: ['admin'] } });
  }

  const categoryIds: Record<string, number | string> = {};
  for (const c of categories) {
    const doc = await payload.create({
      ...base,
      collection: 'categories',
      data: { name: c.name, slug: c.slug, description: c.description },
    });
    await payload.update({
      ...base,
      collection: 'categories',
      id: doc.id,
      locale: 'id',
      data: { name: c.id },
    });
    categoryIds[c.slug] = doc.id;
  }

  for (const item of menuItems) {
    const { category, ...data } = item;
    await payload.create({
      ...base,
      collection: 'menu-items',
      data: {
        ...data,
        category: categoryIds[category] as number,
        tags: data.tags as never,
        availability: data.availability ?? 'available',
        _status: 'published',
      },
    });
  }

  const page = (slug: string, title: string, layout: unknown[]) =>
    payload.create({
      ...base,
      collection: 'pages',
      data: { title, slug, layout: layout as never, _status: 'published' },
    });

  const menu = await page('menu', 'Menu', [
    {
      blockType: 'hero',
      variant: 'minimal',
      eyebrow: 'Open daily',
      heading: 'The menu',
      subheading:
        'Specialty coffee, all-day breakfast and plates made for slow afternoons by the water.',
    },
    { blockType: 'fullMenu', showSoldOut: true },
  ]);

  const about = await page('about', 'About', [
    {
      blockType: 'hero',
      variant: 'minimal',
      eyebrow: 'Our story',
      heading: 'A small café with a big view',
      subheading:
        'Sandpiper started as a coffee cart on the shoreline. Today it is a neighbourhood café — still built around good beans and slow mornings.',
    },
    {
      blockType: 'content',
      width: 'narrow',
      body: richText(
        '## Coffee first',
        'We work directly with farmers in Aceh, Toraja and Flores and roast in small batches every week, so every cup tastes the way it should.',
        '## Food that keeps it simple',
        'Our kitchen cooks honest, seasonal food — Indonesian classics alongside brunch favourites, all made in-house.',
      ),
    },
    {
      blockType: 'faq',
      heading: 'Good to know',
      items: [
        {
          question: 'Do you take reservations?',
          answer:
            'Walk-ins are always welcome. For groups of 8 or more, message us on WhatsApp and we will save you a table.',
        },
        {
          question: 'Is there Wi-Fi and power?',
          answer:
            'Yes — fast Wi-Fi and plenty of outlets indoors. We ask laptops to share the big tables at weekend brunch.',
        },
        {
          question: 'Do you have vegan options?',
          answer:
            'Plenty. Every item is tagged on the menu, and all milk drinks can be made with oat or coconut milk.',
        },
      ],
    },
    { blockType: 'visitUs', heading: 'Come say hello' },
  ]);

  const home = await page('home', 'Home', [
    {
      blockType: 'hero',
      variant: 'split',
      eyebrow: 'Coffee · Kitchen · Shoreline',
      heading: 'Slow mornings, great coffee.',
      subheading:
        'Sandpiper is a neighbourhood café serving single-origin Indonesian coffee and all-day plates, steps from the water.',
      links: [ref(menu.id, 'See the menu', 'primary'), ref(about.id, 'Plan your visit', 'outline')],
    },
    {
      blockType: 'menuHighlights',
      heading: 'Guest favourites',
      intro: 'What people come back for.',
      source: 'featured',
      limit: 6,
      showMenuLink: true,
    },
    {
      blockType: 'testimonials',
      heading: 'Kind words',
      quotes: [
        {
          quote: 'The best flat white I have had outside Melbourne — and the view is unbeatable.',
          author: 'Rani',
          source: 'Google review',
        },
        {
          quote: 'Our Sunday ritual. The Benedict is perfect every single time.',
          author: 'Dimas & Ayu',
          source: 'Instagram',
        },
        {
          quote: 'Warm staff, quick Wi-Fi and a pandan cheesecake worth the trip.',
          author: 'Sarah',
          source: 'Google review',
        },
      ],
    },
    {
      blockType: 'visitUs',
      heading: 'Visit us',
      intro: 'Find a seat by the window — we will bring the coffee.',
    },
    {
      blockType: 'cta',
      heading: 'Hungry already?',
      body: 'Browse the full menu, or message us to reserve a table for your group.',
      links: [ref(menu.id, 'Browse the menu', 'primary')],
    },
  ]);

  await payload.update({
    ...base,
    collection: 'pages',
    id: home.id,
    locale: 'id',
    data: { title: 'Beranda' },
  });
  await payload.update({
    ...base,
    collection: 'pages',
    id: menu.id,
    locale: 'id',
    data: { title: 'Menu' },
  });
  await payload.update({
    ...base,
    collection: 'pages',
    id: about.id,
    locale: 'id',
    data: { title: 'Tentang kami' },
  });

  await payload.updateGlobal({
    ...base,
    slug: 'site-settings',
    data: {
      siteName: 'Sandpiper',
      currency: 'IDR',
      tagline: 'Coffee & kitchen by the shore',
      email: 'hello@sandpiper.cafe',
      phone: '+62 812 0000 0000',
      whatsapp: '6281200000000',
      address: 'Replace with your street address\nCity, Province 00000',
      mapUrl: 'https://maps.google.com',
      hours: [
        { days: 'Mon – Fri', time: '07:00 – 21:00' },
        { days: 'Sat – Sun', time: '07:00 – 22:00' },
      ],
      socials: [{ platform: 'instagram', url: 'https://instagram.com' }],
      announcementEnabled: true,
      announcement: 'New: Kopi Susu Pandan is on the menu',
      announcementLink: { type: 'reference', reference: menu.id as number, label: 'Try it' },
    },
  });

  await payload.updateGlobal({
    ...base,
    slug: 'header',
    data: {
      navItems: [ref(home.id, 'Home'), ref(menu.id, 'Menu'), ref(about.id, 'About')],
      cta: {
        type: 'reference',
        reference: about.id as number,
        label: 'Visit us',
        appearance: 'primary',
      },
    },
  });

  await payload.updateGlobal({
    ...base,
    slug: 'footer',
    data: {
      blurb: 'A neighbourhood café for slow mornings, single-origin coffee and honest food.',
      navItems: [ref(menu.id, 'Menu'), ref(about.id, 'About')],
    },
  });
}

export const seedEndpoint: Endpoint = {
  path: '/seed',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await req.payload.count({ collection: 'pages', overrideAccess: true });
    if (existing.totalDocs > 0) {
      return Response.json(
        { error: 'Content already exists — seeding only runs on an empty site.' },
        { status: 409 },
      );
    }

    try {
      await seed(req.payload, req);
      return Response.json({ ok: true });
    } catch (error) {
      req.payload.logger.error({ err: error, msg: 'Seeding failed' });
      return Response.json({ error: 'Seeding failed — see server logs.' }, { status: 500 });
    }
  },
};
