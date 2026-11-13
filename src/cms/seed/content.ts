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
    slug: 'breakfast',
    name: 'Breakfast',
    id: 'Sarapan',
    description: 'Served all day, from 7am.',
    image: 'buttermilk-pancakes.webp',
  },
  {
    slug: 'sandwiches',
    name: 'Sandwiches',
    id: 'Sandwich',
    description: 'Breakfast sandos and lunch stackers.',
    image: 'turkey-shorty.webp',
  },
  { slug: 'lunch', name: 'Lunch', id: 'Makan siang', description: 'Wraps, melts and plates.' },
  {
    slug: 'smoothies',
    name: 'Smoothies',
    id: 'Smoothie',
    description: 'Blended to order with real fruit.',
    image: 'very-berry.webp',
  },
  {
    slug: 'coffee',
    name: 'Coffee',
    id: 'Kopi',
    description: 'Proudly pouring Lavazza.',
    image: 'cold-brew.webp',
  },
  {
    slug: 'drinks',
    name: 'Juices & more',
    id: 'Jus & lainnya',
    description: 'Fresh-squeezed and iced.',
  },
] as const;

type SeedCategory = (typeof categories)[number];

export type SeedItem = {
  category: SeedCategory['slug'];
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  variants?: { label: string; price: number }[];
  tags?: string[];
  featured?: boolean;
  availability?: 'available' | 'soldOut' | 'seasonal';
  /** File name in ./images */
  image?: string;
};

const hotIced = (hot: number, iced: number) => [
  { label: 'Hot', price: hot },
  { label: 'Iced', price: iced },
];

