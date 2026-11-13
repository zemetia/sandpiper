type LexicalText = {
  type: 'text';
  text: string;
  format: number;
  version: 1;
  detail: 0;
  mode: 'normal';
  style: '';
};

const text = (value: string, bold = false): LexicalText => ({
  type: 'text',
  text: value,
  format: bold ? 1 : 0,
  version: 1,
  detail: 0,
  mode: 'normal',
  style: '',
});

const block = (type: 'paragraph' | 'heading', children: LexicalText[], tag?: 'h2' | 'h3') => ({
  type,
  ...(tag ? { tag } : {}),
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  textFormat: 0,
});

/** Minimal Lexical document — `## ` prefix makes a heading. */
export const richText = (...lines: string[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: lines.map((line) =>
      line.startsWith('## ')
        ? block('heading', [text(line.slice(3))], 'h2')
        : block('paragraph', [text(line)]),
    ),
  },
});

export const categories = [
  {
    slug: 'coffee',
    name: 'Coffee',
    id: 'Kopi',
    description: 'Single-origin Indonesian beans, roasted weekly.',
  },
  {
    slug: 'not-coffee',
    name: 'Not coffee',
    id: 'Bukan kopi',
    description: 'Teas, chocolate and fresh juices.',
  },
  {
    slug: 'breakfast',
    name: 'All-day breakfast',
    id: 'Sarapan seharian',
    description: 'Served from open to close.',
  },
  {
    slug: 'mains',
    name: 'Mains',
    id: 'Hidangan utama',
    description: 'Bowls and plates for lunch and dinner.',
  },
  {
    slug: 'pastry',
    name: 'Pastry & dessert',
    id: 'Pastry & hidangan penutup',
    description: 'Baked in-house every morning.',
  },
] as const;

type SeedItem = {
  category: (typeof categories)[number]['slug'];
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  variants?: { label: string; price: number }[];
  tags?: string[];
  featured?: boolean;
  availability?: 'available' | 'soldOut' | 'seasonal';
};

const hotIced = (hot: number, iced: number) => [
  { label: 'Hot', price: hot },
  { label: 'Iced', price: iced },
];

export const menuItems: SeedItem[] = [
  {
    category: 'coffee',
    name: 'Sandpiper Signature',
    description: 'Espresso, palm sugar, oat milk and a pinch of sea salt.',
    price: 38000,
    variants: hotIced(38000, 40000),
    tags: ['signature'],
    featured: true,
  },
  {
    category: 'coffee',
    name: 'Flat White',
    description: 'Double ristretto with silky steamed milk.',
    price: 35000,
    variants: hotIced(35000, 37000),
  },
  {
    category: 'coffee',
    name: 'Kopi Susu Pandan',
    description: 'House cold brew, fresh pandan cream, condensed milk.',
    price: 36000,
    tags: ['new'],
    featured: true,
  },
  {
    category: 'coffee',
    name: 'V60 Pour Over',
    description: 'Rotating single origin — ask the barista what is on bar today.',
    price: 42000,
    tags: ['vegan'],
  },
  {
    category: 'not-coffee',
    name: 'Matcha Coconut',
    description: 'Ceremonial-grade matcha over coconut milk.',
    price: 40000,
    tags: ['vegan', 'dairyFree'],
    featured: true,
  },
  {
    category: 'not-coffee',
    name: 'Chocolate',
    description: '70% dark chocolate, steamed milk.',
    price: 34000,
    variants: hotIced(34000, 36000),
    tags: ['vegetarian'],
  },
  {
    category: 'breakfast',
    name: 'Shoreline Benedict',
    description: 'Poached eggs, smoked fish, hollandaise, sourdough.',
    price: 78000,
    tags: ['signature'],
    featured: true,
  },
  {
    category: 'breakfast',
    name: 'Tropical Granola Bowl',
    description: 'House granola, coconut yoghurt, mango, passionfruit.',
    price: 62000,
    compareAtPrice: 68000,
    tags: ['vegan', 'glutenFree'],
  },
  {
    category: 'mains',
    name: 'Nasi Goreng Kampung',
    description: 'Wok-fried rice, sambal matah, fried egg, krupuk.',
    price: 72000,
    tags: ['spicy'],
    featured: true,
  },
  {
    category: 'mains',
    name: 'Grilled Catch of the Day',
    description: 'Line-caught fish, lemongrass butter, garden salad.',
    price: 125000,
    availability: 'seasonal',
  },
  {
    category: 'pastry',
    name: 'Almond Croissant',
    description: 'Twice-baked, frangipane, toasted almonds.',
    price: 38000,
    tags: ['vegetarian', 'nuts'],
    featured: true,
  },
  {
    category: 'pastry',
    name: 'Pandan Basque Cheesecake',
    description: 'Burnt top, creamy centre, pandan-infused.',
    price: 45000,
    tags: ['vegetarian'],
    availability: 'soldOut',
  },
];
