import { timingSafeEqual } from 'crypto';
import path from 'path';
import type { Endpoint, Payload, PayloadRequest } from 'payload';

import { aboutLayout } from './about';
import { cateringLayout } from './catering';
import { contactLayout } from './contact';
import { categories, menuItems, sitePhotos } from './content';
import type { SitePhoto } from './content';
import { giftCardLayout } from './giftCards';
import { menuLayout } from './menu';
import { orderLayout } from './order';

const imagesDir = path.resolve(process.cwd(), 'src/cms/seed/images');

type Appearance = 'primary' | 'outline' | 'link';

const pageLink = (id: number | string, label: string, appearance?: Appearance) => ({
  type: 'reference' as const,
  reference: id as number,
  label,
  ...(appearance ? { appearance } : {}),
});
const urlLink = (url: string, label: string, newTab = false) => ({
  type: 'custom' as const,
  url,
  label,
  newTab,
});
const ref = (id: number | string, label: string, appearance?: Appearance) => ({
  link: pageLink(id, label, appearance),
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

  // ─── Users ───────────────────────────────────────────────────────────────
  // A fresh DB gets its first admin from env; credentials never live in the repo.
  const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env;
  const { totalDocs: userCount } = await payload.count({ ...base, collection: 'users' });
  if (userCount === 0 && email && password) {
    await payload.create({
      ...base,
      collection: 'users',
      data: {
        name: process.env.SEED_ADMIN_NAME || 'Sandpiper team',
        email,
        password,
        roles: ['admin'],
      },
    });
  }

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

  // ─── Media ───────────────────────────────────────────────────────────────
  const uploaded = new Map<string, number>();
  const upload = async (file: string, alt: string, focal?: { focalX: number; focalY: number }) => {
    const known = uploaded.get(file);
    if (known) return known;
    const doc = await payload.create({
      ...base,
      collection: 'media',
      data: { alt, ...focal },
      filePath: path.join(imagesDir, file),
      // Keep the photo's own name: without this, a file already in ./media (an earlier local
      // seed) makes Payload save "photo-1.webp", which no other environment has.
      overwriteExistingFiles: true,
    });
    uploaded.set(file, doc.id);
    return doc.id;
  };
  const photo = (key: SitePhoto) => {
    const p = sitePhotos[key];
    return upload(
      p.file,
      p.alt,
      'focalX' in p ? { focalX: p.focalX, focalY: p.focalY } : undefined,
    );
  };

  // ─── Menu ────────────────────────────────────────────────────────────────
  const categoryIds: Record<string, number> = {};
  for (const c of categories) {
    const doc = await payload.create({
      ...base,
      collection: 'categories',
      data: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        ...('image' in c ? { image: await upload(c.image, `${c.name} at Sandpiper`) } : {}),
      },
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

  const itemIds: Record<string, number> = {};
  for (const item of menuItems) {
    const { category, image, ...data } = item;
    const doc = await payload.create({
      ...base,
      collection: 'menu-items',
      data: {
        ...data,
        category: categoryIds[category] as number,
        tags: data.tags as never,
        availability: data.availability ?? 'available',
        ...(image ? { image: await upload(image, data.name) } : {}),
        _status: 'published',
      },
    });
    itemIds[data.name] = doc.id;
  }
  const items = (...names: string[]) => names.map((n) => itemIds[n] as number);

  // ─── Pages ───────────────────────────────────────────────────────────────
  const page = (slug: string, title: string, layout: unknown[]) =>
    payload.create({
      ...base,
      collection: 'pages',
      data: { title, slug, layout: layout as never, _status: 'published' },
    });

  const menu = await page('menu', 'Menu', menuLayout());

  const order = await page(
    'order',
    'Order',
    orderLayout(pageLink(menu.id, 'Not sure yet? See our menu')),
  );

  const about = await page(
    'about',
    'About',
    await aboutLayout(upload, {
      orderOnline: pageLink(order.id, 'Order online', 'primary'),
      menu: pageLink(menu.id, 'See the menu', 'outline'),
    }),
  );

  const catering = await page('catering', 'Catering', await cateringLayout(upload));
  const giftCards = await page('gift-cards', 'Gift Cards', giftCardLayout);
  const contact = await page(
    'contact',
    'Contact',
    await contactLayout(upload, { catering: pageLink(catering.id, 'Request a catering quote') }),
  );

  const orderNow = pageLink(order.id, 'Order now');

  const home = await page('home', 'Home', [
    {
      blockType: 'homeHero',
      line1: 'BREAKFAST,',
      line2: 'LUNCH',
      accent: '&',
      line3: 'COFFEE.',
      pillImage: await upload('buttermilk-pancakes.webp', 'Buttermilk Pancakes'),
      body: 'Breakfast, lunch & Lavazza coffee on South Street. Grab a seat or order ahead.',
      links: [ref(order.id, 'Order online', 'primary'), ref(menu.id, 'See the menu', 'outline')],
      polaroid: { image: await photo('polaroid'), caption: 'the mural, 1640 South St' },
      stamp: { label: 'OPEN DAILY', value: '7–4' },
      slides: [
        {
          menuItem: itemIds['Turkey Shorty'],
          pitch: 'Roasted turkey, crispy bacon, lettuce, tomato and creamy pesto, pressed hot.',
        },
        {
          menuItem: itemIds['Buttermilk Pancakes'],
          pitch: 'Fluffy buttermilk pancakes, a pat of butter and a dusting of powdered sugar.',
        },
        {
          menuItem: itemIds['Very Berry'],
          pitch: 'Blueberry, strawberry, banana and honey, blended to order.',
        },
      ],
      orderLink: pageLink(order.id, 'Order online'),
      autoplay: 7,
    },
    {
      blockType: 'ribbons',
      topWords: ['SMOOTHIES', 'BAGELS', 'PANCAKES', 'SANDWICHES'],
      bottomWords: ['BREAKFAST', 'LUNCH', 'COFFEE'],
    },
    {
      blockType: 'menuBoard',
      eyebrow: 'The menu · all day',
      heading: 'PICK YOUR PLATE',
      categories: ['breakfast', 'sandwiches', 'smoothies', 'coffee'].map((s) => categoryIds[s]),
      limit: 5,
      stickerLabel: 'FAN FAVE',
      menuLink: pageLink(menu.id, 'See the full menu'),
    },
    {
      blockType: 'plateParade',
      eyebrow: 'Plate parade',
      heading: 'FAN FAVES',
      source: 'manual',
      items: items(
        'Turkey Shorty',
        'Buttermilk Pancakes',
        'Very Berry',
        'Lox Bagel',
        'The BEC',
        'Green Day',
      ),
      dragLabel: 'Drag',
    },
    {
      blockType: 'coffeeOrbit',
      headingBold: 'LAVAZZA,',
      headingLight: 'poured right.',
      image: await upload('cold-brew.webp', 'Iced cold brew in a tall glass'),
      drinks: items('Latte', 'Cortado', 'Cold Brew', 'Matcha Latte', 'Chai Latte', 'Americano'),
      note: {
        heading: 'Not a coffee person?',
        link: pageLink(menu.id, 'Smoothies + fresh juices →'),
      },
      seal: { top: 'PROUDLY', middle: 'Lavazza', bottom: 'POURING' },
    },
    {
      blockType: 'muralStory',
      headingBold: 'Drawn by hand,',
      headingLight: 'made by hand.',
      image: await photo('mural'),
      callouts: [
        { image: await photo('pancakeGuy'), caption: 'the famous pancake guy' },
        { image: await photo('lavazzaCups'), caption: 'Lavazza cups, obviously' },
        { image: await photo('neonBird'), caption: 'our sandpiper bird ↓' },
      ],
      body: 'A corner café on South Street serving breakfast, lunch and good coffee to the neighborhood, every day from 7 to 4.',
      link: pageLink(about.id, 'Our story →'),
    },
    {
      blockType: 'reviewThread',
      heading: 'WORD ON\nSOUTH ST.',
      ratings: [
        { score: '4.8', platform: 'Google' },
        { score: '4.6', platform: 'Yelp' },
        { score: '4.7', platform: 'Uber Eats' },
      ],
      reviews: [
        {
          quote: 'Best pork roll sandwich on South Street, no contest.',
          author: 'Dana',
          source: 'Google',
          tone: 'paper',
        },
        {
          quote:
            'Lavazza latte + the mural = my whole personality now. Staff remembers my order by week two.',
          author: 'Marcus',
          source: 'Instagram',
          tone: 'blue',
        },
        {
          quote: 'Pancakes were fluffy, coffee was hot, prices were fair. Back Sunday.',
          author: 'Priya',
          source: 'Yelp',
          tone: 'paper',
        },
        { quote: 'Smoothies slap 🍓', author: 'Jo', source: 'Google', tone: 'sunny' },
      ],
    },
    {
      blockType: 'gramWall',
      handle: '@sandpiper.philly',
      subline: '1,000+ neighbors already follow along',
      link: urlLink('https://www.instagram.com/sandpiper.philly/', 'Follow on Instagram', true),
      photos: [
        await photo('interior'),
        await photo('neonSign'),
        await photo('lattes'),
        await photo('takeout'),
        await photo('burrito'),
        await photo('mural'),
      ],
    },
    {
      blockType: 'visitHours',
      bigText: '7–4',
      script: 'every single day ✶',
      address: '1640 South St, Philadelphia',
      details: '267-858-6183 · dine in · takeout',
      directionsLabel: 'Directions',
      streetLabel: 'SOUTH ST',
    },
    {
      blockType: 'sunCta',
      sideText: 'Order ahead, pick up at 1640 South St.',
      eyebrow: 'HUNGRY?',
      heading: 'Skip the line.',
      link: pageLink(order.id, 'Order online'),
      stamp: { label: 'READY IN', value: '~15 min' },
    },
  ]);

  // Page titles stay English (locale fallback): saving a page in `id` validates every required
  // localized block field, which only an editor translating the page can fill in.

  // ─── Globals ─────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    ...base,
    slug: 'site-settings',
    data: {
      siteName: 'Sandpiper',
      tagline: 'Breakfast, lunch & Lavazza coffee on South Street',
      email: 'hello@sandpiper.cafe',
      phone: '(267) 858-6183',
      address: '1640 South St\nPhiladelphia, PA',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=1640+South+St+Philadelphia+PA',
      hours: [{ days: 'Open daily', time: '7am – 4pm' }],
      socials: [{ platform: 'instagram', url: 'https://www.instagram.com/sandpiper.philly/' }],
      announcementEnabled: false,
    },
  });

  await payload.updateGlobal({
    ...base,
    slug: 'header',
    data: {
      navItems: [
        { ...ref(home.id, 'Home'), icon: 'home' },
        { ...ref(catering.id, 'Catering'), icon: 'cloche' },
        { ...ref(giftCards.id, 'Gift Cards'), icon: 'gift' },
        { ...ref(about.id, 'About'), icon: 'info' },
        { ...ref(contact.id, 'Contact us'), icon: 'mail' },
      ],
      cta: { ...orderNow, appearance: 'primary' },
      ctaBadge: '~15 MIN',
      infoBar: [
        'Open daily 7am – 4pm',
        '1640 South St, Philadelphia',
        '(267) 858-6183',
        'Proudly pouring Lavazza',
      ].map((text) => ({ text })),
      ticker: [
        'Open daily 7am – 4pm',
        'Proudly serving Lavazza',
        '1640 South St, Philly',
        'Order ahead online',
        'Fresh smoothies & juices',
      ].map((text) => ({ text })),
      contactHeading: 'Come say hi',
      promo: { eyebrow: 'Hungry?', heading: 'Skip the line. Ready in ~15 min.', link: orderNow },
    },
  });

  await payload.updateGlobal({
    ...base,
    slug: 'footer',
    data: {
      blurb: 'Breakfast, lunch & Lavazza coffee on South Street. Open every day, 7am – 4pm.',
      exploreHeading: 'Explore',
      visitHeading: 'Visit',
      navItems: [
        ref(menu.id, 'Menu'),
        ref(about.id, 'Our Story'),
        ref(contact.id, 'Visit'),
        ref(order.id, 'Order Online'),
      ],
      copyright: 'Sandpiper Cafe · South Philly',
      note: 'Proudly serving Lavazza ☕',
      wordmark: 'SANDPIPER',
      newsletterEnabled: true,
      newsletter: {
        heading: 'GET THE SPECIALS',
        body: 'New smoothies and weekly specials, straight to your inbox.',
        placeholder: 'you@email.com',
        buttonLabel: 'Sign up',
      },
    },
  });
}

// `npm run seed` authenticates with SEED_SECRET, so a fresh DB (no users yet) can be seeded.
// Unset SEED_SECRET disables this path; only a signed-in admin session works then.
function hasSeedSecret(req: PayloadRequest) {
  const secret = process.env.SEED_SECRET;
  const given = req.headers.get('authorization')?.replace(/^Bearer /, '');
  if (!secret || secret.length < 32 || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const seedEndpoint: Endpoint = {
  path: '/seed',
  method: 'post',
  handler: async (req) => {
    if (!req.user && !hasSeedSecret(req)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