export const menuItems: SeedItem[] = [
  {
    category: 'breakfast',
    name: 'The Sandpiper',
    description: 'house plate, home fries, toast',
    price: 11,
    tags: ['signature'],
    image: 'classic-breakfast.webp',
  },
  {
    category: 'breakfast',
    name: 'Short Stack',
    description: 'buttermilk pancakes, maple',
    price: 10,
    tags: ['vegetarian'],
    featured: true,
    image: 'buttermilk-pancakes.webp',
  },
  {
    category: 'breakfast',
    name: 'Everything Bagel',
    description: 'schmear, lox optional',
    price: 7,
    featured: true,
    image: 'lox-bagel.webp',
  },
  {
    category: 'breakfast',
    name: 'Breakfast Sando',
    description: 'pork roll, cheese, kaiser roll',
    price: 9,
    image: 'eggs-and-cheese-sandwich.webp',
  },
  {
    category: 'breakfast',
    name: 'Belgian Waffle',
    description: 'butter, maple, powdered sugar',
    price: 9,
    tags: ['vegetarian'],
    image: 'waffle.webp',
  },
  {
    category: 'sandwiches',
    name: 'Turkey Club',
    description: 'roast turkey, bacon, sourdough',
    price: 12,
    featured: true,
    image: 'turkey-shorty.webp',
  },
  {
    category: 'sandwiches',
    name: 'The BEC',
    description: 'bacon, egg, cheese on brioche',
    price: 9,
    featured: true,
    image: 'the-bec.webp',
  },
  {
    category: 'sandwiches',
    name: 'Jersey Roll',
    description: 'pork roll, egg, american cheese',
    price: 10,
    image: 'jersey-roll.webp',
  },
  {
    category: 'sandwiches',
    name: 'Milano Sunrise',
    description: 'prosciutto, egg, provolone, pesto',
    price: 11,
    tags: ['new'],
    image: 'milano-sunrise.webp',
  },
  {
    category: 'lunch',
    name: 'Blazing Chicken',
    description: 'hot honey chicken, slaw, pickles',
    price: 13,
    tags: ['spicy'],
    image: 'blazing-chicken.webp',
  },
  {
    category: 'lunch',
    name: 'Chicken Caesar Wrap',
    description: 'romaine, parmesan, caesar',
    price: 12,
    image: 'chicken-caesar-wrap.webp',
  },
  {
    category: 'lunch',
    name: 'The Thanksgiving',
    description: 'turkey, stuffing, cranberry, gravy',
    price: 13,
    availability: 'seasonal',
    image: 'the-thanksgiving.webp',
  },
  {
    category: 'lunch',
    name: 'Fig & Prosciutto',
    description: 'fig jam, arugula, fresh mozzarella',
    price: 13,
    image: 'fig-and-prosciutto.webp',
  },
  {
    category: 'smoothies',
    name: 'Very Berry',
    description: 'strawberry, blueberry, banana',
    price: 8,
    tags: ['vegan'],
    featured: true,
    image: 'very-berry.webp',
  },
  {
    category: 'smoothies',
    name: 'Green Day',
    description: 'spinach, mango, pineapple',
    price: 8,
    tags: ['vegan'],
    featured: true,
    image: 'green-day.webp',
  },
  {
    category: 'smoothies',
    name: 'Tropical Blast',
    description: 'mango, passionfruit, coconut',
    price: 8,
    tags: ['vegan'],
    image: 'tropical-blast.webp',
  },
  {
    category: 'smoothies',
    name: 'Go Birds',
    description: 'kiwi, spinach, apple, honey',
    price: 8,
    image: 'go-birds.webp',
  },
  {
    category: 'smoothies',
    name: 'Chunky Monkey',
    description: 'banana, peanut butter, cocoa',
    price: 8,
    tags: ['nuts'],
    image: 'chunky-monkey.webp',
  },
  {
    category: 'coffee',
    name: 'Latte',
    description: 'Lavazza espresso, steamed milk',
    price: 5,
    variants: hotIced(5, 5.5),
  },
  { category: 'coffee', name: 'Cortado', description: 'equal parts espresso and milk', price: 4.5 },
  {
    category: 'coffee',
    name: 'Cold Brew',
    description: 'steeped 18 hours, served over ice',
    price: 5,
    featured: true,
    image: 'cold-brew.webp',
  },
  {
    category: 'coffee',
    name: 'Matcha',
    description: 'ceremonial matcha, oat milk',
    price: 5.5,
    variants: hotIced(5.5, 6),
  },
  { category: 'coffee', name: 'Chai', description: 'spiced chai latte', price: 5 },
  {
    category: 'coffee',
    name: 'Americano',
    description: 'Lavazza espresso, hot water',
    price: 4,
    variants: hotIced(4, 4.5),
  },
  {
    category: 'coffee',
    name: 'Vietnamese Iced Coffee',
    description: 'strong drip, condensed milk',
    price: 6,
    image: 'vietnamese-iced-coffee.webp',
  },
  {
    category: 'drinks',
    name: 'Fresh Orange Juice',
    description: 'squeezed every morning',
    price: 6,
    tags: ['vegan'],
    image: 'natalies-orange-juice.webp',
  },
  {
    category: 'drinks',
    name: 'Lemonade',
    description: 'fresh lemons, cane sugar',
    price: 4,
    tags: ['vegan'],
    image: 'lemonade.webp',
  },
  {
    category: 'drinks',
    name: 'Mango Juice',
    description: 'ripe mango, nothing added',
    price: 6,
    tags: ['vegan'],
    image: 'mango-juice.webp',
  },
];

/** Site photos for the media library; the landing page seed references them by key. */
export const sitePhotos = {
  polaroid: { file: 'cafe-mural-cups.webp', alt: 'Sandpiper cups in front of the food mural' },
  mural: {
    file: 'mural.webp',
    alt: 'Hand-drawn food mural inside Sandpiper',
    focalX: 57,
    focalY: 61,
  },
  pancakeGuy: { file: 'mural-pancake-guy.webp', alt: 'Mural detail: the pancake guy' },
  lavazzaCups: { file: 'mural-lavazza-cups.webp', alt: 'Mural detail: a Lavazza cup' },
  neonBird: { file: 'neon-bird.webp', alt: 'Blue neon sandpiper bird sign' },
  interior: { file: 'interior.webp', alt: 'Sandpiper dining room and mural' },
  neonSign: { file: 'neon-sign.webp', alt: 'Sandpiper Cafe neon sign' },
  lattes: { file: 'lattes-window.webp', alt: 'Two iced lattes by the South Street window' },
  takeout: { file: 'takeout-bag.webp', alt: 'Yellow Sandpiper takeout bag' },
  burrito: { file: 'burrito-latte.webp', alt: 'Breakfast burrito with a latte' },
} as const;

export type SitePhoto = keyof typeof sitePhotos;
